let loadedImageSpecimen = null;
let selectedFileSpecimen = null;
let mobileNetInstance = null;

function setupImageDragDrop() {
    const dropzone = document.getElementById('image-dropzone');
    if (!dropzone) return;
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.add('border-primary', 'bg-primary/5');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.remove('border-primary', 'bg-primary/5');
        }, false);
    });
    
    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            processSelectedFile(files[0]);
        }
    });
    
    dropzone.addEventListener('click', () => {
        const input = document.getElementById('image-scan-file');
        if (input) input.click();
    });
}

function processSelectedImage(input) {
    if (input.files && input.files[0]) {
        processSelectedFile(input.files[0]);
    }
}

function processSelectedFile(file) {
    selectedFileSpecimen = file;
    const reader = new FileReader();
    
    reader.onload = (e) => {
        const preview = document.getElementById('image-scan-preview');
        if (preview) {
            preview.src = e.target.result;
            preview.classList.remove('hidden');
        }
        
        const prompt = document.getElementById('dropzone-prompt');
        if (prompt) prompt.classList.add('hidden');
        
        // Save base64 image data for classification
        loadedImageSpecimen = new Image();
        loadedImageSpecimen.src = e.target.result;
        
        // Enable scanning button
        const btn = document.getElementById('run-image-scan-btn');
        if (btn) {
            btn.disabled = false;
            btn.className = "flex-grow bg-gradient-to-r from-primary-container to-secondary text-surface py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-lg shadow-primary/10 hover:scale-103";
        }
        
        // Reset scanned outputs
        const output = document.getElementById('scan-output-content');
        if (output) {
            output.innerHTML = `
                <div class="text-center py-12 text-outline text-xs">
                    Specimen cataloged. Click "Run Recognition" to trigger convolutional neural analysis.
                </div>
            `;
        }
        
        const actions = document.getElementById('scan-actions-panel');
        if (actions) actions.classList.add('hidden');
    };
    
    reader.readAsDataURL(file);
}

async function startNeuralRecognition() {
    if (!loadedImageSpecimen) return;
    
    const laser = document.getElementById('scanner-laser');
    if (laser) laser.classList.remove('hidden');
    
    const scanPill = document.getElementById('scan-indicator-pill');
    if (scanPill) scanPill.classList.remove('hidden');
    
    const output = document.getElementById('scan-output-content');
    if (output) {
        output.innerHTML = `
            <div class="flex flex-col items-center justify-center gap-4 py-12 text-center text-xs text-primary font-label-sm">
                <div class="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
                <div class="uppercase tracking-wider font-semibold animate-pulse">Running convolution layers (MobileNet)...</div>
            </div>
        `;
    }
    
    // Small artificial latency to show scanning lasers
    setTimeout(async () => {
        try {
            // Update state to load TF/MobileNet if needed
            const status = document.getElementById('tf-status-text');
            if (status) {
                status.innerText = "INFERENCE ACTIVE";
                status.className = "text-primary font-semibold uppercase";
            }
            
            const model = await loadMobileNetModel();
            const predictions = await model.classify(loadedImageSpecimen);
            
            // Stop lasers and indicator
            if (laser) laser.classList.add('hidden');
            if (scanPill) scanPill.classList.add('hidden');
            if (status) {
                status.innerText = "ONLINE (WEBGL)";
                status.className = "text-secondary font-semibold uppercase";
            }
            
            displayScanResults(predictions);
        } catch (err) {
            console.error("TFJS error:", err);
            if (laser) laser.classList.add('hidden');
            if (scanPill) scanPill.classList.add('hidden');
            if (output) {
                output.innerHTML = `
                    <div class="text-center py-12 text-error text-xs font-semibold">
                        ⚠️ Failed to load or execute local TensorFlow.js. Network restrictions might block CDN access.
                    </div>
                `;
            }
        }
    }, 1800);
}

async function loadMobileNetModel() {
    if (mobileNetInstance) return mobileNetInstance;
    console.log("Loading MobileNet...");
    mobileNetInstance = await mobilenet.load({version: 1, alpha: 1.0});
    return mobileNetInstance;
}

function displayScanResults(predictions) {
    const output = document.getElementById('scan-output-content');
    if (!output) return;
    
    // Map labels to our database key
    const matchResult = mapPredictionsToLocalDb(predictions);
    
    let matchedFood = null;
    let dbMatchHTML = "";
    
    if (matchResult) {
        matchedFood = matchResult.food;
        const foodKey = matchResult.key;
        
        dbMatchHTML = `
            <div class="bg-primary/5 border border-primary/25 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <span class="text-[9px] font-label-sm text-primary uppercase font-bold bg-primary/15 px-2 py-0.5 rounded border border-primary/25">SYSTEM MATCH DETECTED</span>
                    <h4 class="font-display-lg text-lg text-on-surface font-bold mt-1.5">${matchedFood.name}</h4>
                    <p class="text-xs text-on-surface-variant leading-relaxed mt-1">${matchedFood.description}</p>
                </div>
                <div class="text-center bg-surface-container px-4 py-3 rounded-xl border border-outline-variant/15 min-w-[120px]">
                    <div class="text-2xl font-display-lg text-primary font-bold">${matchedFood.calories}</div>
                    <div class="text-[9px] text-outline font-label-sm uppercase">kcal / 100g</div>
                </div>
            </div>
        `;
        
        // Configure actions
        document.getElementById('btn-scan-import').onclick = () => {
            loadSearchItem(foodKey);
            switchTab('search');
        };
        
        document.getElementById('btn-scan-add-meal').onclick = () => {
            const quantity = 100;
            const scalar = quantity / 100;
            builderMeal.push({
                id: Date.now() + Math.random(),
                foodId: foodKey,
                name: matchedFood.name,
                quantity: quantity,
                calories: matchedFood.calories * scalar,
                protein: matchedFood.protein * scalar,
                carbs: matchedFood.carbs * scalar,
                fat: matchedFood.fat * scalar,
                fiber: matchedFood.fiber * scalar,
                sodium: matchedFood.sodium * scalar,
                potassium: matchedFood.potassium * scalar,
                vitC: matchedFood.vitaminC * scalar,
                vitK: matchedFood.vitaminK * scalar,
                magnesium: matchedFood.magnesium * scalar,
                folate: matchedFood.folate * scalar
            });
            updateMealBuilder();
            switchTab('builder');
        };
        
        const actions = document.getElementById('scan-actions-panel');
        if (actions) actions.classList.remove('hidden');
        
    } else {
        // If no database matches, output synthetic composite bio-item based on predicted label
        const topLabel = predictions[0].className.split(',')[0];
        
        dbMatchHTML = `
            <div class="bg-secondary/5 border border-secondary/25 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <span class="text-[9px] font-label-sm text-secondary uppercase font-bold bg-secondary/15 px-2 py-0.5 rounded border border-secondary/25">COMPOSITE BIO-DATA GENERATED</span>
                    <h4 class="font-display-lg text-lg text-on-surface font-bold mt-1.5">${topLabel}</h4>
                    <p class="text-xs text-on-surface-variant leading-relaxed mt-1">This specimen exists outside the native lab library. System generated a composite nutritional profile estimation.</p>
                </div>
                <div class="text-center bg-surface-container px-4 py-3 rounded-xl border border-outline-variant/15 min-w-[120px]">
                    <div class="text-2xl font-display-lg text-secondary font-bold">75</div>
                    <div class="text-[9px] text-outline font-label-sm uppercase">EST. kcal / 100g</div>
                </div>
            </div>
        `;
        
        // Enable generic injection into meal builder
        document.getElementById('btn-scan-import').onclick = () => {
            alert("Specimen profile not registered in local text library.");
        };
        
        document.getElementById('btn-scan-add-meal').onclick = () => {
            builderMeal.push({
                id: Date.now() + Math.random(),
                foodId: 'synthetic',
                name: topLabel.split(' ')[0],
                quantity: 100,
                calories: 75,
                protein: 1.5,
                carbs: 15.0,
                fat: 0.2,
                fiber: 2.0,
                sodium: 10,
                potassium: 200,
                vitC: 5,
                vitK: 2.0,
                magnesium: 15,
                folate: 10
            });
            updateMealBuilder();
            switchTab('builder');
        };
        
        const actions = document.getElementById('scan-actions-panel');
        if (actions) actions.classList.remove('hidden');
    }
    
    // Build prediction list
    const predsHTML = predictions.map((p, idx) => `
        <div class="flex justify-between items-center py-2 text-xs font-label-sm ${idx === 0 ? 'text-primary font-bold border-b border-primary/20 pb-2.5' : 'text-on-surface-variant border-b border-outline-variant/10 last:border-b-0'}">
            <span>${idx + 1}. ${p.className}</span>
            <span>${Math.round(p.probability * 100)}% Match</span>
        </div>
    `).join('');
    
    output.innerHTML = `
        <div class="space-y-4">
            <h4 class="text-xs text-outline font-label-sm uppercase tracking-wider">Top Spatial Classifications</h4>
            <div class="bg-surface-container-low/40 rounded-xl p-3 border border-outline-variant/15">
                ${predsHTML}
            </div>
            ${dbMatchHTML}
        </div>
    `;
}

function mapPredictionsToLocalDb(predictions) {
    for (const pred of predictions) {
        const label = pred.className.toLowerCase();
        
        // Full match check
        for (const key in foodDatabase) {
            const name = foodDatabase[key].name.toLowerCase();
            if (label.includes(name) || name.includes(label)) {
                return { key: key, food: foodDatabase[key] };
            }
        }
    }
    
    // Word check
    for (const pred of predictions) {
        const words = pred.className.toLowerCase().replace(/,/g, '').split(' ');
        for (const word of words) {
            if (word.length < 4) continue; // avoid tiny words
            for (const key in foodDatabase) {
                const name = foodDatabase[key].name.toLowerCase();
                if (name.includes(word) || word.includes(name)) {
                    return { key: key, food: foodDatabase[key] };
                }
            }
        }
    }
    
    return null;
}
