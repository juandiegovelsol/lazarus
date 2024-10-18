onmessage = function(e) {
    const config = e.data;
    const jsonConfig = JSON.stringify(config, null, 2); // Format JSON with indentation
    postMessage(jsonConfig);
};