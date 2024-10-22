const postItContainer = document.getElementById(
  "post-it-container"
) as HTMLDivElement;
const createButton = document.getElementById(
  "create-button"
) as HTMLButtonElement;

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

  const postItCategory = document.createElement("div");
  postItCategory.classList.add("post-it-category");
  postItCategory.textContent = category;
  postItCategory.contentEditable = "true";
  postItCategory.dataset.originalCategory = category; // store the original category
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
    const categoryA =
      a.querySelector(".post-it-category")!.dataset.originalCategory!;
    const categoryB =
      b.querySelector(".post-it-category")!.dataset.originalCategory!;
    return categoryA.localeCompare(categoryB);
  });
  postItContainer.innerHTML = "";
  postIts.forEach((postIt) => postItContainer.appendChild(postIt));
}

postItContainer.addEventListener("input", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("post-it-category")) {
    const originalCategory = target.dataset.originalCategory;
    const newCategory = target.textContent;
    if (newCategory && newCategory.trim() !== originalCategory) {
      target.dataset.originalCategory = newCategory.trim();
      sortPostIts();
    }
  }
});

createButton.addEventListener("click", createPostIt);