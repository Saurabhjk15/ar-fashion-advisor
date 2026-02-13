import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBodyScanResults } from '../redux/slices/userSlice';
import { calculateMeasurements, classifyBodyType, detectSkinTone, getBodyTypeInfo } from '../utils/bodyTypeUtils';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

export default function BodyScan() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [cameraActive, setCameraActive] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [selectedOccasion, setSelectedOccasion] = useState('casual');
    const [detectedSkinTone, setDetectedSkinTone] = useState('medium');
    const [stream, setStream] = useState(null);

    const poseRef = useRef(null);
    const animFrameRef = useRef(null);
    const landmarksRef = useRef(null);
    const streamRef = useRef(null);
    const [debugStatus, setDebugStatus] = useState("Ready to initialize.");
    const [autoCaptureTimer, setAutoCaptureTimer] = useState(null);
    const [showMlResult, setShowMlResult] = useState(true);

    const addLog = (msg) => {
        console.log(msg);
        setDebugStatus(prev => `> ${msg}\n${prev.split("\n").slice(0, 8).join("\n")}`);
    };

    const occasions = [
        { id: 'casual', label: 'Casual', icon: 'checkroom' },
        { id: 'formal', label: 'Formal', icon: 'business_center' },
        { id: 'party', label: 'Party', icon: 'celebration' },
        { id: 'office', label: 'Office', icon: 'work' },
        { id: 'date', label: 'Date', icon: 'favorite' },
        { id: 'wedding', label: 'Wedding', icon: 'church' },
        { id: 'sporty', label: 'Sporty', icon: 'fitness_center' },
        { id: 'beach', label: 'Beach', icon: 'beach_access' },
    ];

    // Initialize MediaPipe Pose
    const initPose = useCallback(() => {
        if (poseRef.current) return poseRef.current;

        addLog("Loading MediaPipe Pose...");
        const pose = new Pose({
            locateFile: (file) => `/mediapipe/pose/${file}`,
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        let firstResult = true;
        pose.onResults((results) => {
            if (firstResult) {
                addLog("✨ VISUAL SYSTEM ONLINE");
                firstResult = false;
            }

            if (!canvasRef.current || !videoRef.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (videoRef.current.videoWidth === 0) return;

            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;

            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

            if (results.poseLandmarks) {
                landmarksRef.current = results.poseLandmarks;
                drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {
                    color: 'rgba(198, 167, 94, 0.6)', // Primary Gold
                    lineWidth: 2,
                });
                drawLandmarks(ctx, results.poseLandmarks, {
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineWidth: 1,
                    radius: 3,
                });
            }
            ctx.restore();
        });

        poseRef.current = pose;
        return pose;
    }, []);

    // Stop Camera
    const stopCamera = useCallback(() => {
        addLog("🛑 TERMINATING SENSORS...");
        if (autoCaptureTimer) {
            clearTimeout(autoCaptureTimer.timer);
            clearInterval(autoCaptureTimer.interval);
            setAutoCaptureTimer(null);
        }
        if (poseRef.current) {
            try { poseRef.current.close(); } catch (e) { }
            poseRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.srcObject = null;
        }
        setStream(null);
        setCameraActive(false);
        setScanning(false);
        setScanProgress(0);
    }, [autoCaptureTimer]);

    const [scanProgress, setScanProgress] = useState(0);

    // Capture Logic
    const handleCapture = useCallback(() => {
        setError(null);
        if (!landmarksRef.current) {
            setError('NO SUBJECT DETECTED. ENSURE FULL TORSO VISIBILITY.');
            return;
        }

        setScanning(true);
        setCountdown(3);

        let count = 3;
        const timer = setInterval(async () => {
            count--;
            setCountdown(count);
            if (count <= 0) {
                clearInterval(timer);
                setCountdown(null);

                const measurements = calculateMeasurements(landmarksRef.current);
                if (!measurements) {
                    setError('PROXIMITY ALERT: SUBJECT TOO CLOSE.');
                    setScanning(false);
                    stopCamera();
                    return;
                }

                // Initialize variables
                let probabilities = null;
                const ruleBasedType = classifyBodyType(measurements);
                let bodyType = ruleBasedType; // Default to rule-based
                let skinTone = 'medium'; // Default
                let matchConfidence = 0;
                let isMlResult = false;
                let imageSrc = null;

                if (canvasRef.current) {
                    const ctx = canvasRef.current.getContext('2d');
                    const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
                    skinTone = detectSkinTone(imageData, landmarksRef.current);
                    imageSrc = canvasRef.current.toDataURL('image/jpeg', 0.8);
                }
                setDetectedSkinTone(skinTone);

                // ML API Call
                if (imageSrc) {
                    try {
                        addLog("UPLOADING BIOMETRIC DATA...");
                        const response = await fetch('/api/ml/predict', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ image: imageSrc })
                        });

                        if (response.ok) {
                            const data = await response.json();
                            bodyType = data.body_type;
                            matchConfidence = data.confidence;
                            probabilities = data.all_predictions;
                            isMlResult = true;
                            addLog(`ML INFERENCE: ${data.body_type.toUpperCase()}`);
                        }
                    } catch (err) { }
                }

                const result = {
                    measurements,
                    bodyType,
                    ruleBasedType,
                    bodyTypeInfo: getBodyTypeInfo(bodyType, selectedOccasion, measurements),
                    skinTone,
                    occasion: selectedOccasion,
                    confidence: matchConfidence,
                    isMlResult,
                    probabilities
                };

                setScanResult(result);
                dispatch(setBodyScanResults({ measurements, bodyType }));
                setScanning(false);
                stopCamera();
            }
        }, 1000);
    }, [selectedOccasion, dispatch, stopCamera]);

    // Start Camera & Auto-Capture Timer
    const startCamera = useCallback(async () => {
        try {
            setError(null);
            setScanProgress(0);
            addLog("INITIALIZING OPTICAL SENSORS...");
            initPose();
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480, facingMode: 'user' },
            });
            addLog("VIDEO FEED SECURED");
            streamRef.current = mediaStream;
            setStream(mediaStream);
            setCameraActive(true);

            // Start 40s Analysis Timer
            addLog("INITIATING 40s BIOMETRIC SCAN SEQUENCE...");
            let progress = 0;
            const interval = setInterval(() => {
                progress += (100 / 400); // 40 seconds * 10 increments/sec
                setScanProgress(Math.min(progress, 100));
            }, 100);

            const timer = setTimeout(() => {
                clearInterval(interval);
                addLog("SCAN COMPLETE. PROCESSNG DATA...");
                handleCapture();
            }, 40000);

            setAutoCaptureTimer({ timer, interval });

        } catch (err) {
            setError('Optical Sensor Failure: Permission Denied');
            addLog(`ERROR: ${err.message}`);
        }
    }, [initPose, handleCapture]); // Added handleCapture dependency

    // Cleanup
    useEffect(() => {
        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
            if (poseRef.current) poseRef.current.close();
        };
    }, []);

    // Loop
    useEffect(() => {
        let animationFrameId;
        if (cameraActive && stream && videoRef.current && poseRef.current) {
            const detectLoop = async () => {
                if (cameraActive && videoRef.current && videoRef.current.readyState >= 2 && poseRef.current) {
                    try { await poseRef.current.send({ image: videoRef.current }); } catch (e) { }
                }
                animationFrameId = requestAnimationFrame(detectLoop);
            };
            videoRef.current.srcObject = stream;
            videoRef.current.play().then(() => detectLoop()).catch(() => { });
        }
        return () => { if (animationFrameId) cancelAnimationFrame(animationFrameId); };
    }, [cameraActive, stream]);



    const goToRecommendations = () => {
        navigate('/recommendations', {
            state: {
                bodyType: scanResult.bodyType,
                skinTone: detectedSkinTone,
                occasion: selectedOccasion,
            },
        });
    };

    return (
        <div className="bg-background-dark text-slate-100 min-h-screen font-display flex flex-col overflow-hidden pt-24">

            <main className="flex-1 flex overflow-hidden relative">
                {/* Left Sidebar - Occasions */}
                <aside className="w-20 lg:w-28 border-r border-primary/10 flex flex-col items-center py-10 gap-8 bg-surface-card overflow-y-auto hidden md:flex z-40">
                    {occasions.map((occ) => (
                        <button key={occ.id} onClick={() => !scanning && setSelectedOccasion(occ.id)} className="group flex flex-col items-center gap-3 w-full">
                            <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-500 border ${selectedOccasion === occ.id ? 'bg-primary text-black border-primary shadow-gold' : 'bg-[#1C1C21] border-white/5 text-slate-500 group-hover:border-primary/50'}`}>
                                <span className="material-icons font-light">{occ.icon}</span>
                            </div>
                            <span className={`text-[9px] uppercase tracking-[0.2em] font-bold ${selectedOccasion === occ.id ? 'text-primary' : 'opacity-40'}`}>{occ.label}</span>
                        </button>
                    ))}
                </aside>

                {/* Center Viewport */}
                <section className="flex-1 flex flex-col relative p-4 lg:p-8 bg-background-dark overflow-hidden">
                    <div className="viewport-container flex-1 rounded-2xl border border-primary/30 flex items-center justify-center relative shadow-2xl bg-black overflow-hidden">

                        {/* Start Screen */}
                        {!cameraActive && !scanResult && (
                            <div className="relative z-20 text-center p-8 max-w-md">
                                <span className="material-icons text-6xl text-primary/20 mb-6">sensors</span>
                                <h2 className="text-2xl font-bold text-white mb-2 font-luxury">Biometric Initialization</h2>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                    Authenticate via optical analysis to unlock your bespoke wardrobe matrix. Ensure full environmental lighting.
                                </p>
                                <button
                                    onClick={startCamera}
                                    className="bg-primary hover:bg-white hover:text-black text-black font-bold py-4 px-8 rounded-full transition-all tracking-[0.2em] text-xs uppercase shadow-gold"
                                >
                                    Activate Sensor Array
                                </button>
                                {/* Demo Mode Link */}
                                <div className="mt-8 pt-8 border-t border-white/5">
                                    <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-4">Development Bypass Protocol</p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {['hourglass', 'rectangle', 'inverted-triangle'].map(type => (
                                            <button key={type} onClick={() => {
                                                setScanResult({
                                                    measurements: { shoulderToHipRatio: 1.0 },
                                                    bodyType: type,
                                                    bodyTypeInfo: getBodyTypeInfo(type),
                                                    skinTone: 'medium',
                                                    occasion: selectedOccasion,
                                                    isMlResult: false,
                                                    confidence: 0
                                                });
                                            }} className="px-3 py-1 bg-white/5 text-[9px] rounded text-slate-500 hover:text-primary uppercase border border-white/5 hover:border-primary/50 transition-all">
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Camera Active */}
                        <div className={`absolute inset-0 ${cameraActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
                            <video ref={videoRef} className="hidden" playsInline muted />
                            <canvas ref={canvasRef} className="w-full h-full object-cover" />

                            {/* Overlays */}
                            {cameraActive && !scanResult && (
                                <>
                                    <div className="scan-line absolute w-full z-20 animate-scan"></div>
                                    <div className="absolute inset-0 pointer-events-none border-[20px] border-primary/5"></div>

                                    {/* Corners */}
                                    <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-primary/40 rounded-tl-xl"></div>
                                    <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary/40 rounded-tr-xl"></div>
                                    <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary/40 rounded-bl-xl"></div>
                                    <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-primary/40 rounded-br-xl"></div>

                                    {/* Scan Progress Bar */}
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-64 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
                                        <div
                                            className="h-full bg-primary shadow-[0_0_10px_#C6A75E] transition-all duration-100 ease-linear"
                                            style={{ width: `${scanProgress}%` }}
                                        ></div>
                                    </div>
                                    <div className="absolute top-7 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-widest text-primary/80">
                                        Analyzing Biometrics {Math.round(scanProgress)}%
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Results View */}
                        {scanResult && (
                            <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-md flex items-center justify-center p-8">
                                <div className="max-w-3xl w-full text-center relative">
                                    {/* Toggle Switch */}
                                    {scanResult.isMlResult && (
                                        <div className="absolute top-0 right-0 flex items-center gap-3">
                                            <span className={`text-[9px] uppercase tracking-widest font-bold ${!showMlResult ? 'text-white' : 'text-slate-500'}`}>Standard</span>
                                            <button
                                                onClick={() => setShowMlResult(!showMlResult)}
                                                className={`w-12 h-6 rounded-full p-1 transition-colors ${showMlResult ? 'bg-primary' : 'bg-white/20'}`}
                                            >
                                                <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${showMlResult ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                            </button>
                                            <span className={`text-[9px] uppercase tracking-widest font-bold ${showMlResult ? 'text-primary' : 'text-slate-500'}`}>AI Enhanced</span>
                                        </div>
                                    )}

                                    <div className="inline-block mb-6 p-4 rounded-full border border-primary/30 bg-primary/10 relative">
                                        <span className="text-6xl text-white">{scanResult.bodyTypeInfo?.emoji}</span>
                                        {showMlResult && scanResult.isMlResult && (
                                            <div className="absolute -bottom-2 -right-2 bg-primary text-black text-[9px] font-bold px-2 py-0.5 rounded border border-white/20 shadow-gold uppercase tracking-wider">
                                                AI Powered
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-primary text-xs font-bold uppercase tracking-[0.4em] mb-2">Analysis Complete</div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-luxury capitalize">
                                        {showMlResult && scanResult.isMlResult ? scanResult.bodyType : scanResult.ruleBasedType || scanResult.bodyType}
                                        <span className="text-slate-500 font-light"> Archetype</span>
                                    </h2>
                                    <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                                        {scanResult.bodyTypeInfo?.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                            <div className="text-[10px] uppercase text-slate-500 tracking-widest">Confidence</div>
                                            <div className="text-xl font-bold text-primary">
                                                {showMlResult && scanResult.isMlResult ? `${Math.round(scanResult.confidence * 100)}%` : 'N/A'}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                            <div className="text-[10px] uppercase text-slate-500 tracking-widest">Ratio</div>
                                            <div className="text-xl font-bold text-primary">{scanResult.measurements.shoulderToHipRatio}</div>
                                        </div>
                                    </div>

                                    {/* Probability Visualization */}
                                    {showMlResult && scanResult.probabilities && (
                                        <div className="max-w-lg mx-auto mb-8 bg-white/5 p-4 rounded-lg border border-white/10">
                                            <h4 className="text-[9px] uppercase text-slate-500 tracking-widest mb-3 text-left">Neural Network Confidence Distribution</h4>
                                            <div className="space-y-2">
                                                {Object.entries(scanResult.probabilities).sort(([, a], [, b]) => b - a).map(([type, prob]) => (
                                                    <div key={type} className="flex items-center gap-3">
                                                        <span className="text-[9px] uppercase text-slate-400 w-24 text-right">{type}</span>
                                                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-primary shadow-[0_0_8px_rgba(198,167,94,0.5)]"
                                                                style={{ width: `${prob * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-[9px] w-8 text-primary font-mono">{Math.round(prob * 100)}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={goToRecommendations}
                                            className="bg-primary text-black font-bold py-4 px-8 rounded-lg hover:bg-white transition-all tracking-[0.2em] text-xs uppercase shadow-gold"
                                        >
                                            Generate Collection
                                        </button>
                                        <button
                                            onClick={() => { setScanResult(null); startCamera(); }}
                                            className="bg-transparent border border-white/20 text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all tracking-[0.2em] text-xs uppercase"
                                        >
                                            Recalibrate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Countdown */}
                        {countdown !== null && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
                                <span className="text-9xl font-bold text-primary animate-ping font-luxury">{countdown}</span>
                            </div>
                        )}

                        {/* Error Modal */}
                        {error && (
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-900/90 border border-red-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 max-w-sm text-center backdrop-blur-xl">
                                <div className="text-2xl mb-2">⚠️</div>
                                <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
                                <button onClick={() => setError(null)} className="mt-4 text-[10px] border border-white/20 px-4 py-2 hover:bg-white/10">DISMISS</button>
                            </div>
                        )}
                    </div>

                    {/* Bottom Control Bar */}
                    <div className="h-24 flex items-center justify-center shrink-0">
                        {!scanResult && cameraActive && (
                            <div className="flex items-center gap-8">
                                <button
                                    onClick={handleCapture}
                                    disabled={scanning}
                                    className="bg-primary text-black font-bold text-sm tracking-[0.25em] px-16 py-5 rounded-full flex items-center gap-5 hover:bg-white transition-all transform active:scale-95 group shadow-gold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="uppercase">{scanning ? 'Processing...' : 'Capture & Analyze'}</span>
                                    <span className="material-icons text-xl group-hover:rotate-90 transition-transform">shutter_speed</span>
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Right Sidebar - Telemetry */}
                <aside className="w-80 border-l border-primary/10 p-8 flex flex-col gap-8 bg-surface-card glass-panel hidden xl:flex overflow-y-auto">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">AI Telemetry</h2>
                        <span className="material-icons text-primary/50 text-base">analytics</span>
                    </div>

                    <div className="flex flex-col gap-6 font-mono">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[9px] opacity-40 uppercase tracking-widest">
                                <span>Protocol</span>
                                <span>{new Date().toLocaleTimeString()}</span>
                            </div>
                            <div className="p-4 bg-[#1C1C21] rounded-lg border border-primary/10 text-[10px] leading-relaxed text-primary/80 h-48 overflow-y-auto font-mono whitespace-pre-line">
                                {debugStatus}
                            </div>
                        </div>

                        {scanResult && (
                            <div className="bg-[#1C1C21] p-5 rounded-lg border border-primary/20 relative overflow-hidden group">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_5px_#C6A75E]"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">AI Narrative</span>
                                </div>
                                <ul className="text-[11px] text-slate-400 leading-relaxed font-light space-y-2">
                                    {scanResult.bodyTypeInfo.tips.map((tip, i) => (
                                        <li key={i} className="flex gap-2">
                                            <span className="text-primary">•</span> {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto space-y-5">
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                            <span>System Status</span>
                            <span className="text-primary">OPTIMAL</span>
                        </div>
                        <div className="w-full h-1 bg-[#1C1C21] rounded-full overflow-hidden border border-primary/5">
                            <div className="w-[99%] h-full bg-primary shadow-[0_0_12px_rgba(198,167,94,0.6)]"></div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
