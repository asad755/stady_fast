function fetchDataWithCallback(url: string, callback: (error: Error | null, data?: any) => void) {
    setTimeout(() => {
        // Simulating an asynchronous operation
        if (url === "https://api.example.com/data") {
            callback(null, { data: "Example data from callback" });
        } else {
            callback(new Error("URL not found"));
        }
    }, 1000);
}

// Usage
fetchDataWithCallback("https://api.example.com/data", (error, data) => {
    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("Data:", data);
    }
});
