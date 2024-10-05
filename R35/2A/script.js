class Library {
  constructor() {
    this.books = [
      {
        title: "Classroom of the Elite",
        author: "Shougo Kinugasa",
        pages: "230",
        readStatus: true,
      },
      {
        title: "1984",
        author: "George Orwell",
        pages: "328",
        readStatus: false,
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        pages: "281",
        readStatus: true,
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        pages: "180",
        readStatus: false,
      },
      {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        pages: "277",
        readStatus: false,
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        pages: "279",
        readStatus: true,
      },
      {
        title: "Moby-Dick",
        author: "Herman Melville",
        pages: "635",
        readStatus: false,
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: "310",
        readStatus: true,
      },
      {
        title: "War and Peace",
        author: "Leo Tolstoy",
        pages: "1225",
        readStatus: false,
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        pages: "208",
        readStatus: true,
      },
    ];
  }
}

const library = new Library();

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
}

function createCard(newBook) {
  const card = document.createElement("div");
  const cardTitle = document.createElement("p");
  const cardAuthor = document.createElement("p");
  const cardPages = document.createElement("p");
  const cardReadBtn = document.createElement("button");
  const cardRemoveBtn = document.createElement("button");

  card.classList.add("card");
  cardTitle.classList.add("title");
  cardAuthor.classList.add("author");
  cardPages.classList.add("pages");
  cardReadBtn.classList.add("btn");
  cardReadBtn.setAttribute("data-read-btn", "");
  cardRemoveBtn.classList.add("btn");
  cardRemoveBtn.classList.add("remove");
  cardRemoveBtn.setAttribute("data-remove-btn", "");

  cardReadBtn.onclick = read;
  cardRemoveBtn.onclick = removeBook;

  cardTitle.textContent = `${newBook.title}`;
  cardAuthor.textContent = `${newBook.author}`;
  cardPages.textContent = `${newBook.pages} pages`;
  cardRemoveBtn.textContent = `Remove`;

  if (newBook.readStatus) {
    cardReadBtn.textContent = `Read`;
    cardReadBtn.classList.add("read");
  } else {
    cardReadBtn.textContent = `Not read`;
    cardReadBtn.classList.add("not-read");
  }

  card.appendChild(cardTitle);
  card.appendChild(cardAuthor);
  card.appendChild(cardPages);
  card.appendChild(cardReadBtn);
  card.appendChild(cardRemoveBtn);
  libraryGrid.appendChild(card);
}

function displayLibrary() {
  for (let book of library.books) {
    createCard(book);
  }
}

function addBookToLibrary() {
  if (title.value === "" || title.value === null) return;
  if (author.value === "" || author.value === null) return;
  if (pages.value === "" || pages.value === null || pages.value < 0) return;

  const newBook = getBookFromInput();
  library.books.push(newBook);
  createCard(newBook);
  closeModal();
}

function openModal() {
  clearForm();
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

const read = (e) => {
  if (e.target.classList.contains("read")) {
    e.target.classList.remove("read");
    e.target.classList.add("not-read");
    e.target.textContent = `Not read`;
    const itemIndex = e.target.parentElement.firstChild.textContent;
    const index = library.books.findIndex((book) => book.title === itemIndex);
    library.books[index].readStatus = false;
  } else if (e.target.classList.contains("not-read")) {
    e.target.classList.remove("not-read");
    e.target.classList.add("read");
    e.target.textContent = `Read`;
    const itemIndex = e.target.parentElement.firstChild.textContent;
    const index = library.books.findIndex((book) => book.title === itemIndex);
    library.books[index].readStatus = true;
  }
};

const removeBook = (e) => {
  const removeItem = e.target.parentElement.firstChild.textContent;
  library.books = library.books.filter((book) => book.title !== removeItem);
  e.target.parentElement.remove();
};

// Get the read/not read button in the modal
const readStatusBtn = document.getElementById("read-status-btn");

// Add event listener to the read/not read button in the modal
readStatusBtn.addEventListener("click", () => {
  if (readStatusBtn.classList.contains("read")) {
    readStatusBtn.classList.remove("read");
    readStatusBtn.textContent = "Not read";
    readStatus.checked = false;
  } else {
    readStatusBtn.classList.add("read");
    readStatusBtn.textContent = "Read";
    readStatus.checked = true;
  }
});

// Update the getBookFromInput function to handle the new read/not read button in the modal
function getBookFromInput() {
  const titleValue = title.value;
  const authorValue = author.value;
  const pagesValue = pages.value;
  const statusChecked = readStatusBtn.classList.contains("read");
  return new Book(titleValue, authorValue, pagesValue, statusChecked);
}

// Update the clearForm function to handle the new read/not read button in the modal
function clearForm() {
  title.value = "";
  author.value = "";
  pages.value = "";
  readStatusBtn.classList.remove("read");
  readStatusBtn.textContent = "Not read";
  readStatus.checked = false;
}

const openBtn = document.querySelector("[data-open-btn]");
const closeBtn = document.querySelector("[data-close-btn]");
const addBtn = document.querySelector("[data-add-btn]");
const clearBtn = document.querySelector("[data-clear-btn]");
const overlay = document.querySelector(".overlay");
const modal = document.getElementById("modal");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const readStatus = document.getElementById("status");
const libraryGrid = document.querySelector(".library-grid");

openBtn.addEventListener("click", () => {
  openModal();
});

closeBtn.addEventListener("click", () => {
  closeModal();
});

overlay.addEventListener("click", () => {
  closeModal();
});

addBtn.addEventListener("click", () => {
  addBookToLibrary();
});

clearBtn.addEventListener("click", () => {
  clearForm();
});

displayLibrary();
