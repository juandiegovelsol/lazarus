const axios = require('axios');

/**
 * Fetches and displays public repository counts for GitHub users.
 *
 * @param {string[]} usernames - An array of GitHub usernames.
 * @returns {Promise<void>}
 */
async function fetchAndDisplayPublicRepositories(usernames) {
    try {
        // Create an array of promises to fetch data for each user
        const promises = usernames.map((username) => {
            return axios.get(`https://api.github.com/users/${username}`)
                .then((response) => {
                    // Check if the response is OK
                    if (response.status !== 200) {
                        throw new Error(`API request failed for ${username}`);
                    }
                    return response.data;
                })
                .then((userData) => {
                    // Extract the public repository count from the user data
                    return { username, publicRepositoryCount: userData.public_repos };
                })
                .catch((error) => {
                    // Log any errors that occur while fetching data for a user
                    console.error(`Error fetching data for ${username}: ${error.message}`);
                    // Return a default value to avoid errors in the Promise.all call
                    return { username, publicRepositoryCount: null };
                });
        });

        // Wait for all promises to resolve
        const results = await Promise.all(promises);

        // Display the public repository count for each user
        results.forEach((result) => {
            const { username, publicRepositoryCount } = result;
            if (publicRepositoryCount !== null) {
                console.log(`${username}: ${publicRepositoryCount} public repositories`);
            }
        });
    } catch (error) {
        // Log any unexpected errors that occur
        console.error("Unexpected error occurred: ", error.message);
    }
}

// Example usage
const usernames = [
    'octocat',
    'torvalds',
    'mojombo',
    'invalidUser'
];

fetchAndDisplayPublicRepositories(usernames);