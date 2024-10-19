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
  const postIts = Array.from(postItContainer.children) as HTMLDivElement[];
  postIts.sort((a, b) => {
    const categoryA = a.querySelector(".post-it-category")!.textContent!;
    const categoryB = b.querySelector(".post-it-category")!.textContent!;
    return categoryA.localeCompare(categoryB);
  });
  postItContainer.innerHTML = "";
  postIts.forEach((postIt) => postItContainer.appendChild(postIt));
}

postItContainer.addEventListener("input", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("post-it-category")) {
    sortPostIts();
  }
});

createButton.addEventListener("click", createPostIt);
