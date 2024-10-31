function getData() {
  return new Promise((resolve, reject) => {
    const sampleData = [
      { id: 1, name: "Item One", description: "Description for Item One" },
      { id: 2, name: "Item Two", description: "Description for Item Two" },
    ];

    // Simulate a delay for data retrieval (1 second)
    setTimeout(() => {
      // Simulate a success response
      if (sampleData.length > 0) {
        resolve(sampleData);
      } else {
        reject(new Error("getData() failed: No data available"));
      }
    }, 1000); // Added delay of 1 second
  });
}

// Usage example
getData()
  .then((data) => {
    console.log("Retrieved data:", data);
  })
  .catch((error) => {
    console.error("Error retrieving data:", error.message);
  })
  .finally(() => {
    console.log("getData() completed");
  });
