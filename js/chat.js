// Chat history log
let chatHistory = [
    { sender: 'bot', text: "CHLOROPHYLL-v1 online. Welcome to the Bio-Digital Laboratory. Select a diagnostic prompt chip on the left or type your query below to analyze your cellular pathways." }
];

function resetChatHistory() {
    chatHistory = [
        { sender: 'bot', text: "Chat history flushed. CHLOROPHYLL-v1 standing by." }
    ];
    updateChatView();
}

function injectPromptChip(text) {
    document.getElementById('ai-chat-input').value = text;
    sendChatMessage();
}

function handleChatInputKey(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const input = document.getElementById('ai-chat-input');
    const query = input.value.trim();
    if (!query) return;
    
    chatHistory.push({ sender: 'user', text: query });
    input.value = "";
    updateChatView();
    
    // Show typing indicator
    const typing = document.getElementById('ai-chat-typing');
    if (typing) typing.classList.remove('hidden');
    
    // Read the key from config.js if it exists, otherwise fall back to empty
    const activeApiKey = typeof GEMINI_API_KEY !== 'undefined' ? GEMINI_API_KEY : '';
    
    setTimeout(async () => {
        let responseText = "";
        
        if (activeApiKey) {
            // Call Live Gemini API from browser
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${activeApiKey}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `You are CHLOROPHYLL-v1, a highly advanced bio-digital clinical nutrition assistant. Your style is high-tech, precise, data-driven, and supportive. Use terms like 'metabolic bio-load', 'cellular threshold', 'prebiotic matrix', 'amino acid balance'. You have a local organic library containing: Avocado, Kale, Wild Salmon, Blueberries, Spinach, Chicken Breast, Broccoli, Quinoa, Greek Yogurt, Eggs, Almonds, Sweet Potato, Oatmeal, Chia Seeds, Olive Oil, Banana, Tofu, Turmeric. Keep answers concise (max 3-4 bullet points), highly structured and scientifically accurate. The user's query is: ${query}`
                            }]
                        }]
                    })
                });
                
                const resJson = await response.json();
                if (resJson.candidates && resJson.candidates[0].content.parts[0].text) {
                    responseText = resJson.candidates[0].content.parts[0].text;
                } else if (resJson.error) {
                    responseText = `⚠️ **Gemini API Error:** ${resJson.error.message} (Status: ${resJson.error.status})`;
                } else {
                    responseText = `Node Connection Interrupt: Invalid API response. Check key allocations. Response: ${JSON.stringify(resJson)}`;
                }
            } catch (err) {
                console.error("Gemini API error:", err);
                responseText = "⚠️ Network Interrupt: Failed to connect to Gemini Generative API servers. Reverting to local diagnostics.";
            }
        }
        
        // Local Heuristics Fallback Engine (runs if API failed or offline)
        if (!responseText) {
            responseText = generateLocalBotResponse(query);
        }
        
        if (typing) typing.classList.add('hidden');
        chatHistory.push({ sender: 'bot', text: responseText });
        updateChatView();
        
    }, 1000);
}

function generateLocalBotResponse(query) {
    const lowQuery = query.toLowerCase();
    
    if (lowQuery.includes('potassium') || lowQuery.includes('hydration') || lowQuery.includes('electrolyte')) {
        return `**ELECTROLYTE HYDRO-DIAGNOSTIC REPORT:**\n\n* **Mechanism:** Potassium (K) coordinates the cellular resting potentials. Balanced levels offset sodium fluid overload.\n* **Optimal Library Donors:** Avocado (485mg/100g) and Banana (358mg/100g) deliver maximum bio-available potassium.\n* **Clinical Advice:** Avoid sodium loads above 2000mg. Aim for a K:Na ratio of at least 2:1 for vascular flexibility.`;
    }
    
    if (lowQuery.includes('protein') || lowQuery.includes('amino') || lowQuery.includes('muscle')) {
        return `**AMINO ACID REPAIR SIGNATURE:**\n\n* **Mechanism:** Muscle myofibrillar protein synthesis requires complete, bio-available amino acid sequences.\n* **Optimal Library Donors:** Wild Salmon (25.0g protein/100g) and Chicken Breast (31.0g protein/100g) are optimal protein blocks.\n* **Plant alternatives:** Almonds (21.2g) and Tofu (8.0g) provide excellent vegetarian lipid-protein balance.`;
    }
    
    if (lowQuery.includes('bone') || lowQuery.includes('vitamin k') || lowQuery.includes('coagulation')) {
        return `**BONE MATRIX DENSITY REPORT:**\n\n* **Mechanism:** Vitamin K serves as a critical cofactor for osteocalcin synthesis, securing calcium inside the bone matrix.\n* **Optimal Library Donors:** Spinach (483mcg/100g) and Kale (390mcg/100g) deliver massive, highly therapeutic Vitamin K loads.\n* **Clinical Advice:** Combine leafy greens with a healthy lipid carrier like Olive Oil to optimize lipophilic absorption.`;
    }
    
    if (lowQuery.includes('fiber') || lowQuery.includes('gut') || lowQuery.includes('microbiome')) {
        return `**PREBIOTIC FLORA SYNERGY:**\n\n* **Mechanism:** Prebiotic soluble fiber undergoes fermentation in the colon, producing short-chain fatty acids (SCFAs).\n* **Optimal Library Donors:** Chia Seeds (34.4g fiber/100g) and Almonds (12.5g) are outstanding intestinal motility agents.\n* **Clinical Advice:** Incremental fiber increases must be paired with elevated cellular hydration ratios.`;
    }
    
    if (lowQuery.includes('meal') || lowQuery.includes('diet') || lowQuery.includes('suggest') || lowQuery.includes('blueprint')) {
        return `**CELLULAR PERFORMANCE DIET BLUEPRINT:**\n\n* **Blueprint A (Energy):** 150g Wild Salmon + 100g Spinach + 50g Avocado. (Rich in Omega-3, Potassium, Vitamin K, and high protein).\n* **Blueprint B (Fiber/Plant):** 100g Quinoa + 100g Tofu + 50g Broccoli + 20g Chia Seeds.\n* **Diagnostics:** Both combinations optimize the mitochondrial output index, resulting in an A+ Health Rating.`;
    }

    return `**BIO-DIGITAL DIAGNOSTICS NODE:**\n\n* **Status:** Offline fallback rules engine active if the connection drops.\n* **Response:** Your query relates to a generalized nutrient parameter. Query specific terms like 'Protein', 'Potassium', 'Vitamin K', 'Fiber', or request a 'Meal Blueprint'.`;
}

function updateChatView() {
    const container = document.getElementById('ai-chat-messages');
    if (!container) return;
    container.innerHTML = "";
    
    chatHistory.forEach(msg => {
        const bubble = document.createElement('div');
        bubble.className = msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start';
        
        const inner = document.createElement('div');
        inner.className = msg.sender === 'user' 
            ? 'max-w-[80%] glass-panel rounded-2xl rounded-tr-none px-4 py-3 border border-outline-variant/35 text-on-surface' 
            : 'max-w-[80%] bg-surface-container-high/40 rounded-2xl rounded-tl-none px-4 py-3 border border-primary/20 text-on-surface-variant leading-relaxed';
        
        // Render markdown lines
        inner.innerHTML = formatChatMarkdown(msg.text);
        
        bubble.appendChild(inner);
        container.appendChild(bubble);
    });
    
    // Auto scroll to bottom
    container.scrollTop = container.scrollHeight;
}

// Simple Markdown renderer helper
function formatChatMarkdown(text) {
    let html = text;
    // Headers
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-bold">$1</strong>');
    // Bullet points
    html = html.replace(/\* (.*?)\n/g, '<li class="ml-4 list-disc py-0.5">$1</li>');
    // Newlines
    html = html.replace(/\n/g, '<br>');
    return html;
}
