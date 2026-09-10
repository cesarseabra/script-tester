# Script Playground & Tester 🚀

A modern, fast, browser-based JavaScript code testing environment hosted directly on **GitHub Pages**.

🔗 **Live Website**: [https://cesarseabra.github.io/script-tester/](https://cesarseabra.github.io/script-tester/)  
📁 **GitHub Repository**: [https://github.com/cesarseabra/script-tester](https://github.com/cesarseabra/script-tester)

---

## ✨ Features

- ⚡ **Real-time JS Execution Engine**: Run JavaScript code snippets instantly in the browser.
- 💻 **Modern Dark Mode Interface**: Beautiful UI with syntax fonts (`Fira Code`, `Inter`), line numbers, and live statistics.
- 📋 **Intercepted Console Output**: Intercepts `console.log`, `console.info`, `console.warn`, `console.error`, and `console.table`.
- 🔍 **Console Filtering & Export**: Filter by entry type, copy logs to clipboard, or export logs to a `.txt` file.
- 📦 **Pre-built Snippets**: Includes ready-to-test code samples for Async/Fetch API, DOM manipulation, Performance benchmarking, and Table outputs.
- 🔗 **External Script Injector**: Dynamically load and execute external JavaScript files via URL or relative paths (e.g., `./scripts/sample-async.js`).
- 🤖 **Zero-Config GitHub Pages Deployment**: Automatically deploys to GitHub Pages via GitHub Actions on every push to `main`.

---

## 🛠️ Included Sample Scripts

The repository includes pre-packaged test scripts in the [`scripts/`](./scripts/) directory:

- [`scripts/sample-async.js`](./scripts/sample-async.js) - Step-by-step Async/Await timer & fetch task.
- [`scripts/sample-dom.js`](./scripts/sample-dom.js) - Programmatic DOM element creation & animation stage.
- [`scripts/sample-benchmark.js`](./scripts/sample-benchmark.js) - High-performance math calculation loop benchmark.
- [`scripts/sample-api.js`](./scripts/sample-api.js) - Structured JSON object & table logging.

---

## 🚀 How to Add & Test Your Own Scripts

1. Add your `.js` script files inside the `scripts/` directory.
2. Push to the `main` branch.
3. Open the live site at `https://cesarseabra.github.io/script-tester/`.
4. Enter `./scripts/your-script.js` in the **Load External Script** input field and click **Inject Script**.

---

## ⚙️ Local Development

To run locally without a server, simply open `index.html` in any web browser!

---

*Created with ❤️ by César Seabra.*
