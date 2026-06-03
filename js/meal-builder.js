let builderMeal = [];

function updateBuilderMassSlider(val) {
    const numInput = document.getElementById('builder-mass-number');
    const display = document.getElementById('builder-mass-display');
    if (numInput) numInput.value = val;
    if (display) display.innerText = `${val}g`;
}

function updateBuilderMassNumber(val) {
    // Cap at slider ranges
    const constrained = Math.max(10, Math.min(500, val));
    const rangeInput = document.getElementById('builder-mass-range');
    const display = document.getElementById('builder-mass-display');
    if (rangeInput) rangeInput.value = constrained;
    if (display) display.innerText = `${constrained}g`;
}

function addFoodToMeal() {
    const select = document.getElementById('builder-food-select');
    if (!select) return;
    
    const foodKey = select.value;
    const quantity = parseFloat(document.getElementById('builder-mass-number').value);
    const food = foodDatabase[foodKey];
    
    if (!food || isNaN(quantity) || quantity <= 0) return;
    
    // Compute fractional scalars
    const scalar = quantity / 100;
    
    const item = {
        id: Date.now() + Math.random(),
        foodId: foodKey,
        name: food.name,
        quantity: quantity,
        calories: food.calories * scalar,
        protein: food.protein * scalar,
        carbs: food.carbs * scalar,
        fat: food.fat * scalar,
        fiber: food.fiber * scalar,
        sodium: food.sodium * scalar,
        potassium: food.potassium * scalar,
        vitC: food.vitaminC * scalar,
        vitK: food.vitaminK * scalar,
        magnesium: food.magnesium * scalar,
        folate: food.folate * scalar
    };
    
    builderMeal.push(item);
    updateMealBuilder();
}

function removeBuilderItem(id) {
    builderMeal = builderMeal.filter(item => item.id !== id);
    updateMealBuilder();
}

function clearBuilderMeal() {
    builderMeal = [];
    updateMealBuilder();
}

function updateMealBuilder() {
    const logBody = document.getElementById('builder-log-body');
    if (!logBody) return;
    
    logBody.innerHTML = "";
    
    let totalCals = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalFiber = 0;
    let totalSodium = 0;
    let totalPotassium = 0;
    let totalVitC = 0;
    let totalVitK = 0;
    
    const saveBtn = document.getElementById('builder-save-btn');
    const emptyLog = document.getElementById('builder-log-empty');
    
    if (builderMeal.length === 0) {
        if (emptyLog) emptyLog.classList.remove('hidden');
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.className = "w-full bg-secondary/30 text-surface/50 text-xs font-bold py-2.5 rounded-lg cursor-not-allowed flex items-center justify-center gap-1";
        }
    } else {
        if (emptyLog) emptyLog.classList.add('hidden');
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.className = "w-full bg-secondary text-surface text-xs font-bold py-2.5 rounded-lg hover:scale-103 transition-all flex items-center justify-center gap-1 shadow-lg shadow-secondary/15";
        }
        
        builderMeal.forEach(item => {
            totalCals += item.calories;
            totalProtein += item.protein;
            totalCarbs += item.carbs;
            totalFat += item.fat;
            totalFiber += item.fiber;
            totalSodium += item.sodium;
            totalPotassium += item.potassium;
            totalVitC += item.vitC;
            totalVitK += item.vitK;
            
            const row = document.createElement('tr');
            row.className = "border-b border-outline-variant/10 hover:bg-surface-container-low/20 transition-colors";
            row.innerHTML = `
                <td class="py-2.5 font-semibold text-on-surface">${item.name}</td>
                <td class="py-2.5 text-right font-bold">${item.quantity}g</td>
                <td class="py-2.5 text-right text-primary">${Math.round(item.calories)} kcal</td>
                <td class="py-2.5 text-right text-secondary">${item.protein.toFixed(1)}g</td>
                <td class="py-2.5 text-right text-tertiary">${item.carbs.toFixed(1)}g</td>
                <td class="py-2.5 text-right text-on-surface-variant">${item.fat.toFixed(1)}g</td>
                <td class="py-2.5 text-right">
                    <button onclick="removeBuilderItem(${item.id})" class="text-error hover:text-red-400 material-symbols-outlined text-sm">close</button>
                </td>
            `;
            logBody.appendChild(row);
        });
    }
    
    // Set dynamic bottom statistics
    const totalCalsDiv = document.getElementById('builder-total-cals');
    const totalProteinDiv = document.getElementById('builder-total-protein');
    const totalCarbsDiv = document.getElementById('builder-total-carbs');
    const totalFatDiv = document.getElementById('builder-total-fat');
    
    if (totalCalsDiv) totalCalsDiv.innerText = `${Math.round(totalCals)} kcal`;
    if (totalProteinDiv) totalProteinDiv.innerText = `${totalProtein.toFixed(1)}g`;
    if (totalCarbsDiv) totalCarbsDiv.innerText = `${totalCarbs.toFixed(1)}g`;
    if (totalFatDiv) totalFatDiv.innerText = `${totalFat.toFixed(1)}g`;
    
    // Calculate and render ML Heuristic Health Score
    calculateMealHealthScore(totalCals, totalProtein, totalCarbs, totalFat, totalFiber, totalSodium, totalPotassium, totalVitC, totalVitK);
}

// Heuristic Multi-criteria Classification Model for Health Rating
function calculateMealHealthScore(cals, protein, carbs, fat, fiber, sodium, potassium, vitC, vitK) {
    const scoreRing = document.getElementById('builder-health-ring');
    const scoreGrade = document.getElementById('builder-health-grade');
    const scoreDisplay = document.getElementById('builder-health-score');
    const diagnosticPanel = document.getElementById('builder-diagnostic-panel');
    
    const ringRadius = 60;
    const ringCircumference = 2 * Math.PI * ringRadius; // ~376.99
    
    if (builderMeal.length === 0) {
        if (scoreRing) scoreRing.style.strokeDashoffset = ringCircumference;
        if (scoreGrade) {
            scoreGrade.innerText = "N/A";
            scoreGrade.className = "text-4xl font-display-lg text-primary font-bold";
        }
        if (scoreDisplay) scoreDisplay.innerText = "Score: 0";
        if (diagnosticPanel) {
            diagnosticPanel.innerHTML = `
                <div class="flex gap-3 text-xs text-outline items-center py-2">
                    <span class="material-symbols-outlined">analytics</span>
                    Assemble recipe ingredients to generate cell diagnostic reports.
                </div>
            `;
        }
        return;
    }
    
    // 100-point index formula
    let score = 75; // Baseline
    
    // Macros distribution penalties and bonuses
    const totalGrams = protein + carbs + fat;
    let adviceAlerts = [];
    
    if (totalGrams > 0) {
        const pctProt = (protein / totalGrams) * 100;
        const pctCarb = (carbs / totalGrams) * 100;
        
        // Protein: Ideal is 20% to 35%
        if (pctProt >= 20 && pctProt <= 35) {
            score += 5;
        } else if (pctProt < 15) {
            score -= 5;
            adviceAlerts.push("⚠️ Low Amino-Acid Density: Add chicken breast, salmon, or tofu to boost protein repair reserves.");
        }
        
        // Carbohydrates: Ideal is 30% to 50%
        if (pctCarb > 65) {
            score -= 8;
            adviceAlerts.push("⚠️ High Carb Ratio: Elevates insulin response. Balance with lipids or proteins.");
        }
    }
    
    // Sodium limits: limit to 500mg per meal
    if (sodium > 800) {
        score -= 10;
        adviceAlerts.push("⚠️ Sodium Excess: Intake registers high. Can trigger arterial pressure. Balance with Potassium-rich elements.");
    } else if (sodium > 0 && potassium / sodium >= 2.0) {
        score += 8; // Good K:Na balance
    }
    
    // Fiber bonus: Target is 10g per meal
    if (fiber >= 10) {
        score += 8;
    } else if (fiber < 3) {
        score -= 4;
        adviceAlerts.push("⚠️ Prebiotic Deficiency: Fiber load is low. Add kale, oatmeal, chia seeds, or turmeric.");
    }
    
    // Micronutrient density bonus
    if (vitC > 30) score += 4;
    if (vitK > 40) score += 4;
    
    // Bound score between 10 and 100
    score = Math.max(10, Math.min(100, Math.round(score)));
    
    // Determine Grade label
    let grade = 'F';
    let gradeColor = 'text-error';
    if (score >= 95) { grade = 'A+'; gradeColor = 'text-primary'; }
    else if (score >= 90) { grade = 'A'; gradeColor = 'text-primary'; }
    else if (score >= 80) { grade = 'B+'; gradeColor = 'text-secondary'; }
    else if (score >= 70) { grade = 'B'; gradeColor = 'text-secondary'; }
    else if (score >= 60) { grade = 'C'; gradeColor = 'text-tertiary'; }
    else if (score >= 50) { grade = 'D'; gradeColor = 'text-tertiary'; }
    
    // Render Radial Ring
    if (scoreRing) {
        const offset = ringCircumference - (score / 100) * ringCircumference;
        scoreRing.style.strokeDashoffset = offset;
    }
    
    if (scoreGrade) {
        scoreGrade.innerText = grade;
        scoreGrade.className = `text-4xl font-display-lg font-bold ${gradeColor}`;
    }
    if (scoreDisplay) scoreDisplay.innerText = `Score: ${score}`;
    
    // Render advice list
    if (diagnosticPanel) {
        if (adviceAlerts.length === 0) {
            diagnosticPanel.innerHTML = `
                <div class="flex gap-3 text-xs text-primary items-center py-2 font-medium bg-primary/5 rounded-xl px-4 border border-primary/20">
                    <span class="material-symbols-outlined text-lg">check_circle</span>
                    Specimen recipe matches OPTIMAL HOMEOSATIS requirements. High nutrient density detected.
                </div>
            `;
        } else {
            diagnosticPanel.innerHTML = adviceAlerts.map(alert => `
                <div class="flex gap-3 text-xs text-on-surface-variant items-start py-2 border-b border-outline-variant/10 last:border-b-0">
                    <div class="mt-0.5">${alert}</div>
                </div>
            `).join('');
        }
    }
}

function commitBuilderMealToLog() {
    if (builderMeal.length === 0) return;
    
    // Consolidate current builder meal into todayMeals
    builderMeal.forEach(item => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        todayMeals.push({
            id: Date.now() + Math.random(),
            foodId: item.foodId,
            name: item.name,
            quantity: item.quantity,
            calories: item.calories,
            protein: item.protein,
            carbs: item.carbs,
            fat: item.fat,
            fiber: item.fiber,
            sodium: item.sodium,
            potassium: item.potassium,
            vitC: item.vitC,
            vitK: item.vitK,
            magnesium: item.magnesium || 0,
            folate: item.folate || 0,
            timestamp: timeStr
        });
    });
    
    // Clear builder
    builderMeal = [];
    updateMealBuilder();
    updateDashboard();
    
    // Switch to Dashboard to inspect results
    switchTab('dashboard');
}

function renderInventoryList() {
    const list = document.getElementById('builder-inventory-list');
    if (!list) return;
    list.innerHTML = "";
    
    Object.keys(foodDatabase).forEach(key => {
        const food = foodDatabase[key];
        const item = document.createElement('div');
        item.className = "py-3 flex justify-between items-center hover:bg-surface-container-low/20 transition-all px-2 rounded-lg group cursor-pointer";
        item.onclick = () => {
            const select = document.getElementById('builder-food-select');
            if (select) select.value = key;
        };
        item.innerHTML = `
            <div>
                <div class="font-semibold text-on-surface text-xs group-hover:text-primary transition-colors">${food.name}</div>
                <div class="text-[9px] text-outline font-label-sm uppercase mt-0.5">${food.category}</div>
            </div>
            <div class="text-right">
                <div class="text-xs text-primary font-bold font-label-sm">${food.calories} kcal</div>
                <div class="text-[9px] text-outline font-label-sm">per 100g</div>
            </div>
        `;
        list.appendChild(item);
    });
}
