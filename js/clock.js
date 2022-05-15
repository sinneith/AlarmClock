const clock = document.getElementById("clock");
const hourDiv = document.getElementById("hour");
const minuteDiv = document.getElementById("minute");
const secondDiv = document.getElementById("second");
const text = document.getElementById("text");

const alarmBtn = document.getElementById("alarm");
const resetBtn = document.getElementById("reset");
const cancelBtn = document.getElementById("cancel");
const closeBtn = document.getElementById("close");
const popup = document.getElementById("popup");
const setHour = document.getElementById("setHour");
const setMinute = document.getElementById("setMinute");
const setBtn = document.getElementById("setBtn");

let timeArr = [];

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

function setAlarm(event) {
  popup.style.display = "none";

  let alarmObj;

  if (event.target.innerText === "Cancel") {
    alarmObj = {
      hour: false,
      minute: false,
    };
  } else {
    alarmObj = {
      hour: setHour.value,
      minute: setMinute.value,
    };
  }
  timeArr = alarmObj;
  saveTime();
  ringAlarm();
}

function saveTime() {
  localStorage.setItem("time", JSON.stringify(timeArr));
}

function ringAlarm() {
  const handleAlarm = setInterval(function () {
    let setTimeHour;
    let setTimeMinute;

    const checkValue = setInterval(function () {
      let setTime = JSON.parse(localStorage.getItem("time"));
      setTimeHour = setTime.hour;
      setTimeMinute = setTime.minute;

      if (setTimeHour === false) {
        clearInterval(checkValue);
        clearInterval(handleAlarm);
      } else if (
        setTimeHour === hourDiv.innerText &&
        setTimeMinute === minuteDiv.innerText
      ) {
        alert("alarm!");
        clearInterval(handleAlarm);
        clearInterval(checkValue);
      } else {
        clearInterval(handleAlarm);
      }
    }, 1000);
    clearInterval(handleAlarm);
  }, 1000);
}

setInterval(startTimer, 1000);
alarmBtn.addEventListener("click", () => (popup.style.display = "block"));
closeBtn.addEventListener("click", () => (popup.style.display = "none"));
setBtn.addEventListener("click", setAlarm);
resetBtn.addEventListener("click", function () {
  popup.style.display = "block";
  setAlarm;
});
cancelBtn.addEventListener("click", setAlarm);
