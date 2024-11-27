const container = document.querySelector(".chart");
let data = [20, 50, 75, 30, 85, 60, 100, 45, 90, 15];

function animateBars() {
  const bars = container.querySelectorAll(".bar");

  anime({
    targets: bars,
    height: (el, i) => data[i] * 2,
    backgroundColor: function () {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    easing: "easeInOutSine",
    duration: function () {
      return Math.random() * 1000 + 500;
    },
    delay: function (el, i) {
      return i * 100;
    },
  });
}

function updateChart() {
  data = data.map(() => Math.floor(Math.random() * 100) + 10);
  animateBars();
}

animateBars();

setInterval(updateChart, 2000);
