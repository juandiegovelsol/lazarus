// Post-it container element where all post-its are appended
const postItContainer = document.getElementById(
  "post-it-container"
) as HTMLDivElement;

// Create button element that triggers the creation of a new post-it
const createButton = document.getElementById(
  "create-button"
) as HTMLButtonElement;

let timeoutId: number | null = null;

function createPostIt() {
  // Color input element for selecting the post-it color
  const color = (document.getElementById("color") as HTMLInputElement).value;
  // Category input element for entering the post-it category
  const category = (
    document.getElementById("category") as HTMLInputElement
  ).value.trim();
  // Content textarea element for entering the post-it content
  const content = (document.getElementById("content") as HTMLTextAreaElement)
    .value;

  if (category === "") {
    alert("Category cannot be empty");
    return;
  }

  // HTML element for the new postIt
  const postIt = document.createElement("div");
  postIt.classList.add("post-it");
  postIt.style.backgroundColor = color;

  // HTML element for the Postit close button
  const closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.textContent = "X";
  closeButton.addEventListener("click", () => {
    postIt.remove();
  });
  postIt.appendChild(closeButton);

  // HTML element for the Postit's editable category
  const postItCategory = document.createElement("textarea");
  postItCategory.classList.add("post-it-category");
  postItCategory.textContent = category;
  postItCategory.contentEditable = "true";
  postItCategory.setAttribute("maxlength", "10");
  postIt.appendChild(postItCategory);

  // HTML element for the Postit's editable content
  const postItContent = document.createElement("div");
  postItContent.classList.add("post-it-content");
  postItContent.textContent = content;
  postItContent.contentEditable = "true";
  postIt.appendChild(postItContent);

  postItContainer.appendChild(postIt);
  sortPostIts();

  (document.getElementById("category") as HTMLInputElement).value = "";
  (document.getElementById("content") as HTMLTextAreaElement).value = "";
}

function sortPostIts() {
  // Get all post-it elements as an array
  const postIts = Array.prototype.slice.call(
    postItContainer.children
  ) as HTMLDivElement[];
  postIts.sort((a, b) => {
    // Get category text of post-it A
    const categoryA = (
      a.querySelector(".post-it-category") as HTMLTextAreaElement
    ).value;
    // Get category text of post-it B
    const categoryB = (
      b.querySelector(".post-it-category") as HTMLTextAreaElement
    ).value;
    return categoryA.localeCompare(categoryB);
  });
  postItContainer.innerHTML = "";
  postIts.forEach((postIt) => postItContainer.appendChild(postIt));
}

function debounceSortPostIts() {
  if (timeoutId !== null) {
    globalThis.clearTimeout(timeoutId);
  }
  timeoutId = globalThis.setTimeout(sortPostIts, 500);
}

postItContainer.addEventListener("input", (e) => {
  // The element that triggered the input event.
  const target = e.target as HTMLElement;
  if (target.classList.contains("post-it-category")) {
    debounceSortPostIts();
  }
});

createButton.addEventListener("click", createPostIt);
