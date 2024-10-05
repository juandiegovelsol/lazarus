const axios = require('axios');
const fetchAndDisplayPublicRepositories = require('./fetchAndDisplayPublicRepositories');

jest.mock('axios');

describe('fetchAndDisplayPublicRepositories', () => {
    it('should fetch and display public repository counts for valid users', async () => {
        // Mock the axios.get calls to return valid user data
        axios.get.mockImplementation((url) => {
            if (url === 'https://api.github.com/users/octocat') {
                return Promise.resolve({ status: 200, data: { public_repos: 10 } });
            } else if (url === 'https://api.github.com/users/torvalds') {
                return Promise.resolve({ status: 200, data: { public_repos: 20 } });
            } else {
                return Promise.reject(new Error('API request failed'));
            }
        });

        // Call the function with valid usernames
        const usernames = ['octocat', 'torvalds'];
        await fetchAndDisplayPublicRepositories(usernames);

        // Verify that the console.log statements were called with the correct data
        expect(console.log).toHaveBeenCalledTimes(2);
        expect(console.log).toHaveBeenCalledWith('octocat: 10 public repositories');
        expect(console.log).toHaveBeenCalledWith('torvalds: 20 public repositories');
    });

    it('should handle errors when fetching data for a user', async () => {
        // Mock the axios.get calls to return an error for one of the users
        axios.get.mockImplementation((url) => {
            if (url === 'https://api.github.com/users/octocat') {
                return Promise.resolve({ status: 200, data: { public_repos: 10 } });
            } else {
                return Promise.reject(new Error('API request failed'));
            }
        });

        // Call the function with a mix of valid and invalid usernames
        const usernames = ['octocat', 'invalidUser'];
        await fetchAndDisplayPublicRepositories(usernames);

        // Verify that the console.error statement was called with the correct error message
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith('Error fetching data for invalidUser: API request failed');
    });

    it('should handle unexpected errors', async () => {
        // Mock the axios.get calls to throw an unexpected error
        axios.get.mockImplementation(() => {
            throw new Error('Unexpected error');
        });

        // Call the function with a valid username
        const usernames = ['octocat'];
        await fetchAndDisplayPublicRepositories(usernames);

        // Verify that the console.error statement was called with the correct error message
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith('Unexpected error occurred: Unexpected error');
    });
});