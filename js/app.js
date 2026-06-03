// Core application lifecycle bootstrap & dashboard state
let todayMeals = [
    { id: 1, foodId: 'avocado', name: 'Avocado', quantity: 100, calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, sodium: 7, potassium: 485, vitC: 10, vitK: 21, magnesium: 29, folate: 81, timestamp: '08:30 AM' },
    { id: 2, foodId: 'wild_salmon', name: 'Wild Salmon', quantity: 150, calories: 273, protein: 37.5, carbs: 0, fat: 12, fiber: 0, sodium: 90, potassium: 735, vitC: 0, vitK: 0.15, magnesium: 45, folate: 37.5, timestamp: '01:15 PM' }
];

let activeTab = 'dashboard';
let preloadedFrames = [];
const totalFrames = 240;
let loadedFramesCount = 0;

// Canvas Variables
let canvas, ctx;

// Chart.js instances
let macroDoughnutChart = null;

// Page Initialization
function initApp() {
    canvas = document.getElementById('scroll-canvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        // Set high definition internal resolution
        canvas.width = 1086;
        canvas.height = 1074;
        preloadCanvasFrames();
    }
    
    initializeDropdowns();
    syncTabStates();
    updateDashboard();
    updateMealBuilder();
    updateChatView();
    
    // Register scroll listeners
    window.addEventListener('scroll', onScroll);
    
    // Register Drag and Drop Event listeners
    setupImageDragDrop();
    
    // Load TensorFlow.js status
    const tfStatus = document.getElementById('tf-status-text');
    if (tfStatus) {
        if (window.tf) {
            tfStatus.innerText = "ONLINE (WEBGL)";
        } else {
            tfStatus.innerText = "PENDING TFJS LOAD";
        }
    }
}

// Bulletproof bootstrapper: runs immediately if document is parsed, otherwise binds to event
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Preload Scroll-Linked Frames
function preloadCanvasFrames() {
    const statusIndicator = document.getElementById('canvas-status-indicator');
    const statusText = document.getElementById('canvas-status');
    
    if (statusIndicator) statusIndicator.className = "w-2 h-2 rounded-full bg-secondary animate-pulse";
    if (statusText) statusText.innerText = "BIO-SCAN: COLD START";
    
    const handleFrameLoaded = () => {
        loadedFramesCount++;
        const percent = Math.round((loadedFramesCount / totalFrames) * 100);
        const percentDiv = document.getElementById('preloading-percentage');
        if (percentDiv) percentDiv.innerText = `${percent}%`;
        
        // If user has not scrolled yet, draw the best fallback/closest available frame to frame 1
        if (currentProgress === 0) {
            drawFrame(1);
        }
        
        if (loadedFramesCount >= totalFrames) {
            // All loaded! Hide preloader
            const loadingOverlay = document.getElementById('canvas-loading');
            if (loadingOverlay) {
                loadingOverlay.classList.add('opacity-0');
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }
            if (statusIndicator) statusIndicator.className = "w-2 h-2 rounded-full bg-primary";
            if (statusText) statusText.innerText = "BIO-SCAN: CALIBRATED";
            
            // Final redraw to guarantee frame 1 (which is definitely loaded now) is rendered
            drawFrame(1);
        }
    };
    
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const indexStr = String(i).padStart(3, '0');
        img.src = `FRAMES/ezgif-frame-${indexStr}.jpg`;
        img.onload = () => {
            // Force decode image to GPU cache to avoid jank on first draw
            img.decode().then(() => {
                handleFrameLoaded();
            }).catch((err) => {
                // Fallback if decode fails but image loaded
                handleFrameLoaded();
            });
        };
        img.onerror = () => {
            handleFrameLoaded();
        };
        preloadedFrames.push(img);
    }
}

// Draw individual frames with fallback logic if the target frame isn't loaded yet
function drawFrame(index) {
    if (!canvas || preloadedFrames.length === 0) return;
    
    let img = preloadedFrames[index - 1];
    if (!img || !img.complete) {
        // Backward and forward search for nearest loaded frame
        let found = false;
        for (let offset = 1; offset < totalFrames; offset++) {
            if (index - 1 - offset >= 0 && preloadedFrames[index - 1 - offset].complete) {
                img = preloadedFrames[index - 1 - offset];
                found = true;
                break;
            }
            if (index - 1 + offset < totalFrames && preloadedFrames[index - 1 + offset].complete) {
                img = preloadedFrames[index - 1 + offset];
                found = true;
                break;
            }
        }
        if (!found) return; // Wait
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set high quality smoothing settings for maximum sharpness
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Draw image preserving center-contain aspect ratio
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    
    // Round to integer coordinates and sizes to prevent sub-pixel rendering blur
    const w = Math.floor(img.width * scale);
    const h = Math.floor(img.height * scale);
    const x = Math.floor((canvas.width - w) / 2);
    const y = Math.floor((canvas.height - h) / 2);
    
    ctx.drawImage(img, x, y, w, h);
}

// Scroll-Linked Trigger and Text Slide transitions with Lerp interpolation
let targetProgress = 0;
let currentProgress = 0;
let isAnimating = false;
let lastActiveIndex = -1;

function onScroll() {
    const container = document.getElementById('hero-scroll-container');
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const containerHeight = rect.height;
    const viewportHeight = window.innerHeight;
    
    let progress = -rect.top / (containerHeight - viewportHeight);
    targetProgress = Math.max(0, Math.min(1, progress));
    
    if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(animateScroll);
    }
}

function animateScroll() {
    // Apply linear interpolation (lerp) for smooth scroll easing
    // 0.05 provides a slow, luxurious, and ultra-smooth glide
    const lerpFactor = 0.05; 
    currentProgress += (targetProgress - currentProgress) * lerpFactor;
    
    // Check if we are close enough to stop animation loop to save CPU
    if (Math.abs(targetProgress - currentProgress) < 0.0005) {
        currentProgress = targetProgress;
        isAnimating = false;
    }
    
    // Update scroll progress bar
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
        progressBar.style.width = `${currentProgress * 100}%`;
    }
    
    // Calculate corresponding frame (1 to 240)
    const frameIndex = Math.floor(currentProgress * (totalFrames - 1)) + 1;
    drawFrame(frameIndex);
    
    // Synchronize status indicator text
    const statusText = document.getElementById('canvas-status');
    if (statusText) {
        if (currentProgress > 0 && currentProgress < 1) {
            statusText.innerText = `BIO-SCAN: FRAME ${frameIndex}`;
        } else if (currentProgress === 1) {
            statusText.innerText = "BIO-SCAN: SCAN COMPLETE";
        } else {
            statusText.innerText = "BIO-SCAN: CALIBRATED";
        }
    }
    
    // Handle Text Transitions (0 to 33%, 33% to 66%, 66% to 100%)
    updateTextSlides(currentProgress);
    
    if (isAnimating) {
        requestAnimationFrame(animateScroll);
    }
}

function updateTextSlides(progress) {
    let activeIndex = 0;
    if (progress > 0.33 && progress <= 0.66) {
        activeIndex = 1;
    } else if (progress > 0.66) {
        activeIndex = 2;
    }
    
    if (activeIndex === lastActiveIndex) return;
    lastActiveIndex = activeIndex;
    
    const slides = [
        document.getElementById('hero-slide-1'),
        document.getElementById('hero-slide-2'),
        document.getElementById('hero-slide-3')
    ];
    
    slides.forEach((slide, idx) => {
        if (!slide) return;
        if (idx === activeIndex) {
            slide.classList.remove('hidden');
            // Small timeout to ensure transition starts
            setTimeout(() => {
                slide.classList.remove('opacity-0');
                slide.classList.add('active', 'opacity-100');
            }, 20);
        } else {
            slide.classList.remove('active', 'opacity-100');
            slide.classList.add('opacity-0');
            setTimeout(() => {
                if (!slide.classList.contains('active')) {
                    slide.classList.add('hidden');
                }
            }, 500);
        }
    });
}

// Navigation and Tab Switcher logic
function switchTab(tabId) {
    activeTab = tabId;
    syncTabStates();
    
    // If they click tabs, scroll them smoothly to the workspace so they don't get stuck on the hero animation
    const workspace = document.getElementById('app-workspace');
    if (workspace) {
        workspace.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Specific tab entry triggers
    if (tabId === 'compare') {
        runComparison();
    }
}

function scrollToApp(tabId) {
    switchTab(tabId);
}

function syncTabStates() {
    // Update navbar highlight
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if (btn.id === `nav-btn-${activeTab}`) {
            btn.className = "nav-btn font-body-md text-body-md text-primary font-bold border-b-2 border-primary pb-1 transition-all";
        } else {
            btn.className = "nav-btn font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors pb-1";
        }
    });
    
    // Update tab bar buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        if (btn.id === `tab-${activeTab}`) {
            btn.className = "tab-btn active px-4 py-2.5 rounded-lg text-label-sm uppercase tracking-wider text-primary border-b-2 border-primary font-bold flex items-center gap-2 transition-all";
        } else {
            btn.className = "tab-btn px-4 py-2.5 rounded-lg text-label-sm uppercase tracking-wider text-on-surface-variant hover:text-primary font-semibold flex items-center gap-2 transition-all";
        }
    });
    
    // Toggle Views
    const views = document.querySelectorAll('.tab-view');
    views.forEach(view => {
        if (view.id === `view-${activeTab}`) {
            view.classList.remove('hidden');
        } else {
            view.classList.add('hidden');
        }
    });
}

// Dropdown Initialization
function initializeDropdowns() {
    const selectBuilder = document.getElementById('builder-food-select');
    const selectA = document.getElementById('compare-select-a');
    const selectB = document.getElementById('compare-select-b');
    
    if (!selectBuilder || !selectA || !selectB) return;
    
    // Clear prior options
    selectBuilder.innerHTML = "";
    selectA.innerHTML = "";
    selectB.innerHTML = "";
    
    Object.keys(foodDatabase).forEach(key => {
        const food = foodDatabase[key];
        
        // Populating dropdown options
        const optBuilder = new Option(food.name, key);
        const optA = new Option(food.name, key);
        const optB = new Option(food.name, key);
        
        selectBuilder.add(optBuilder);
        selectA.add(optA);
        selectB.add(optB);
    });
    
    // Defaults
    selectA.value = 'avocado';
    selectB.value = 'kale';
    
    // Render default search
    loadSearchItem('avocado');
    
    // Render Builder inventory
    renderInventoryList();
}

// DASHBOARD VIEW CONTROLLER
function updateDashboard() {
    // Calculated totals
    let totalCals = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFiber = 0;
    let totalSodium = 0;
    let totalPotassium = 0;
    let totalVitC = 0;
    let totalVitK = 0;
    let totalMagnesium = 0;
    let totalFolate = 0;
    
    todayMeals.forEach(meal => {
        totalCals += meal.calories;
        totalFat += meal.fat;
        totalCarbs += meal.carbs;
        totalProtein += meal.protein;
        totalFiber += meal.fiber;
        totalSodium += meal.sodium;
        totalPotassium += meal.potassium;
        totalVitC += meal.vitC;
        totalVitK += meal.vitK;
        totalMagnesium += meal.magnesium;
        totalFolate += meal.folate;
    });
    
    // Target limits
    const targetCals = 2000;
    const targetFat = 70;
    const targetCarbs = 200;
    const targetProtein = 100;
    const targetFiber = 30;
    const targetSodium = 1500;
    const targetPotassium = 3500;
    const targetVitC = 90; // mg
    const targetVitK = 120; // mcg
    const targetMagnesium = 400; // mg
    const targetFolate = 400; // mcg
    
    // Render Calorie Ring
    const percentCals = Math.min(100, Math.round((totalCals / targetCals) * 100));
    const numberDiv = document.getElementById('dash-cal-number');
    const percentDiv = document.getElementById('dash-cal-percent');
    
    if (numberDiv) numberDiv.innerText = totalCals.toLocaleString();
    if (percentDiv) percentDiv.innerText = `${percentCals}% of max`;
    
    const circle = document.getElementById('dash-cal-ring');
    if (circle) {
        const radius = 80;
        const circumference = 2 * Math.PI * radius; // ~502.65
        const dashoffset = circumference - (percentCals / 100) * circumference;
        circle.style.strokeDashoffset = dashoffset;
    }
    
    // Render Macro Progress Bars
    const pctFat = Math.min(100, Math.round((totalFat / targetFat) * 100));
    const fatText = document.getElementById('dash-fat-text');
    const fatBar = document.getElementById('dash-fat-bar');
    if (fatText) fatText.innerText = `${Math.round(totalFat)}g / ${targetFat}g (${pctFat}%)`;
    if (fatBar) fatBar.style.width = `${pctFat}%`;
    
    const pctCarb = Math.min(100, Math.round((totalCarbs / targetCarbs) * 100));
    const carbText = document.getElementById('dash-carb-text');
    const carbBar = document.getElementById('dash-carb-bar');
    if (carbText) carbText.innerText = `${Math.round(totalCarbs)}g / ${targetCarbs}g (${pctCarb}%)`;
    if (carbBar) carbBar.style.width = `${pctCarb}%`;
    
    const pctProtein = Math.min(100, Math.round((totalProtein / targetProtein) * 100));
    const proteinText = document.getElementById('dash-protein-text');
    const proteinBar = document.getElementById('dash-protein-bar');
    if (proteinText) proteinText.innerText = `${Math.round(totalProtein)}g / ${targetProtein}g (${pctProtein}%)`;
    if (proteinBar) proteinBar.style.width = `${pctProtein}%`;
    
    // Fiber, Sodium, Potassium bottom stats
    const fiberDiv = document.getElementById('dash-stat-fiber');
    const sodiumDiv = document.getElementById('dash-stat-sodium');
    const potassiumDiv = document.getElementById('dash-stat-potassium');
    
    if (fiberDiv) fiberDiv.innerText = `${Math.round(totalFiber)}g`;
    if (sodiumDiv) sodiumDiv.innerText = `${Math.round(totalSodium)}mg`;
    if (potassiumDiv) potassiumDiv.innerText = `${Math.round(totalPotassium)}mg`;
    
    // 1. MEI Index
    const meiC = Math.min(100, (totalVitC / targetVitC) * 100);
    const meiMg = Math.min(100, (totalMagnesium / targetMagnesium) * 100);
    const meiFol = Math.min(100, (totalFolate / targetFolate) * 100);
    const meiOverall = Math.round((meiC + meiMg + meiFol) / 3);
    
    const meiValue = document.getElementById('dash-mei-value');
    const meiBar = document.getElementById('dash-mei-bar');
    if (meiValue) meiValue.innerText = `${meiOverall}%`;
    if (meiBar) meiBar.style.width = `${meiOverall}%`;
    
    // 2. Electrolyte Balance
    let electroRatio = 0;
    if (totalSodium > 0) {
        electroRatio = totalPotassium / totalSodium;
    } else if (totalPotassium > 0) {
        electroRatio = 3.0; // Optimal fallback
    }
    
    const ratioDiv = document.getElementById('dash-electrolyte-ratio');
    if (ratioDiv) ratioDiv.innerText = `K:Na ${electroRatio.toFixed(1)}`;
    
    const needle = document.getElementById('dash-electrolyte-needle');
    const statusIndicator = document.getElementById('dash-electrolyte-status');
    
    if (needle && statusIndicator) {
        let needlePos = 50;
        if (electroRatio === 0) {
            needlePos = 50;
            statusIndicator.innerText = "NO DATA";
            statusIndicator.className = "text-xs text-outline font-semibold font-label-sm uppercase";
        } else if (electroRatio < 1.0) {
            needlePos = 15;
            statusIndicator.innerText = "SODIUM EXCESS ALERT";
            statusIndicator.className = "text-xs text-error font-semibold font-label-sm uppercase";
        } else if (electroRatio >= 1.0 && electroRatio < 2.0) {
            needlePos = 35;
            statusIndicator.innerText = "MODERATE RATIO";
            statusIndicator.className = "text-xs text-secondary font-semibold font-label-sm uppercase";
        } else if (electroRatio >= 2.0 && electroRatio <= 5.0) {
            needlePos = 50;
            statusIndicator.innerText = "OPTIMAL HYDRO-RATIO";
            statusIndicator.className = "text-xs text-primary font-semibold font-label-sm uppercase";
        } else {
            needlePos = 80;
            statusIndicator.innerText = "LOW SODIUM PATHWAY";
            statusIndicator.className = "text-xs text-secondary font-semibold font-label-sm uppercase";
        }
        needle.style.left = `${needlePos}%`;
    }
    
    // 3. Bone Matrix Density Index
    const boneK = Math.min(100, (totalVitK / targetVitK) * 100);
    const boneOverall = Math.round(boneK);
    const boneValue = document.getElementById('dash-bone-value');
    const boneBar = document.getElementById('dash-bone-bar');
    if (boneValue) boneValue.innerText = `${boneOverall}%`;
    if (boneBar) boneBar.style.width = `${boneOverall}%`;
    
    // Update History list table
    const historyBody = document.getElementById('dash-history-body');
    const historyEmpty = document.getElementById('dash-history-empty');
    if (historyBody) {
        historyBody.innerHTML = "";
        if (todayMeals.length === 0) {
            if (historyEmpty) historyEmpty.classList.remove('hidden');
        } else {
            if (historyEmpty) historyEmpty.classList.add('hidden');
            todayMeals.forEach(meal => {
                const row = document.createElement('tr');
                row.className = "border-b border-outline-variant/10 hover:bg-surface-container-low/20 transition-colors";
                row.innerHTML = `
                    <td class="py-3 font-semibold text-on-surface">${meal.name}</td>
                    <td class="py-3 text-outline text-[10px] uppercase font-bold">${foodDatabase[meal.foodId] ? foodDatabase[meal.foodId].category : "Bio-Specimen"}</td>
                    <td class="py-3 text-right font-bold">${meal.quantity}g</td>
                    <td class="py-3 text-right text-primary font-bold">${Math.round(meal.calories)} kcal</td>
                    <td class="py-3 text-right text-secondary font-bold">${Math.round(meal.protein)}g</td>
                    <td class="py-3 text-center text-outline text-[10px]">${meal.timestamp}</td>
                    <td class="py-3 text-right">
                        <button onclick="removeHistoryItem(${meal.id})" class="text-error hover:text-red-400 material-symbols-outlined text-base">delete</button>
                    </td>
                `;
                historyBody.appendChild(row);
            });
        }
    }
    
    // Render or Update Chart.js Macro Balance
    updateDashboardCharts(totalProtein, totalCarbs, totalFat);
}

function removeHistoryItem(id) {
    todayMeals = todayMeals.filter(meal => meal.id !== id);
    updateDashboard();
}

function clearMealHistory() {
    todayMeals = [];
    updateDashboard();
}

// NUTRITION SEARCH VIEW CONTROLLERS
function handleSearchAutocomplete() {
    const input = document.getElementById('search-input');
    if (!input) return;
    const query = input.value.toLowerCase().trim();
    const container = document.getElementById('search-suggestions');
    if (!container) return;
    
    if (!query) {
        container.classList.add('hidden');
        return;
    }
    
    const matches = Object.keys(foodDatabase).filter(key => {
        return foodDatabase[key].name.toLowerCase().includes(query) || 
               foodDatabase[key].category.toLowerCase().includes(query);
    });
    
    if (matches.length === 0) {
        container.innerHTML = `<div class="p-3 text-xs text-outline text-center">No biological specimens matched</div>`;
    } else {
        container.innerHTML = "";
        matches.slice(0, 5).forEach(key => {
            const food = foodDatabase[key];
            const div = document.createElement('div');
            div.className = "p-3 hover:bg-primary/10 cursor-pointer flex justify-between items-center text-xs";
            div.innerHTML = `
                <span class="font-bold text-on-surface">${food.name}</span>
                <span class="text-outline uppercase text-[10px] font-label-sm">${food.category}</span>
            `;
            div.onclick = () => {
                document.getElementById('search-input').value = food.name;
                container.classList.add('hidden');
                loadSearchItem(key);
            };
            container.appendChild(div);
        });
    }
    container.classList.remove('hidden');
}

function triggerSearchScan() {
    const input = document.getElementById('search-input');
    if (!input) return;
    const query = input.value.toLowerCase().trim();
    let matchedKey = null;
    
    Object.keys(foodDatabase).forEach(key => {
        if (foodDatabase[key].name.toLowerCase() === query) {
            matchedKey = key;
        }
    });
    
    if (!matchedKey) {
        matchedKey = Object.keys(foodDatabase).find(key => foodDatabase[key].name.toLowerCase().includes(query));
    }
    
    if (!matchedKey) {
        matchedKey = 'avocado'; // Fallback
    }
    
    const btn = document.querySelector('button[onclick="triggerSearchScan()"]');
    const icon = document.getElementById('search-scan-icon');
    const text = document.getElementById('search-scan-text');
    
    if (icon) {
        icon.innerText = "sync";
        icon.classList.add('animate-spin');
    }
    if (text) text.innerText = "Analyzing Bio-Cells...";
    
    const profile = document.getElementById('search-profile');
    if (profile) profile.className = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse opacity-50";
    
    setTimeout(() => {
        if (icon) {
            icon.innerText = "check_circle";
            icon.classList.remove('animate-spin');
        }
        if (text) text.innerText = "Scan Complete";
        
        if (profile) profile.className = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-500";
        loadSearchItem(matchedKey);
        
        setTimeout(() => {
            if (icon) icon.innerText = "center_focus_weak";
            if (text) text.innerText = "Scan Bio-Item";
        }, 2000);
    }, 1200);
}

function loadSearchItem(foodKey) {
    const food = foodDatabase[foodKey];
    if (!food) return;
    
    const container = document.getElementById('search-profile');
    if (!container) return;
    container.innerHTML = "";
    
    const benefitsHTML = food.benefits.map(b => `
        <span class="px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded uppercase font-bold tracking-wider">${b}</span>
    `).join('');
    
    container.innerHTML = `
        <!-- Main Macro Card -->
        <div class="md:col-span-2 lg:col-span-2 glass-panel rounded-3xl p-6 glow-border brushed-metal">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <span class="text-[10px] text-outline font-label-sm uppercase tracking-widest">${food.category}</span>
                    <h2 class="font-display-lg text-3xl text-on-surface font-bold mt-1">${food.name}</h2>
                    <p class="text-xs text-on-surface-variant mt-2 leading-relaxed max-w-md">${food.description}</p>
                </div>
                <div class="text-right bg-surface-container/60 border border-outline-variant/20 rounded-2xl p-4">
                    <div class="text-3xl font-display-lg text-primary leading-none font-bold">${food.calories}</div>
                    <div class="text-[9px] text-outline font-label-sm uppercase mt-1">kcal / 100g</div>
                </div>
            </div>
            
            <div class="space-y-4">
                <div class="space-y-1.5">
                    <div class="flex justify-between text-xs font-label-sm uppercase">
                        <span class="text-on-surface-variant">Lipids (Healthy Fats)</span>
                        <span class="text-secondary font-bold">${food.fat}g / ${Math.round((food.fat * 9 / food.calories) * 100 || 0)}% energy</span>
                    </div>
                    <div class="h-2.5 bg-surface-container-highest/40 rounded-full overflow-hidden">
                        <div class="liquid-fill h-full rounded-full" style="width: ${Math.min(100, (food.fat / 30) * 100)}%; background: linear-gradient(90deg, #83c300, #b2f746);"></div>
                    </div>
                </div>
                <div class="space-y-1.5">
                    <div class="flex justify-between text-xs font-label-sm uppercase">
                        <span class="text-on-surface-variant">Carbohydrates</span>
                        <span class="text-tertiary font-bold">${food.carbs}g / ${Math.round((food.carbs * 4 / food.calories) * 100 || 0)}% energy</span>
                    </div>
                    <div class="h-2.5 bg-surface-container-highest/40 rounded-full overflow-hidden">
                        <div class="liquid-fill h-full rounded-full" style="width: ${Math.min(100, (food.carbs / 50) * 100)}%; background: linear-gradient(90deg, #71af97, #b0f0d6);"></div>
                    </div>
                </div>
                <div class="space-y-1.5">
                    <div class="flex justify-between text-xs font-label-sm uppercase">
                        <span class="text-on-surface-variant">Proteins (Amino Acids)</span>
                        <span class="text-primary font-bold">${food.protein}g / ${Math.round((food.protein * 4 / food.calories) * 100 || 0)}% energy</span>
                    </div>
                    <div class="h-2.5 bg-surface-container-highest/40 rounded-full overflow-hidden">
                        <div class="liquid-fill h-full rounded-full" style="width: ${Math.min(100, (food.protein / 25) * 100)}%; background: linear-gradient(90deg, #10b981, #4edea3);"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Micro Nutrient Card 1 -->
        <div class="glass-panel rounded-3xl p-6 flex flex-col justify-between glow-border relative bg-secondary/5">
            <div>
                <div class="flex justify-between items-center mb-4">
                    <span class="material-symbols-outlined text-secondary text-3xl">bolt</span>
                    <span class="text-[10px] text-outline font-label-sm uppercase tracking-widest font-semibold">ELECTROLYTE</span>
                </div>
                <h3 class="text-headline-lg font-bold text-on-surface text-base">Potassium (K)</h3>
                <p class="text-xs text-on-surface-variant mt-2 leading-relaxed">Critical ionic element responsible for active cardiovascular signaling and intracellular hydration.</p>
            </div>
            <div class="mt-6">
                <div class="text-3xl font-display-lg text-secondary font-bold">${food.potassium}<span class="text-xs font-label-sm">mg</span></div>
                <div class="text-[9px] text-outline font-label-sm uppercase mt-0.5">${Math.round((food.potassium / 3500) * 100)}% daily bio-load</div>
            </div>
        </div>

        <!-- Micro Nutrient Card 2 -->
        <div class="glass-panel rounded-3xl p-6 flex flex-col justify-between glow-border relative bg-tertiary/5">
            <div>
                <div class="flex justify-between items-center mb-4">
                    <span class="material-symbols-outlined text-tertiary text-3xl">shield_with_heart</span>
                    <span class="text-[10px] text-outline font-label-sm uppercase tracking-widest font-semibold">COAGULATION</span>
                </div>
                <h3 class="text-headline-lg font-bold text-on-surface text-base">Vitamin K</h3>
                <p class="text-xs text-on-surface-variant mt-2 leading-relaxed">Required cofactor for synthesis of bone matrix proteins and coagulation cascades.</p>
            </div>
            <div class="mt-6">
                <div class="text-3xl font-display-lg text-tertiary font-bold">${food.vitaminK}<span class="text-xs font-label-sm">mcg</span></div>
                <div class="text-[9px] text-outline font-label-sm uppercase mt-0.5">${Math.round((food.vitaminK / 120) * 100)}% daily bio-load</div>
            </div>
        </div>

        <!-- Detailed Molecular List -->
        <div class="lg:col-span-3 glass-panel rounded-3xl p-6 glow-border flex flex-col justify-between">
            <div>
                <h3 class="font-headline-lg text-base font-bold text-on-surface mb-4">Complete Chemical Footprint</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-xs font-label-sm text-on-surface-variant">
                    <div class="flex justify-between items-center py-2 border-b border-outline-variant/10">
                        <span>Dietary Fiber</span>
                        <span class="font-bold text-primary">${food.fiber}g</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-outline-variant/10">
                        <span>Sodium (Na)</span>
                        <span class="font-bold text-primary">${food.sodium}mg</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-outline-variant/10">
                        <span>Vitamin C</span>
                        <span class="font-bold text-primary">${food.vitaminC}mg</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-outline-variant/10">
                        <span>Magnesium (Mg)</span>
                        <span class="font-bold text-primary">${food.magnesium}mg</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-outline-variant/10">
                        <span>Folate (B9)</span>
                        <span class="font-bold text-primary">${food.folate}mcg</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-outline-variant/10">
                        <span>Lutein / Zeaxanthin</span>
                        <span class="font-bold text-primary">${food.lutein}mcg</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-outline-variant/10 md:border-b-0">
                        <span>Omega-3 polyunsaturated</span>
                        <span class="font-bold text-primary">${food.omega3}mg</span>
                    </div>
                </div>
            </div>
            <div class="mt-6 pt-4 border-t border-outline-variant/15 flex justify-between items-center">
                <span class="text-[10px] text-outline">All metrics calibrated based on 100g raw standard mass.</span>
                <button onclick="injectFoodToBuilder('${foodKey}')" class="text-xs text-primary font-bold hover:underline flex items-center gap-1 font-label-sm uppercase">
                    Open in Meal Builder <span class="material-symbols-outlined text-sm">chevron_right</span>
                </button>
            </div>
        </div>

        <!-- Bio-Status Widget -->
        <div class="glass-panel rounded-3xl p-6 bg-primary/5 relative glow-border flex flex-col justify-between text-left">
            <div class="absolute top-4 right-4">
                <span class="material-symbols-outlined text-primary text-3xl">eco</span>
            </div>
            <div>
                <h4 class="text-xs text-outline font-label-sm uppercase mb-2">Performance Rating</h4>
                <div class="text-5xl font-display-lg text-primary font-bold mb-4">${food.rating}</div>
                <p class="text-xs text-on-surface-variant leading-relaxed">Specimen evaluated by predictive heuristic algorithms as highly therapeutic.</p>
            </div>
            <div class="mt-6 flex flex-wrap gap-2">
                ${benefitsHTML}
            </div>
        </div>
    `;
    
    // Set trigger for layout animation
    const fills = container.querySelectorAll('.liquid-fill');
    setTimeout(() => {
        fills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0';
            setTimeout(() => { fill.style.width = width; }, 100);
        });
    }, 50);
}

function injectFoodToBuilder(foodKey) {
    const select = document.getElementById('builder-food-select');
    if (select) select.value = foodKey;
    switchTab('builder');
}

// Render or Update Chart.js Macro Balance doughnut chart
function updateDashboardCharts(protein, carbs, fat) {
    const ctxChart = document.getElementById('macro-doughnut-chart');
    if (!ctxChart) return;
    
    const total = protein + carbs + fat;
    const proteinPct = total > 0 ? Math.round((protein / total) * 100) : 0;
    const carbsPct = total > 0 ? Math.round((carbs / total) * 100) : 0;
    const fatPct = total > 0 ? Math.round((fat / total) * 100) : 0;
    
    // Update advisory text card below the chart
    const adviceDiv = document.getElementById('dash-chart-advice');
    if (adviceDiv) {
        if (total === 0) {
            adviceDiv.innerText = "No bio-load registered. Add food items to calibrate molecular analysis.";
        } else {
            adviceDiv.innerHTML = `Molecular ratio: <strong class="text-primary font-bold">${proteinPct}%</strong> Protein, <strong class="text-tertiary font-bold">${carbsPct}%</strong> Carbs, <strong class="text-secondary font-bold">${fatPct}%</strong> Lipids.`;
        }
    }
    
    const chartData = {
        labels: ['Protein', 'Carbs', 'Fats'],
        datasets: [{
            data: [protein, carbs, fat],
            backgroundColor: [
                '#10b981', // green for protein
                '#71af97', // teal for carbs
                '#83c300'  // lime for lipids
            ],
            borderColor: '#0b1326',
            borderWidth: 2,
            hoverOffset: 4
        }]
    };
    
    if (macroDoughnutChart) {
        macroDoughnutChart.data.datasets[0].data = [protein, carbs, fat];
        macroDoughnutChart.update();
    } else {
        macroDoughnutChart = new Chart(ctxChart, {
            type: 'doughnut',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false // We use our custom advisory card, keeping layout clean
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const val = context.raw;
                                const pct = total > 0 ? Math.round((val / total) * 100) : 0;
                                return ` ${context.label}: ${Math.round(val)}g (${pct}%)`;
                            }
                        },
                        backgroundColor: '#131b2e',
                        titleColor: '#dae2fd',
                        bodyColor: '#bbcabf',
                        borderColor: 'rgba(78, 222, 163, 0.2)',
                        borderWidth: 1
                    }
                }
            }
        });
    }
}
