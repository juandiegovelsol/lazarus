// github-api.js
const axios = require('axios');

/**
 * Fetches and displays public repository counts for GitHub users.
 * @param {string[]} usernames - An array of GitHub usernames.
 * @returns {Promise<void>}
 */
async function fetchGithubRepositoryCounts(usernames) {
    try {
        // Create an array of promises to fetch data for each user
        const promises = usernames.map((username) => {
            // Use axios to make a GET request to the GitHub API
            return axios.get(`https://api.github.com/users/${username}`)
                .then((response) => {
                    // Check if the response is OK
                    if (response.status !== 200) {
                        throw new Error(`API request failed for ${username}`);
                    }
                    // Return the public repository count for the user
                    return { username, publicRepositoryCount: response.data.public_repos };
                })
                .catch((error) => {
                    // Handle any errors that occur during the request
                    console.error(`Error fetching data for ${username}: ${error.message}`);
                    // Return a default value to avoid errors in the Promise.all call
                    return { username, publicRepositoryCount: null };
                });
        });

        // Wait for all promises to resolve
        const results = await Promise.all(promises);

        // Log the results for each user
        results.forEach((result) => {
            const { username, publicRepositoryCount } = result;
            if (publicRepositoryCount !== null) {
                console.log(`${username}: ${publicRepositoryCount} public repositories`);
            } else {
                console.log(`Failed to fetch data for ${username}`);
            }
        });
    } catch (error) {
        // Handle any unexpected errors
        console.error("Unexpected error occurred: ", error.message);
    }
}

module.exports = fetchGithubRepositoryCounts;