// worker.js
self.onmessage = function (e) {
    try {
        const result = eval(e.data);
        postMessage({ result: result });
    } catch (error) {
        postMessage({ error: "Invalid expression" });
    }
};
