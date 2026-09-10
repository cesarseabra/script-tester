/**
 * Script Tester & Playground - Core JavaScript Application
 */

(function () {
    'use strict';

    // DOM Elements
    const codeEditor = document.getElementById('codeEditor');
    const lineNumbers = document.getElementById('lineNumbers');
    const lineCount = document.getElementById('lineCount');
    const charCount = document.getElementById('charCount');
    const runBtn = document.getElementById('runBtn');
    const clearCodeBtn = document.getElementById('clearCodeBtn');
    const snippetSelect = document.getElementById('snippetSelect');
    const externalScriptUrl = document.getElementById('externalScriptUrl');
    const loadScriptBtn = document.getElementById('loadScriptBtn');
    const consoleOutput = document.getElementById('consoleOutput');
    const logCounterBadge = document.getElementById('logCounterBadge');
    const statusText = document.getElementById('statusText');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const copyConsoleBtn = document.getElementById('copyConsoleBtn');
    const downloadConsoleBtn = document.getElementById('downloadConsoleBtn');
    const clearConsoleBtn = document.getElementById('clearConsoleBtn');
    const sandboxStage = document.getElementById('sandboxStage');
    const sandboxStageContent = document.getElementById('sandboxStageContent');
    const closeSandboxBtn = document.getElementById('closeSandboxBtn');

    // App State
    let logEntries = [];
    let activeFilter = 'all';

    // Sample Snippets
    const Snippets = {
        async: `// 1. Asynchronous Fetch API Request Test
console.info("Fetching data from public API...");

async function fetchUserData() {
    const startTime = performance.now();
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const user = await response.json();
        const duration = (performance.now() - startTime).toFixed(2);
        
        console.log(\`✅ User fetched in \${duration}ms:\`, user.name);
        console.info("User Details:", { name: user.name, email: user.email, company: user.company.name });
    } catch (err) {
        console.error("Fetch failed:", err.message);
    }
}

fetchUserData();`,

        dom: `// 2. Interactive DOM Sandbox Test
console.info("Creating dynamic DOM elements inside the Sandbox Stage...");

// Show sandbox container stage
const stage = document.getElementById("sandboxStageContent");
document.getElementById("sandboxStage").classList.add("active");

stage.innerHTML = \`
    <div style="text-align: center; padding: 10px;">
        <h3 style="color: #6366f1;">⚡ Dynamic Sandbox Banner</h3>
        <p>This element was programmatically generated at \${new Date().toLocaleTimeString()}</p>
        <button id="testClickBtn" style="margin-top: 10px; padding: 6px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Click Me!
        </button>
    </div>
\`;

document.getElementById("testClickBtn").addEventListener("click", () => {
    console.log("🎉 Dynamic Sandbox Button Clicked!");
});`,

        benchmark: `// 3. Performance & Execution Benchmark Test
console.info("Running Performance Benchmark test...");

function benchmarkArrayOperations() {
    const SIZE = 500000;
    console.log(\`Generating array of \${SIZE.toLocaleString()} elements...\`);

    const startGen = performance.now();
    const numbers = Array.from({ length: SIZE }, (_, i) => i + 1);
    const genTime = (performance.now() - startGen).toFixed(2);
    console.log(\`Array generation: \${genTime} ms\`);

    const startFilter = performance.now();
    const evens = numbers.filter(n => n % 2 === 0);
    const filterTime = (performance.now() - startFilter).toFixed(2);
    console.log(\`Filter evens (\${evens.length.toLocaleString()} items): \${filterTime} ms\`);

    const startReduce = performance.now();
    const sum = evens.reduce((acc, curr) => acc + curr, 0);
    const reduceTime = (performance.now() - startReduce).toFixed(2);
    console.warn(\`Total Sum calculated: \${sum.toLocaleString()} (took \${reduceTime} ms)\`);
}

benchmarkArrayOperations();`,

        api: `// 4. Console Table & Object Inspection Test
console.info("Testing Console Table & Structured Logging");

const servicesList = [
    { id: 1, name: "Auth Microservice", status: "Active", latencyMs: 14 },
    { id: 2, name: "Payment Gateway", status: "Active", latencyMs: 42 },
    { id: 3, name: "Notification Service", status: "Degraded", latencyMs: 230 }
];

console.table(servicesList);
console.warn("Notice: Notification service is experiencing latency above threshold!");`
    };

    // ==========================================================================
    // Editor Utilities
    // ==========================================================================
    function updateEditorStats() {
        const text = codeEditor.value;
        const lines = text.split('\n');
        lineCount.textContent = `${lines.length} ${lines.length === 1 ? 'line' : 'lines'}`;
        charCount.textContent = `${text.length} chars`;

        // Update Line Numbers display
        lineNumbers.innerHTML = lines.map((_, i) => i + 1).join('<br>');
    }

    codeEditor.addEventListener('input', updateEditorStats);
    codeEditor.addEventListener('scroll', () => {
        lineNumbers.scrollTop = codeEditor.scrollTop;
    });

    // Keyboard Shortcut (Ctrl+Enter / Cmd+Enter to Run)
    codeEditor.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            executeCode();
        }
    });

    // ==========================================================================
    // Custom Console Interceptor & Logging
    // ==========================================================================
    function getTimeStamp() {
        const d = new Date();
        return d.toTimeString().split(' ')[0] + '.' + String(d.getMilliseconds()).padStart(3, '0');
    }

    function appendLog(type, args) {
        // Remove welcome screen if first entry
        const welcome = consoleOutput.querySelector('.console-welcome');
        if (welcome) welcome.remove();

        const timestamp = getTimeStamp();
        const entry = { type, timestamp, args };
        logEntries.push(entry);

        renderLogEntry(entry);
        updateLogBadge();
    }

    function renderLogEntry(entry) {
        if (activeFilter !== 'all' && entry.type !== activeFilter) return;

        const row = document.createElement('div');
        row.className = `log-entry ${entry.type}`;

        const iconMap = {
            log: 'fa-regular fa-message',
            info: 'fa-solid fa-circle-info',
            warn: 'fa-solid fa-triangle-exclamation',
            error: 'fa-solid fa-circle-xmark',
            table: 'fa-solid fa-table'
        };

        const timeSpan = `<span class="log-timestamp">${entry.timestamp}</span>`;
        const iconSpan = `<i class="${iconMap[entry.type] || 'fa-solid fa-angle-right'} log-icon"></i>`;

        let contentHTML = '';

        if (entry.type === 'table' && Array.isArray(entry.args[0])) {
            const data = entry.args[0];
            if (data.length > 0) {
                const keys = Object.keys(data[0]);
                let tableHead = keys.map(k => `<th>${k}</th>`).join('');
                let tableRows = data.map(row => {
                    return `<tr>` + keys.map(k => `<td>${row[k]}</td>`).join('') + `</tr>`;
                }).join('');

                contentHTML = `<div class="log-content"><table class="log-table"><thead><tr>${tableHead}</tr></thead><tbody>${tableRows}</tbody></table></div>`;
            } else {
                contentHTML = `<div class="log-content">Empty Table</div>`;
            }
        } else {
            const formattedArgs = entry.args.map(arg => {
                if (typeof arg === 'object' && arg !== null) {
                    try {
                        return JSON.stringify(arg, null, 2);
                    } catch (e) {
                        return String(arg);
                    }
                }
                return String(arg);
            }).join(' ');

            contentHTML = `<div class="log-content"><pre style="margin:0; font-family:inherit;">${escapeHTML(formattedArgs)}</pre></div>`;
        }

        row.innerHTML = `${timeSpan} ${iconSpan} ${contentHTML}`;
        consoleOutput.appendChild(row);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    function escapeHTML(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function updateLogBadge() {
        logCounterBadge.textContent = logEntries.length;
    }

    function clearConsole() {
        logEntries = [];
        consoleOutput.innerHTML = `
            <div class="console-welcome">
                <i class="fa-solid fa-terminal welcome-icon"></i>
                <p>Console cleared. Click <strong>Run Code</strong> to execute.</p>
            </div>`;
        updateLogBadge();
    }

    // Intercept native browser console methods
    const originalConsole = {
        log: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error,
        table: console.table
    };

    console.log = function (...args) { originalConsole.log(...args); appendLog('log', args); };
    console.info = function (...args) { originalConsole.info(...args); appendLog('info', args); };
    console.warn = function (...args) { originalConsole.warn(...args); appendLog('warn', args); };
    console.error = function (...args) { originalConsole.error(...args); appendLog('error', args); };
    console.table = function (...args) { originalConsole.table(...args); appendLog('table', args); };

    window.addEventListener('error', (e) => {
        appendLog('error', [`Uncaught Error: ${e.message} at line ${e.lineno}`]);
    });

    // ==========================================================================
    // Code Execution Sandbox
    // ==========================================================================
    function executeCode() {
        const code = codeEditor.value.trim();
        if (!code) {
            console.warn("Editor is empty. Enter some JavaScript code first!");
            return;
        }

        statusText.textContent = "Executing...";
        runBtn.disabled = true;

        setTimeout(() => {
            const startTime = performance.now();
            try {
                // Execute code via Function constructor
                const runner = new Function(code);
                runner();
                const execTime = (performance.now() - startTime).toFixed(2);
                statusText.textContent = `Completed in ${execTime}ms`;
            } catch (err) {
                console.error(`Runtime Error: ${err.message}`, err.stack || '');
                statusText.textContent = "Execution Failed";
            } finally {
                runBtn.disabled = false;
                setTimeout(() => { statusText.textContent = "Ready"; }, 3000);
            }
        }, 50);
    }

    // Dynamic External Script Injection
    function loadExternalScript() {
        const url = externalScriptUrl.value.trim();
        if (!url) {
            console.warn("Please enter a valid Script URL!");
            return;
        }

        console.info(`Injecting script from: ${url}`);
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            console.log(`✅ External script loaded successfully: ${url}`);
        };
        script.onerror = () => {
            console.error(`❌ Failed to load script from URL: ${url}`);
        };
        document.body.appendChild(script);
    }

    // ==========================================================================
    // Event Listeners & Event Handlers
    // ==========================================================================
    runBtn.addEventListener('click', executeCode);

    clearCodeBtn.addEventListener('click', () => {
        codeEditor.value = '';
        updateEditorStats();
    });

    snippetSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (Snippets[val]) {
            codeEditor.value = Snippets[val];
            updateEditorStats();
            console.info(`Loaded sample snippet: "${val}"`);
        }
    });

    loadScriptBtn.addEventListener('click', loadExternalScript);

    // Console Filter Tabs
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');

            // Re-render filtered logs
            consoleOutput.innerHTML = '';
            logEntries.forEach(entry => renderLogEntry(entry));
        });
    });

    clearConsoleBtn.addEventListener('click', clearConsole);

    copyConsoleBtn.addEventListener('click', () => {
        const text = logEntries.map(e => `[${e.timestamp}] [${e.type.toUpperCase()}] ${e.args.join(' ')}`).join('\n');
        navigator.clipboard.writeText(text).then(() => {
            console.info("Console output copied to clipboard!");
        });
    });

    downloadConsoleBtn.addEventListener('click', () => {
        const text = logEntries.map(e => `[${e.timestamp}] [${e.type.toUpperCase()}] ${e.args.join(' ')}`).join('\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `script-console-logs-${Date.now()}.txt`;
        a.click();
    });

    closeSandboxBtn.addEventListener('click', () => {
        sandboxStage.classList.remove('active');
    });

    // Initialize Default View
    updateEditorStats();
    // Default load async snippet into editor
    codeEditor.value = Snippets.async;
    updateEditorStats();

})();
