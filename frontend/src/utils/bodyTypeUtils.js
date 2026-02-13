/**
 * Body Type Utilities
 * 
 * Uses MediaPipe Pose landmarks to calculate body measurements
 * and classify body type based on shoulder-to-hip ratios.
 * 
 * Key landmarks used:
 *  11 = left shoulder,  12 = right shoulder
 *  23 = left hip,       24 = right hip
 *  25 = left knee,      26 = right knee
 */

// Calculate distance between two landmarks
function distance(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

// Calculate midpoint between two landmarks
function midpoint(a, b) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/**
 * Extract body measurements from MediaPipe Pose landmarks.
 * All values are relative pixel ratios (not actual cm).
 */
export function calculateMeasurements(landmarks) {
    if (!landmarks || landmarks.length < 33) return null;

    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftKnee = landmarks[25];
    const rightKnee = landmarks[26];

    // Check visibility/confidence - STRICTER to force full body
    const minVisibility = 0.65; // High confidence required
    const keys = [leftShoulder, rightShoulder, leftHip, rightHip];
    const allVisible = keys.every(p => (p.visibility || 0) >= minVisibility);

    if (!allVisible) return null;

    const shoulderWidth = distance(leftShoulder, rightShoulder);
    const hipWidth = distance(leftHip, rightHip);
    const shoulderMid = midpoint(leftShoulder, rightShoulder);
    const hipMid = midpoint(leftHip, rightHip);
    const torsoLength = distance(shoulderMid, hipMid);

    // Estimate waist (roughly 40% down from shoulders to hips)
    const waistPoint = {
        x: shoulderMid.x + (hipMid.x - shoulderMid.x) * 0.4,
        y: shoulderMid.y + (hipMid.y - shoulderMid.y) * 0.4,
    };

    // Estimated waist width (interpolation between shoulder and hip width)
    const waistWidth = shoulderWidth * 0.4 + hipWidth * 0.6;

    // Leg length (hip to knee average)
    let legLength = 0;
    if (leftKnee && rightKnee && leftKnee.visibility >= minVisibility && rightKnee.visibility >= minVisibility) {
        legLength = (distance(leftHip, leftKnee) + distance(rightHip, rightKnee)) / 2;
    } else {
        legLength = torsoLength * 1.2;
    }

    return {
        shoulderWidth: Math.round(shoulderWidth * 1000) / 1000,
        hipWidth: Math.round(hipWidth * 1000) / 1000,
        waistWidth: Math.round(waistWidth * 1000) / 1000,
        torsoLength: Math.round(torsoLength * 1000) / 1000,
        legLength: Math.round(legLength * 1000) / 1000,
        shoulderToHipRatio: Math.round((shoulderWidth / hipWidth) * 100) / 100,
        waistToHipRatio: Math.round((waistWidth / hipWidth) * 100) / 100,
    };
}

/**
 * Classify body type based on measurement ratios.
 * 
 * Body types:
 *  - hourglass:          shoulder ≈ hip, narrow waist
 *  - pear (triangle):    hips wider than shoulders
 *  - inverted-triangle:  shoulders wider than hips
 *  - rectangle:          shoulder ≈ hip ≈ waist (straight)
 *  - apple (oval):       wider midsection
 */
export function classifyBodyType(measurements) {
    if (!measurements) return 'rectangle'; // default

    const { shoulderToHipRatio, waistToHipRatio } = measurements;

    // Pear: hips significantly wider than shoulders
    if (shoulderToHipRatio < 0.9) {
        return 'pear';
    }

    // Inverted triangle: shoulders significantly wider than hips
    if (shoulderToHipRatio > 1.15) {
        return 'inverted-triangle';
    }

    // Shoulders and hips roughly equal — check waist
    // Hourglass: defined waist (waist much narrower than hips)
    if (waistToHipRatio < 0.75) {
        return 'hourglass';
    }

    // Apple: waist wider than hips (rare with pose estimation)
    if (waistToHipRatio > 0.95) {
        return 'apple';
    }

    // Rectangle: everything roughly the same
    return 'rectangle';
}

/**
 * Get dynamic, personalized style tips based on specific measurements and occasion.
 */
export function getBodyTypeInfo(bodyType, occasion = 'casual', measurements = null) {
    const info = {
        hourglass: {
            label: 'Hourglass',
            emoji: '⏳',
            description: 'Balanced shoulders and hips with a defined waistline.',
            baseTips: ['Highlight your defined waistline', 'Avoid shapeless, baggy clothing'],
            bestStyles: ['Wrap dresses', 'Fitted tops', 'High-waist pants', 'Belted outerwear'],
        },
        pear: {
            label: 'Pear',
            emoji: '🍐',
            description: 'Hips wider than shoulders. Lower body is fuller.',
            baseTips: ['Draw attention upward to balance proportions', 'Define your waist'],
            bestStyles: ['A-line skirts', 'Structured blazers', 'Boat neck tops'],
        },
        'inverted-triangle': {
            label: 'Inverted Triangle',
            emoji: '🔻',
            description: 'Shoulders wider than hips.',
            baseTips: ['Soften broad shoulders', 'Add volume to hips'],
            bestStyles: ['V-neck tops', 'Wide-leg pants', 'A-line dresses'],
        },
        rectangle: {
            label: 'Rectangle',
            emoji: '▬',
            description: 'Shoulders, waist, and hips are similar width.',
            baseTips: ['Create curves with structure', 'Define your waist'],
            bestStyles: ['Peplum tops', 'Belted dresses', 'Layered outfits'],
        },
        apple: {
            label: 'Apple',
            emoji: '🍎',
            description: 'Fuller midsection.',
            baseTips: ['Elongate torso with vertical lines', 'Show off legs'],
            bestStyles: ['Empire waist', 'V-neck tops', 'Straight-leg pants'],
        },
    };

    const typeData = info[bodyType] || info.rectangle;

    // 1. Occasion-specific Tips
    const occasionTips = {
        casual: {
            hourglass: ['Fitted tees with high-waisted jeans', 'Cropped cardigans'],
            pear: ['Dark wash jeans with statement tops', 'Open jackets'],
            'inverted-triangle': ['V-neck tees', 'Boyfriend jeans'],
            rectangle: ['Graphic tees tucked in', 'Ruffled tops'],
            apple: ['Flowy tunics', 'Casual leggings with long tops'],
        },
        formal: {
            hourglass: ['Tailored sheath dresses', 'Belted trenches'],
            pear: ['A-line gowns', 'Embellished necklines'],
            'inverted-triangle': ['Single-breasted blazers', 'Wide-leg trousers'],
            rectangle: ['Structured blazers with belts', 'Wrap gowns'],
            apple: ['Monochrome suits', 'Empire waist gowns'],
        },
        office: {
            hourglass: ['Pencil skirts', 'Fitted blazers'],
            pear: ['Bootcut trousers', 'Colorful blouses'],
            'inverted-triangle': ['Open collars', 'Flared slacks'],
            rectangle: ['Peplum jackets', 'Belted shirt dresses'],
            apple: ['Long vests', 'Dark blazers'],
        },
        party: {
            hourglass: ['Bodycon dresses', 'Jumpsuits'],
            pear: ['Off-shoulder tops', 'Fit-and-flare skirts'],
            'inverted-triangle': ['Deep V-necks', 'Full skirts'],
            rectangle: ['Cut-out dresses', 'Sequins'],
            apple: ['Shift dresses', 'Short hemlines'],
        },
        wedding: {
            hourglass: ['Mermaid gowns', 'Sweetheart necklines'],
            pear: ['Detailed bodices', 'Flowy skirts'],
            'inverted-triangle': ['Halter necks', 'Full ballgowns'],
            rectangle: ['Ruched dresses', 'Voluminous skirts'],
            apple: ['Empire silhouettes', 'Chiffon fabrics'],
        }
    };

    // 2. Personalized Measurement Tips
    // Uses the actual ratios to give specific advice
    const ratioTips = [];
    if (measurements) {
        const { shoulderToHipRatio, waistToHipRatio } = measurements;

        // Dynamic advice based on specific numbers
        if (waistToHipRatio < 0.70) {
            ratioTips.push(`Your waist ratio is ${waistToHipRatio} - extremely defined! Emphasize it with wide belts.`);
        } else if (waistToHipRatio > 0.85) {
            ratioTips.push(`With a waist ratio of ${waistToHipRatio}, try empire waists or semi-fitted styles.`);
        }

        if (shoulderToHipRatio > 1.2) {
            ratioTips.push("Your shoulders are prominent - try raglan sleeves to soften them.");
        } else if (shoulderToHipRatio < 0.85) {
            ratioTips.push("Your hips are the star! Balance with structured shoulders or boat necks.");
        }
    }

    // 3. Selection
    // Get occasion tips (fallback to casual)
    const specificOccasionTips = (occasionTips[occasion] && occasionTips[occasion][bodyType])
        || occasionTips['casual'][bodyType];

    // Combine: 1 Base Tip + 1 Occasion Tip + 1 Personal Ratio Tip (if available)
    const finalTips = [
        typeData.baseTips[Math.floor(Math.random() * typeData.baseTips.length)], // Random base tip
        specificOccasionTips[Math.floor(Math.random() * specificOccasionTips.length)], // Random occasion tip
        ...(ratioTips.length > 0 ? [ratioTips[0]] : []) // Personal tip
    ];

    if (finalTips.length < 3) {
        finalTips.push("Wear what makes you feel confident!");
    }

    return {
        ...typeData,
        tips: finalTips
    };
}

/**
 * Detect skin tone from pixel data (simplified approach).
 * Takes a small region of face/neck area and averages the color.
 * Returns: 'fair', 'light', 'medium', 'olive', 'brown', 'dark'
 */
export function detectSkinTone(imageData, faceLandmarks) {
    // If no face data, return medium as default
    if (!imageData || !faceLandmarks) return 'medium';

    // Sample pixels from cheek area (landmarks 1 and 4 in face mesh)
    // For pose landmarks, use area between nose (0) and shoulders
    const noseLandmark = faceLandmarks[0];
    if (!noseLandmark) return 'medium';

    const sampleX = Math.floor(noseLandmark.x * imageData.width);
    const sampleY = Math.floor(noseLandmark.y * imageData.height);

    // Average a 10x10 pixel region
    let totalR = 0, totalG = 0, totalB = 0, count = 0;
    for (let dy = -5; dy < 5; dy++) {
        for (let dx = -5; dx < 5; dx++) {
            const px = sampleX + dx;
            const py = sampleY + dy;
            if (px >= 0 && px < imageData.width && py >= 0 && py < imageData.height) {
                const idx = (py * imageData.width + px) * 4;
                totalR += imageData.data[idx];
                totalG += imageData.data[idx + 1];
                totalB += imageData.data[idx + 2];
                count++;
            }
        }
    }

    if (count === 0) return 'medium';

    const avgR = totalR / count;
    const avgG = totalG / count;
    const avgB = totalB / count;
    const brightness = (avgR + avgG + avgB) / 3;

    // Simple brightness-based classification
    if (brightness > 210) return 'fair';
    if (brightness > 185) return 'light';
    if (brightness > 160) return 'medium';
    if (brightness > 130) return 'olive';
    if (brightness > 90) return 'brown';
    return 'dark';
}
