/**
 * External Test Script: High Performance Loop Benchmark
 */
console.info("⚡ Executing external script: sample-benchmark.js");

function runHeavyMathBenchmark() {
    const iterations = 1000000;
    console.log(`Performing ${iterations.toLocaleString()} math operations (Math.sqrt + Math.sin)...`);

    const start = performance.now();
    let sum = 0;
    for (let i = 0; i < iterations; i++) {
        sum += Math.sqrt(i) * Math.sin(i);
    }
    const end = performance.now();

    console.log(`Execution finish. Result sum: ${sum.toFixed(4)}`);
    console.warn(`Time taken: ${(end - start).toFixed(2)} ms`);
}

runHeavyMathBenchmark();
