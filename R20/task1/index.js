// index.js
const fetchGithubRepositoryCounts = require('./github-api');

const usernames = [
    'octocat',
    'torvalds',
    'mojombo',
    'invalidUser'
];

fetchGithubRepositoryCounts(usernames);