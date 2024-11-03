/**
 * The current username.
 * @type {string}
 */
var user = "username";

/**
 * The previous username.
 * @type {string}
 */
let lastUser = "";

/**
 * The URL of the WebSocket connection.
 * @type {string}
 */
let url = `ws://project-nginx.info.polymtl.ca/chatservice?username=${user}`;

/**
 * The WebSocket object.
 * @type {WebSocket}
 */
let ws = new WebSocket(url);

/**
 * Event listener for the logo element. Reloads the page when clicked.
 */
document.getElementsByClassName("logo")[0].addEventListener("click", (e) => {
  location.reload();
});

/**
 * Event listener for the fa-bell element. Resets the message counter when clicked.
 */
document.getElementsByClassName("fa-bell")[0].addEventListener("click", (e) => {
  resetMessage();
});

/**
 * Event listener for the fa-globe element. Translates the page when clicked.
 */
document
  .getElementsByClassName("fa-globe")[0]
  .addEventListener("click", (e) => {
    translate();
  });

/**
 * The counter for new messages.
 * @type {number}
 */
var cptr = 0;

/**
 * The ID of the active channel.
 * @type {string}
 */
let activeChannel = "dbf646dc-5006-4d9f-8815-fd37514818ee";

/**
 * A flag to alternate the color of group elements.
 * @type {boolean}
 */
let groupColor = false;

/**
 * Loads the initial content of the page.
 */
function load() {
  // TO DO: implement the load function
}

/**
 * Modifies the username.
 */
function modifyName() {
  /**
   * The new username entered by the user.
   * @type {string}
   */
  let name = prompt("Enter a username:", user);

  if (name != null) {
    if (name == "") {
      alert("Invalid username!");
    } else {
      lastUser = user;
      user = name;
      ws.close();
      resetContent(document.getElementsByClassName("chatbox")[0]);
      url = `ws://log2420-nginx.info.polymtl.ca/chatservice?username=${user}`;
      ws = new WebSocket(url);
      load();
    }
  }
}

/**
 * Activates a channel.
 * @param {object} channel - The channel to activate.
 */
function activate(channel) {
  /**
   * The ID of the previous channel.
   * @type {string}
   */
  let channelTemp = activeChannel;

  if (channel.joinStatus) {
    activeChannel = channel.id;
    document.getElementsByClassName("current-group-name")[0].innerText =
      channel.name;

    if (channelTemp != channel.id) {
      /**
       * The chatbox element.
       * @type {HTMLElement}
       */
      var box = document.getElementsByClassName("chatbox")[0];
      resetContent(box);
      requestMessageHistory();
    }
  }
}

/**
 * Activates the general channel.
 */
function activateGeneral() {
  activeChannel = "dbf646dc-5006-4d9f-8815-fd37514818ee";
  document.getElementsByClassName("current-group-name")[0].innerText =
    "General";

  /**
   * The chatbox element.
   * @type {HTMLElement}
   */
  var box = document.getElementsByClassName("chatbox")[0];
  resetContent(box);
  requestMessageHistory();
}

/**
 * Writes a group element to the page.
 * @param {object} channel - The channel to write.
 * @param {HTMLElement} parent - The parent element of the group element.
 */
function writeGroup(channel, parent) {
  /**
   * The group element.
   * @type {HTMLElement}
   */
  let group = document.createElement("div");

  /**
   * The clickable space element.
   * @type {HTMLElement}
   */
  let clickableSpace = document.createElement("div");

  if (groupColor) {
    groupColor = false;
    group.style.backgroundColor = "rgb(235,235,235)";
  } else {
    groupColor = true;
    group.style.backgroundColor = "rgb(192,192,192)";
  }

  clickableSpace.classList.add("caseClickable");
  clickableSpace.addEventListener("click", (e) => {
    activate(channel);
  });

  /**
   * The sign element.
   * @type {HTMLElement}
   */
  let sign = document.createElement("i");

  /**
   * The content element.
   * @type {Text}
   */
  let content = document.createTextNode(channel.name);

  group.classList.add("group-choice");
  sign.classList.add("fas");

  if (channel.id == "dbf646dc-5006-4d9f-8815-fd37514818ee") {
    sign.classList.add("fa-star");
  } else if (channel.joinStatus) {
    sign.classList.add("fa-minus");
  } else {
    sign.classList.add("fa-plus");
    sign.classList.add("fa-plus-groupes");
  }

  sign.addEventListener("click", (e) => {
    changeState(channel);
  });

  group.appendChild(sign);
  clickableSpace.appendChild(content);
  group.appendChild(clickableSpace);
  parent.appendChild(group);
}

/**
 * The input element.
 * @type {HTMLElement}
 */
let input = document.getElementsByClassName("textbox")[0];

input.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    sendMessage();
  }
});

/**
 * Formats a date object to a string.
 * @param {Date} dateText - The date object to format.
 * @returns {string} The formatted date string.
 */
function formatDate(dateText) {
  /**
   * An array of day names.
   * @type {string[]}
   */
  var day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  /**
   * A string to pad the minute value.
   * @type {string}
   */
  var zeroMinute = "";

  /**
   * A string to pad the hour value.
   * @type {string}
   */
  var zeroHour = "";

  if (dateText.getHours() < 10) zeroHour = "0";
  if (dateText.getMinutes() < 10) zeroMinute = "0";

  return (
    day[dateText.getDay()] +
    " " +
    dateText.getDate() +
    ", " +
    zeroHour +
    dateText.getHours() +
    ":" +
    zeroMinute +
    dateText.getMinutes()
  );
}

/**
 * Scrolls the chatbox to the bottom.
 */
function scrollToBottom() {
  /**
   * The chatbox element.
   * @type {HTMLElement}
   */
  var scroll = document.getElementsByClassName("chatbox")[0];
  scroll.scrollTop = scroll.scrollHeight;
}

/**
 * Increments the new message counter.
 */
function newMessage() {
  cptr++;
  updateNbNewMessage();
}

/**
 * Updates the new message counter element.
 */
function updateNbNewMessage() {
  /**
   * The bubble element.
   * @type {HTMLElement}
   */
  var obj = document.getElementsByClassName("bubble")[0];
  obj.style.visibility = "visible";
  obj.innerText = cptr;
}

/**
 * Resets the new message counter.
 */
function resetMessage() {
  cptr = 0;
  document.getElementsByClassName("bubble")[0].style.visibility = "hidden";
}

/**
 * Prints an error message to the chatbox.
 */
function printMessageError() {
  /**
   * An error message object.
   * @type {Message}
   */
  var msg = new Message(
    "onError",
    activeChannel,
    "Verify connection.",
    "Admin",
    new Date(Date.now())
  );
  receiveMessage(msg);
  document.getElementsByClassName("textbox")[0].value = "";
}

/**
 * Prints a close message to the chatbox.
 */
function printMessageClose() {
  /**
   * A close message object.
   * @type {Message}
   */
  var msg = new Message(
    "onClose",
    activeChannel,
    "Websocket connection closed.",
    "Admin",
    new Date(Date.now())
  );
  receiveMessage(msg);
  document.getElementsByClassName("textbox")[0].value = "";
}

/**
 * Resets the content of an element.
 * @param {HTMLElement} element - The element to reset.
 */
function resetContent(element) {
  element.innerText = "";
}

/**
 * Translates the page.
 */
function translate() {
  /**
   * The current language.
   * @type {string}
   */
  var language = document.getElementsByClassName("lbl-language")[0].innerText;

  if (language != "french") {
    document.getElementsByClassName("lbl-language")[0].innerText = "french";
    document.getElementsByClassName("titre-groupe-courant")[0].innerText =
      "Active group :";
    document.getElementsByClassName("titre-groupe-courant")[1].innerText =
      "List of groups :";
    document.getElementsByClassName("bouton-envoyer")[0].innerText = "Send";
    document.getElementsByClassName("nom-groupe-courant")[1].innerText =
      "Available groups";
    document.getElementsByClassName("boite-texte")[0].placeholder =
      "Enter your message here";
  } else {
    document.getElementsByClassName("lbl-language")[0].innerText = "english";
    document.getElementsByClassName("titre-groupe-courant")[0].innerText =
      "Groupe actif :";
    document.getElementsByClassName("titre-groupe-courant")[1].innerText =
      "Liste des groupes :";
    document.getElementsByClassName("bouton-envoyer")[0].innerText = "Envoyer";
    document.getElementsByClassName("nom-groupe-courant")[1].innerText =
      "Groupes disponibles";
    document.getElementsByClassName("boite-texte")[0].placeholder =
      "Entrez votre message ici";
  }
}

/**
 * Adds a message to the chatbox.
 * @param {HTMLElement} box - The chatbox element.
 * @param {HTMLElement} content - The content element of the message.
 * @param {HTMLElement} date - The date element of the message.
 * @param {Message} msg - The message object.
 */
function addMessageHTML(box, content, date, msg) {
  if (msg.sender != user && msg.sender != lastUser) {
    /**
     * The name element of the message.
     * @type {HTMLElement}
     */
    let name = document.createElement("div");
    name.innerText = msg.sender;
    name.classList.add("name");
    box.classList.add("left-message-content");
    content.classList.add("left-message");
    date.classList.add("left-hour");

    if (msg.sender == "Admin") content.style.backgroundColor = "#3CB371";
    if (msg.eventType == "onError" || msg.eventType == "onClose")
      content.style.backgroundColor = "#DC143C";
    box.appendChild(name);
    newMessage();
  } else {
    box.classList.add("right-message-content");
    content.classList.add("right-message");
    date.classList.add("right-hour");
  }
}
