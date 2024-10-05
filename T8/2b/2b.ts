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
    this.validatePullRequest(pr);
    if (this.pullRequests.find((existingPr) => existingPr.id === pr.id)) {
      throw new Error(`Pull request with ID ${pr.id} already exists.`);
    }
    this.pullRequests.push(pr);
    console.log(`Pull request "${pr.title}" added successfully.`);
  }

  getOpenPullRequests(): PullRequest[] {
    return this.pullRequests.filter((pr) => pr.status === "open");
  }

  closePullRequest(id: number): void {
    if (typeof id !== "number") {
      throw new Error("ID must be a number.");
    }
    const pullRequest = this.pullRequests.find((pr) => pr.id === id);
    if (!pullRequest) {
      throw new Error(`Pull request with ID ${id} not found.`);
    }
    if (pullRequest.status !== "open") {
      throw new Error(`Pull request with ID ${id} is not open.`);
    }
    pullRequest.status = "closed";
    console.log(`Pull request "${pullRequest.title}" has been closed.`);
  }

  addAnnotation(id: number, annotation: string): void {
    if (typeof id !== "number") {
      throw new Error("ID must be a number.");
    }
    if (typeof annotation !== "string") {
      throw new Error("Annotation must be a string.");
    }
    const pullRequest = this.pullRequests.find((pr) => pr.id === id);
    if (!pullRequest) {
      throw new Error(`Pull request with ID ${id} not found.`);
    }
    pullRequest.annotations.push(annotation);
    console.log(`Annotation added to pull request "${pullRequest.title}".`);
  }

  getPullRequestById(id: number): PullRequest | undefined {
    if (typeof id !== "number") {
      throw new Error("ID must be a number.");
    }
    return this.pullRequests.find((pr) => pr.id === id);
  }

  removePullRequest(id: number): void {
    if (typeof id !== "number") {
      throw new Error("ID must be a number.");
    }
    const pullRequest = this.pullRequests.find((pr) => pr.id === id);
    if (!pullRequest) {
      throw new Error(`Pull request with ID ${id} not found.`);
    }
    this.pullRequests = this.pullRequests.filter((pr) => pr.id !== id);
    console.log(`Pull request with ID ${id} has been removed.`);
  }

  private validatePullRequest(pr: PullRequest): void {
    if (typeof pr.id !== "number") {
      throw new Error("ID must be a number.");
    }
    if (typeof pr.title !== "string") {
      throw new Error("Title must be a string.");
    }
    if (typeof pr.description !== "string") {
      throw new Error("Description must be a string.");
    }
    if (typeof pr.author !== "string") {
      throw new Error("Author must be a string.");
    }
    if (!["open", "closed", "merged"].includes(pr.status)) {
      throw new Error("Invalid status.");
    }
    if (
      !Array.isArray(pr.annotations) ||
      pr.annotations.some((annotation) => typeof annotation !== "string")
    ) {
      throw new Error("Annotations must be an array of strings.");
    }
  }
}

const prManager = new PullRequestManager();

try {
  prManager.addPullRequest({
    id: 1,
    title: "Feature X Implementation",
    description: "This pull request adds the implementation for Feature X.",
    author: "John Doe",
    status: "open",
    annotations: [],
  });

  prManager.addAnnotation(1, "Needs review before merging.");

  prManager.closePullRequest(1);

  console.log(prManager.getOpenPullRequests());
} catch (error) {
  console.error(error.message);
}
