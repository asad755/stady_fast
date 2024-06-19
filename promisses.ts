function fetchDataWithPromise(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulating an asynchronous operation
            if (url === "https://api.example.com/data") {
                resolve({ data: "Example data from promise" });
            } else {
                reject(new Error("URL not found"));
            }
        }, 1000);
    });
}

// Usage
fetchDataWithPromise("https://api.example.com/data")
    .then(data => {
        console.log("Data:", data);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });
