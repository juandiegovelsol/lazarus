var postItContainer = document.getElementById("post-it-container");
var createButton = document.getElementById("create-button");
function createPostIt() {
    var color = document.getElementById("color").value;
    var category = document.getElementById("category").value.trim();
    var content = document.getElementById("content")
        .value;
    if (category === "") {
        alert("Category cannot be empty");
        return;
    }
    var postIt = document.createElement("div");
    postIt.classList.add("post-it");
    postIt.style.backgroundColor = color;
    var postItCategory = document.createElement("div");
    postItCategory.classList.add("post-it-category");
    postItCategory.textContent = category;
    postItCategory.contentEditable = "true";
    postItCategory.dataset.originalCategory = category; // store the original category
    postIt.appendChild(postItCategory);
    var postItContent = document.createElement("div");
    postItContent.classList.add("post-it-content");
    postItContent.textContent = content;
    postItContent.contentEditable = "true";
    postIt.appendChild(postItContent);
    postItContainer.appendChild(postIt);
    sortPostIts();
    document.getElementById("category").value = "";
    document.getElementById("content").value = "";
}
function sortPostIts() {
    var postIts = Array.prototype.slice.call(postItContainer.children);
    postIts.sort(function (a, b) {
        var categoryA = a.querySelector(".post-it-category").dataset.originalCategory;
        var categoryB = b.querySelector(".post-it-category").dataset.originalCategory;
        return categoryA.localeCompare(categoryB);
    });
    postItContainer.innerHTML = "";
    postIts.forEach(function (postIt) { return postItContainer.appendChild(postIt); });
}
postItContainer.addEventListener("input", function (e) {
    var target = e.target;
    if (target.classList.contains("post-it-category")) {
        var originalCategory = target.dataset.originalCategory;
        var newCategory = target.textContent;
        if (newCategory && newCategory.trim() !== originalCategory) {
            target.dataset.originalCategory = newCategory.trim();
            sortPostIts();
        }
    }
});
createButton.addEventListener("click", createPostIt);
