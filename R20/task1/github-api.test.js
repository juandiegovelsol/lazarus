// github-api.test.js
const axios = require('axios');
const fetchGithubRepositoryCounts = require('./github-api');

jest.mock('axios');

describe('fetchGithubRepositoryCounts', () => {
    it('should fetch and log repository counts for multiple users', async () => {
        // Mock the axios.get calls to return sample data
        axios.get.mockImplementation((url) => {
            if (url === 'https://api.github.com/users/octocat') {
                return Promise.resolve({ status: 200, data: { public_repos: 10 } });
            } else if (url === 'https://api.github.com/users/torvalds') {
                return Promise.resolve({ status: 200, data: { public_repos: 20 } });
            } else {
                return Promise.reject(new Error('API request failed'));
            }
        });

        // Call the function with sample usernames
        const usernames = ['octocat', 'torvalds', 'invalidUser'];
        await fetchGithubRepositoryCounts(usernames);

        // Verify that the axios.get calls were made correctly
        expect(axios.get).toHaveBeenCalledTimes(3);
        expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/octocat');
        expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/torvalds');
        expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/invalidUser');
    });

    it('should handle errors when fetching data for a user', async () => {
        // Mock the axios.get calls to return an error
        axios.get.mockImplementation(() => {
            return Promise.reject(new Error('API request failed'));
        });

        // Call the function with a sample username
        const usernames = ['octocat'];
        await fetchGithubRepositoryCounts(usernames);

        // Verify that the error was logged correctly
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith('Error fetching data for octocat: API request failed');
    });

    it('should handle unexpected errors', async () => {
        // Mock the axios.get calls to throw an error
        axios.get.mockImplementation(() => {
            throw new Error('Unexpected error');
        });

        // Call the function with a sample username
        const usernames = ['octocat'];
        await fetchGithubRepositoryCounts(usernames);

        // Verify that the error was logged correctly
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith('Unexpected error occurred: Unexpected error');
    });
});