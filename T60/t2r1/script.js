var postItContainer = document.getElementById("post-it-container");
var createButton = document.getElementById("create-button");
var timeoutId = null;
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
    var closeButton = document.createElement("span");
    closeButton.classList.add("close-button");
    closeButton.textContent = "X";
    closeButton.addEventListener("click", function () {
        postIt.remove();
    });
    postIt.appendChild(closeButton);
    var postItCategory = document.createElement("div");
    postItCategory.classList.add("post-it-category");
    postItCategory.textContent = category;
    postItCategory.contentEditable = "true";
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
    var postIts = Array.from(postItContainer.children);
    postIts.sort(function (a, b) {
        var categoryA = a.querySelector(".post-it-category").textContent;
        var categoryB = b.querySelector(".post-it-category").textContent;
        return categoryA.localeCompare(categoryB);
    });
    postItContainer.innerHTML = "";
    postIts.forEach(function (postIt) { return postItContainer.appendChild(postIt); });
}
function debounceSortPostIts() {
    if (timeoutId !== null) {
        globalThis.clearTimeout(timeoutId);
    }
    timeoutId = globalThis.setTimeout(sortPostIts, 500);
}
postItContainer.addEventListener("input", function (e) {
    var target = e.target;
    if (target.classList.contains("post-it-category")) {
        debounceSortPostIts();
    }
});
createButton.addEventListener("click", createPostIt);
