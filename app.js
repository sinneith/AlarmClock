const number = document.getElementById("number");
const text = document.getElementById("text");

function startTimer() {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let ampm = hour >= 12 ? "" : "AM";

  number.innerText = `${hour < 10 ? `0${hour}` : `${hour}`}:${
    minute < 10 ? `0${minute}` : `${minute}`
  }:${second < 10 ? `0${second}` : `${second}`}`;
  text.innerText = ampm;
}

window.addEventListener("load", () => setInterval(startTimer, 100));
