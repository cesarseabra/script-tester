/**
 * External Test Script: DOM Mutation & Animation Test
 */
console.info("⚡ Executing external script: sample-dom.js");

const stage = document.getElementById("sandboxStageContent");
const stageContainer = document.getElementById("sandboxStage");

if (stageContainer && stage) {
    stageContainer.classList.add("active");
    stage.innerHTML = `
        <div style="padding: 15px; background: #0f172a; color: #f8fafc; border-radius: 8px; font-family: sans-serif;">
            <h4 style="color: #38bdf8; margin-bottom: 8px;">🎨 External DOM Test Card</h4>
            <p style="font-size: 0.9rem; color: #94a3b8;">This element was injected by loading <code>./scripts/sample-dom.js</code>.</p>
            <div id="counterVal" style="font-size: 1.5rem; font-weight: bold; margin: 10px 0; color: #4ade80;">0</div>
        </div>
    `;

    let count = 0;
    const interval = setInterval(() => {
        count++;
        const el = document.getElementById("counterVal");
        if (el) {
            el.textContent = `Counter: ${count}`;
            console.log(`DOM Counter updated to: ${count}`);
        }
        if (count >= 5) {
            clearInterval(interval);
            console.info("DOM Counter test completed.");
        }
    }, 800);
}
