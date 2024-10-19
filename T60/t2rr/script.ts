const postItContainer = document.getElementById(
  "post-it-container"
) as HTMLDivElement;
const createButton = document.getElementById(
  "create-button"
) as HTMLButtonElement;

let timeoutId: number | null = null;

function createPostIt() {
  const color = (document.getElementById("color") as HTMLInputElement).value;
  const category = (
    document.getElementById("category") as HTMLInputElement
  ).value.trim();
  const content = (document.getElementById("content") as HTMLTextAreaElement)
    .value;

  if (category === "") {
    alert("Category cannot be empty");
    return;
  }

  const postIt = document.createElement("div");
  postIt.classList.add("post-it");
  postIt.style.backgroundColor = color;

  const closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.textContent = "X";
  closeButton.addEventListener("click", () => {
    postIt.remove();
  });
  postIt.appendChild(closeButton);

  const postItCategory = document.createElement("textarea");
  postItCategory.classList.add("post-it-category");
  postItCategory.textContent = category;
  postItCategory.contentEditable = "true";
  postItCategory.setAttribute("maxlength", "10");
  postIt.appendChild(postItCategory);

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
  const postIts = Array.prototype.slice.call(
    postItContainer.children
  ) as HTMLDivElement[];
  postIts.sort((a, b) => {
    const categoryA = (
      a.querySelector(".post-it-category") as HTMLTextAreaElement
    ).value;
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
  const target = e.target as HTMLElement;
  if (target.classList.contains("post-it-category")) {
    debounceSortPostIts();
  }
});

createButton.addEventListener("click", createPostIt);
