// Side-by-side Food Comparison logic
function runComparison() {
    const foodKeyA = document.getElementById('compare-select-a').value;
    const foodKeyB = document.getElementById('compare-select-b').value;
    
    const foodA = foodDatabase[foodKeyA];
    const foodB = foodDatabase[foodKeyB];
    
    if (!foodA || !foodB) return;
    
    // Render Side-by-Side Table Details
    const detailsPanel = document.getElementById('compare-details-panel');
    if (detailsPanel) {
        detailsPanel.innerHTML = `
            <table class="w-full text-left text-xs font-label-sm divide-y divide-outline-variant/15">
                <thead>
                    <tr class="text-outline uppercase text-[10px]">
                        <th class="py-2">Nutrient (100g)</th>
                        <th class="py-2 text-primary font-bold">${foodA.name}</th>
                        <th class="py-2 text-secondary font-bold">${foodB.name}</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant/10 text-on-surface-variant">
                    <tr class="hover:bg-surface-container-low/10">
                        <td class="py-2 font-medium">Energy (kcal)</td>
                        <td class="py-2 text-primary font-bold">${foodA.calories}</td>
                        <td class="py-2 text-secondary font-bold">${foodB.calories}</td>
                    </tr>
                    <tr class="hover:bg-surface-container-low/10">
                        <td class="py-2 font-medium">Proteins (g)</td>
                        <td class="py-2 text-primary font-bold">${foodA.protein}</td>
                        <td class="py-2 text-secondary font-bold">${foodB.protein}</td>
                    </tr>
                    <tr class="hover:bg-surface-container-low/10">
                        <td class="py-2 font-medium">Carbs (g)</td>
                        <td class="py-2 text-primary font-bold">${foodA.carbs}</td>
                        <td class="py-2 text-secondary font-bold">${foodB.carbs}</td>
                    </tr>
                    <tr class="hover:bg-surface-container-low/10">
                        <td class="py-2 font-medium">Lipids (g)</td>
                        <td class="py-2 text-primary font-bold">${foodA.fat}</td>
                        <td class="py-2 text-secondary font-bold">${foodB.fat}</td>
                    </tr>
                    <tr class="hover:bg-surface-container-low/10">
                        <td class="py-2 font-medium">Fiber (g)</td>
                        <td class="py-2 text-primary font-bold">${foodA.fiber}</td>
                        <td class="py-2 text-secondary font-bold">${foodB.fiber}</td>
                    </tr>
                    <tr class="hover:bg-surface-container-low/10">
                        <td class="py-2 font-medium">Potassium (mg)</td>
                        <td class="py-2 text-primary font-bold">${foodA.potassium}</td>
                        <td class="py-2 text-secondary font-bold">${foodB.potassium}</td>
                    </tr>
                    <tr class="hover:bg-surface-container-low/10">
                        <td class="py-2 font-medium">Vitamin K (mcg)</td>
                        <td class="py-2 text-primary font-bold">${foodA.vitaminK}</td>
                        <td class="py-2 text-secondary font-bold">${foodB.vitaminK}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
    
    // Build Dynamic Horizontal Comparison Bars
    const barsContainer = document.getElementById('compare-bars-container');
    if (barsContainer) {
        barsContainer.innerHTML = "";
        
        const compareMetrics = [
            { label: "Energy / Calories (kcal)", key: "calories", max: 900 },
            { label: "Proteins / Amino Acids (g)", key: "protein", max: 35 },
            { label: "Carbohydrates (g)", key: "carbs", max: 70 },
            { label: "Lipids / Fats (g)", key: "fat", max: 100 },
            { label: "Dietary Prebiotic Fiber (g)", key: "fiber", max: 35 },
            { label: "Potassium Electrolytes (mg)", key: "potassium", max: 2100 }
        ];
        
        compareMetrics.forEach(metric => {
            const valA = foodA[metric.key];
            const valB = foodB[metric.key];
            
            const pctA = Math.min(100, (valA / metric.max) * 100);
            const pctB = Math.min(100, (valB / metric.max) * 100);
            
            const barDiv = document.createElement('div');
            barDiv.className = "space-y-1.5";
            barDiv.innerHTML = `
                <span class="text-xs text-on-surface-variant font-medium">${metric.label}</span>
                <div class="grid grid-cols-2 gap-2 items-center">
                    <!-- Bar Specimen A (Primary) -->
                    <div class="flex items-center gap-2 justify-end">
                        <span class="text-[10px] text-primary font-bold font-label-sm">${valA.toFixed(1)}</span>
                        <div class="w-full bg-surface-container-highest/20 rounded-full h-3 overflow-hidden border border-outline-variant/10 flex justify-end">
                            <div class="bg-primary h-full rounded-full transition-all duration-1000 w-0" style="width: ${pctA}%;"></div>
                        </div>
                    </div>
                    <!-- Bar Specimen B (Secondary) -->
                    <div class="flex items-center gap-2">
                        <div class="w-full bg-surface-container-highest/20 rounded-full h-3 overflow-hidden border border-outline-variant/10">
                            <div class="bg-secondary h-full rounded-full transition-all duration-1000 w-0" style="width: ${pctB}%;"></div>
                        </div>
                        <span class="text-[10px] text-secondary font-bold font-label-sm">${valB.toFixed(1)}</span>
                    </div>
                </div>
            `;
            barsContainer.appendChild(barDiv);
        });
    }
    
    // Build dynamic text comparison summary
    const verdict = document.getElementById('compare-ai-verdict');
    if (verdict) {
        let comparePoints = [];
        
        if (foodA.protein > foodB.protein * 1.5) {
            comparePoints.push(`Amino-Acid Synthesis: ${foodA.name} exceeds ${foodB.name} by ${Math.round((foodA.protein - foodB.protein))}g per unit.`);
        } else if (foodB.protein > foodA.protein * 1.5) {
            comparePoints.push(`Amino-Acid Synthesis: ${foodB.name} outperforms ${foodA.name} by ${Math.round((foodB.protein - foodA.protein))}g per unit.`);
        }
        
        if (foodA.fiber > foodB.fiber + 3) {
            comparePoints.push(`Prebiotic Matrix: ${foodA.name} yields significantly higher fiber layers.`);
        } else if (foodB.fiber > foodA.fiber + 3) {
            comparePoints.push(`Prebiotic Matrix: ${foodB.name} displays superior prebiotic fiber structures.`);
        }
        
        if (foodA.potassium > foodB.potassium + 150) {
            comparePoints.push(`Hydration Capacity: ${foodA.name} is a much denser potassium donor.`);
        } else if (foodB.potassium > foodA.potassium + 150) {
            comparePoints.push(`Hydration Capacity: ${foodB.name} contains higher electrolyte densities.`);
        }
        
        if (comparePoints.length === 0) {
            verdict.innerText = `CHEMISTRY REPORT: Both ${foodA.name} and ${foodB.name} exhibit equivalent macronutrient footprints with minor molecular variances.`;
        } else {
            verdict.innerText = `CHEMISTRY REPORT: ${comparePoints.join(' ')}`;
        }
    }
}
