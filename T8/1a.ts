/* // Define the type for a single PullRequest, not an array
type PullRequest = {
  id: number;
  title: string;
  description: string;
  author: string;
  status: "open" | "closed" | "merged";
  annotations: string[];
};

class PullRequestManager {
  private pullRequests: PullRequest[];

  constructor() {
    this.pullRequests = [];
  }

  addPullRequest(pr: PullRequest): void {
    this.pullRequests.push(pr);
    console.log(`Pull request "${pr.title}" added successfully.`);
  }

  getOpenPullRequests(): PullRequest[] {
    return this.pullRequests.filter((pr) => pr.status === "open");
  }

  closePullRequest(id: number): void {
    const pullRequest = this.pullRequests.find((pr) => pr.id === id);
    // Check if pullRequest is not null or undefined before accessing its properties
    if (pullRequest && pullRequest.status === "open") {
      pullRequest.status = "closed";
      console.log(`Pull request "${pullRequest.title}" has been closed.`);
    } else {
      console.log(`Pull request with ID ${id} not found or already closed.`);
    }
  }

  addAnnotation(id: number, annotation: string): void {
    const pullRequest = this.pullRequests.find((pr) => pr.id === id);
    if (pullRequest) {
      pullRequest.annotations.push(annotation);
      console.log(`Annotation added to pull request "${pullRequest.title}".`);
    } else {
      console.log(`Pull request with ID ${id} not found.`);
    }
  }

  getPullRequestById(id: number): PullRequest | undefined {
    // Return type should include undefined, as find() might not find a match
    return this.pullRequests.find((pr) => pr.id === id);
  }

  removePullRequest(id: number): void {
    this.pullRequests = this.pullRequests.filter((pr) => pr.id !== id);
    console.log(`Pull request with ID ${id} has been removed.`);
  }
}

const prManager = new PullRequestManager();

prManager.addPullRequest({
  id: 1,
  title: "Feature X Implementation",
  description: "This pull request adds the implementation for Feature X.",
  author: "John Doe",
  status: "open", // Initialize status as "open"
  annotations: [],
});

prManager.addAnnotation(1, "Needs review before merging.");

prManager.closePullRequest(1);

console.log(prManager.getOpenPullRequests()); */
