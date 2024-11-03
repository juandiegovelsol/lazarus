var user = "username";
let lastUser = "";
let url = `ws://project-nginx.info.polymtl.ca/chatservice?username=${user}`;
let ws = new WebSocket(url);

document.getElementsByClassName("logo")[0].addEventListener("click", (e) => {
  location.reload();
});
document.getElementsByClassName("fa-bell")[0].addEventListener("click", (e) => {
  resetMessage();
});
document
  .getElementsByClassName("fa-globe")[0]
  .addEventListener("click", (e) => {
    translate();
  });

var cptr = 0;
let activeChannel = "dbf646dc-5006-4d9f-8815-fd37514818ee";
let groupColor = false;

load();

function modifyName() {
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

function activate(channel) {
  let channelTemp = activeChannel;
  if (channel.joinStatus) {
    activeChannel = channel.id;
    document.getElementsByClassName("current-group-name")[0].innerText =
      channel.name;
    if (channelTemp != channel.id) {
      var box = document.getElementsByClassName("chatbox")[0];
      resetContent(box);
      requestMessageHistory();
    }
  }
}

function activateGeneral() {
  activeChannel = "dbf646dc-5006-4d9f-8815-fd37514818ee";
  document.getElementsByClassName("current-group-name")[0].innerText =
    "General";
  var box = document.getElementsByClassName("chatbox")[0];
  resetContent(box);
  requestMessageHistory();
}

function writeGroup(channel, parent) {
  let group = document.createElement("div");
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
  let sign = document.createElement("i");
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

let input = document.getElementsByClassName("textbox")[0];
input.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    sendMessage();
  }
});

function formatDate(dateText) {
  var day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  var zeroMinute = "";
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

function scrollToBottom() {
  var scroll = document.getElementsByClassName("chatbox")[0];
  scroll.scrollTop = scroll.scrollHeight;
}

function newMessage() {
  cptr++;
  updateNbNewMessage();
}

function updateNbNewMessage() {
  var obj = document.getElementsByClassName("bubble")[0];
  obj.style.visibility = "visible";
  obj.innerText = cptr;
}

function resetMessage() {
  cptr = 0;
  document.getElementsByClassName("bubble")[0].style.visibility = "hidden";
}

function printMessageError() {
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

function printMessageClose() {
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

function resetContent(element) {
  element.innerText = "";
}

function translate() {
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

function addMessageHTML(box, content, date, msg) {
  if (msg.sender != user && msg.sender != lastUser) {
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
