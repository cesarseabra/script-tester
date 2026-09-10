/**
 * External Test Script: API JSON Payload Formatting
 */
console.info("⚡ Executing external script: sample-api.js");

const apiRoutes = [
    { method: "GET", path: "/api/v1/health", status: 200, responseMs: 5 },
    { method: "POST", path: "/api/v1/auth/login", status: 200, responseMs: 84 },
    { method: "GET", path: "/api/v1/users/me", status: 401, responseMs: 12 },
    { method: "PUT", path: "/api/v1/settings", status: 204, responseMs: 45 }
];

console.table(apiRoutes);
console.info("API inspection complete.");
