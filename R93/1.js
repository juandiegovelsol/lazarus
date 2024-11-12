/**
 * The username of the user.
 * @type {string}
 */
var user = "username";

/**
 * The username of the last user.
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
element;
/**
 * Add event listeners to the logo, bell, and globe icons.
 */
document.getElementsByClassName("logo")[0].addEventListener("click", (e) => {
  /**
   * Reload the page when the logo is clicked.
   */
  location.reload();
});

document.getElementsByClassName("fa-bell")[0].addEventListener("click", (e) => {
  /**
   * Reset the message counter when the bell icon is clicked.
   */
  resetMessage();
});

document
  .getElementsByClassName("fa-globe")[0]
  .addEventListener("click", (e) => {
    /**
     * Translate the page when the globe icon is clicked.
     */
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
 * A flag to toggle the group color.
 * @type {boolean}
 */
let groupColor = false;

/**
 * Load the initial content.
 */
load();

/**
 * Modify the username.
 */
function modifyName() {
  /**
   * Prompt the user to enter a new username.
   * @type {string}
   */
  let name = prompt("Enter a username:", user);

  if (name != null) {
    if (name == "") {
      /**
       * Display an error message if the username is empty.
       */
      alert("Invalid username!");
    } else {
      /**
       * Update the username and WebSocket connection.
       */
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
 * Activate a channel.
 * @param {object} channel - The channel object.
 */
function activate(channel) {
  /**
   * The temporary channel ID.
   * @type {string}
   */
  let channelTemp = activeChannel;

  if (channel.joinStatus) {
    /**
     * Update the active channel ID and name.
     */
    activeChannel = channel.id;
    document.getElementsByClassName("current-group-name")[0].innerText =
      channel.name;

    if (channelTemp != channel.id) {
      /**
       * Reset the chatbox content and request message history.
       */
      var box = document.getElementsByClassName("chatbox")[0];
      resetContent(box);
      requestMessageHistory();
    }
  }
}

/**
 * Activate the general channel.
 */
function activateGeneral() {
  /**
   * Update the active channel ID and name.
   */
  activeChannel = "dbf646dc-5006-4d9f-8815-fd37514818ee";
  document.getElementsByClassName("current-group-name")[0].innerText =
    "General";

  /**
   * Reset the chatbox content and request message history.
   */
  var box = document.getElementsByClassName("chatbox")[0];
  resetContent(box);
  requestMessageHistory();
}

/**
 * Write a group element to the parent element.
 * @param {object} channel - The channel object.
 * @param {element} parent - The parent element.
 */
function writeGroup(channel, parent) {
  /**
   * Create a group element.
   * @type {element}
   */
  let group = document.createElement("div");

  /**
   * Create a clickable space element.
   * @type {element}
   */
  let clickableSpace = document.createElement("div");

  if (groupColor) {
    /**
     * Toggle the group color.
     */
    groupColor = false;
    group.style.backgroundColor = "rgb(235,235,235)";
  } else {
    groupColor = true;
    group.style.backgroundColor = "rgb(192,192,192)";
  }

  /**
   * Add a class to the clickable space element.
   */
  clickableSpace.classList.add("caseClickable");

  /**
   * Add an event listener to the clickable space element.
   */
  clickableSpace.addEventListener("click", (e) => {
    /**
     * Activate the channel when the clickable space is clicked.
     */
    activate(channel);
  });

  /**
   * Create a sign element.
   * @type {element}
   */
  let sign = document.createElement("i");

  /**
   * Create a content element.
   * @type {text}
   */
  let content = document.createTextNode(channel.name);

  /**
   * Add classes to the group and sign elements.
   */
  group.classList.add("group-choice");
  sign.classList.add("fas");

  if (channel.id == "dbf646dc-5006-4d9f-8815-fd37514818ee") {
    /**
     * Add a star icon to the sign element if the channel is the general channel.
     */
    sign.classList.add("fa-star");
  } else if (channel.joinStatus) {
    /**
     * Add a minus icon to the sign element if the channel is joined.
     */
    sign.classList.add("fa-minus");
  } else {
    /**
     * Add a plus icon to the sign element if the channel is not joined.
     */
    sign.classList.add("fa-plus");
    sign.classList.add("fa-plus-groupes");
  }

  /**
   * Add an event listener to the sign element.
   */
  sign.addEventListener("click", (e) => {
    /**
     * Change the channel state when the sign is clicked.
     */
    changeState(channel);
  });

  /**
   * Append the sign and clickable space elements to the group element.
   */
  group.appendChild(sign);
  clickableSpace.appendChild(content);
  group.appendChild(clickableSpace);

  /**
   * Append the group element to the parent element.
   */
  parent.appendChild(group);
}

/**
 * Get the input element.
 * @type {element}
 */
let input = document.getElementsByClassName("textbox")[0];

/**
 * Add an event listener to the input element.
 */
input.addEventListener("keyup", function (event) {
  /**
   * Prevent the default event behavior.
   */
  event.preventDefault();

  if (event.keyCode === 13) {
    /**
     * Send a message when the enter key is pressed.
     */
    sendMessage();
  }
});

/**
 * Format a date string.
 * @param {date} dateText - The date object.
 * @returns {string} The formatted date string.
 */
function formatDate(dateText) {
  /**
   * The day array.
   * @type {array}
   */
  var day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  /**
   * The zero minute and hour strings.
   * @type {string}
   */
  var zeroMinute = "";
  var zeroHour = "";

  if (dateText.getHours() < 10) zeroHour = "0";
  if (dateText.getMinutes() < 10) zeroMinute = "0";

  /**
   * Return the formatted date string.
   */
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
 * Scroll to the bottom of the chatbox.
 */
function scrollToBottom() {
  /**
   * Get the chatbox element.
   * @type {element}
   */
  var scroll = document.getElementsByClassName("chatbox")[0];

  /**
   * Set the scroll top to the scroll height.
   */
  scroll.scrollTop = scroll.scrollHeight;
}

/**
 * Increment the new message counter.
 */
function newMessage() {
  /**
   * Increment the counter.
   */
  cptr++;

  /**
   * Update the new message bubble.
   */
  updateNbNewMessage();
}

/**
 * Update the new message bubble.
 */
function updateNbNewMessage() {
  /**
   * Get the bubble element.
   * @type {element}
   */
  var obj = document.getElementsByClassName("bubble")[0];

  /**
   * Set the visibility to visible and update the text.
   */
  obj.style.visibility = "visible";
  obj.innerText = cptr;
}

/**
 * Reset the new message counter.
 */
function resetMessage() {
  /**
   * Reset the counter.
   */
  cptr = 0;

  /**
   * Hide the new message bubble.
   */
  document.getElementsByClassName("bubble")[0].style.visibility = "hidden";
}

/**
 * Print an error message.
 */
function printMessageError() {
  /**
   * Create a new message object.
   * @type {object}
   */
  var msg = new Message(
    "onError",
    activeChannel,
    "Verify connection.",
    "Admin",
    new Date(Date.now())
  );

  /**
   * Receive the message.
   */
  receiveMessage(msg);

  /**
   * Clear the input field.
   */
  document.getElementsByClassName("textbox")[0].value = "";
}

/**
 * Print a close message.
 */
function printMessageClose() {
  /**
   * Create a new message object.
   * @type {object}
   */
  var msg = new Message(
    "onClose",
    activeChannel,
    "Websocket connection closed.",
    "Admin",
    new Date(Date.now())
  );

  /**
   * Receive the message.
   */
  receiveMessage(msg);

  /**
   * Clear the input field.
   */
  document.getElementsByClassName("textbox")[0].value = "";
}

/**
 * Reset the content of an element.
 * @param {element} element - The element to reset.
 */
function resetContent(element) {
  /**
   * Set the inner text to an empty string.
   */
  element.innerText = "";
}

/**
 * Translate the page.
 */
function translate() {
  /**
   * Get the language label element.
   * @type {element}
   */
  var language = document.getElementsByClassName("lbl-language")[0].innerText;

  if (language != "french") {
    /**
     * Update the language label and translate the page to French.
     */
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
    /**
     * Update the language label and translate the page to English.
     */
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
 * Add a message to the chatbox.
 * @param {element} box - The chatbox element.
 * @param {element} content - The message content element.
 * @param {element} date - The message date element.
 * @param {object} msg - The message object.
 */
function addMessageHTML(box, content, date, msg) {
  if (msg.sender != user && msg.sender != lastUser) {
    /**
     * Create a name element.
     * @type {element}
     */
    let name = document.createElement("div");

    /**
     * Set the name text.
     */
    name.innerText = msg.sender;

    /**
     * Add a class to the name element.
     */
    name.classList.add("name");

    /**
     * Add classes to the box, content, and date elements.
     */
    box.classList.add("left-message-content");
    content.classList.add("left-message");
    date.classList.add("left-hour");

    if (msg.sender == "Admin") content.style.backgroundColor = "#3CB371";
    if (msg.eventType == "onError" || msg.eventType == "onClose")
      content.style.backgroundColor = "#DC143C";

    /**
     * Append the name element to the box element.
     */
    box.appendChild(name);

    /**
     * Increment the new message counter.
     */
    newMessage();
  } else {
    /**
     * Add classes to the box, content, and date elements.
     */
    box.classList.add("right-message-content");
    content.classList.add("right-message");
    date.classList.add("right-hour");
  }
}
