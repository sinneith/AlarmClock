const clock = document.getElementById("clock");
const hourDiv = document.getElementById("hour");
const minuteDiv = document.getElementById("minute");
const secondDiv = document.getElementById("second");
const text = document.getElementById("text");
const setHour = document.getElementById("setHour");
const setMinute = document.getElementById("setMinute");

for (let i = 1; i < 25; i++) {
  const hourOpt = document.createElement("option");
  hourOpt.value = String(i).padStart(2, "0");
  hourOpt.innerText = String(i).padStart(2, "0");
  setHour.appendChild(hourOpt);
}

for (let j = 0; j < 60; j++) {
  const minuteOpt = document.createElement("option");
  minuteOpt.value = String(j).padStart(2, "0");
  minuteOpt.innerText = String(j).padStart(2, "0");
  setMinute.appendChild(minuteOpt);
}

function startTimer() {
  const now = new Date();
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");
  let ampm;
  if (hour >= 5 && hour <= 18) {
    ampm = "☀︎";
    document.body.style.backgroundColor = "white";
    clock.style.color = "black";
  } else {
    ampm = "☽";
    document.body.style.backgroundColor = "black";
    clock.style.color = "white";
  }
  hourDiv.innerText = hour;
  minuteDiv.innerText = minute;
  secondDiv.innerText = second;
  text.innerText = ampm;
}

setInterval(startTimer, 1000);
