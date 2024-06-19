async function fetchDataWithAsyncAwait(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulating an asynchronous operation
            if (url === "https://api.example.com/data") {
                resolve({ data: "Example data from async/await" });
            }
            else {
                reject(new Error("URL not found"));
            }
        }, 1000);
    });
}
// Usage
async function main() {
    try {
        const data = await fetchDataWithAsyncAwait("https://api.example.com/data");
        console.log("Data:", data);
    }
    catch (error) {
        console.error("Error:", error.message);
    }
}
main();
export {};
