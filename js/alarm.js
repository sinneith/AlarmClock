const setBtn = document.getElementById("setBtn");
const resetBtn = document.getElementById("reset");
const cancelBtn = document.getElementById("cancel");
const alarmBtn = document.getElementById("alarm");
const closeBtn = document.getElementById("close");
const checkBtn = document.getElementById("check");

const popup = document.getElementById("popup");
const alarmPopup = document.getElementById("alarmPopup");
const audio = new Audio();
audio.src = "audio.mp3";

let timeArr = [];

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
}

function saveTime() {
  localStorage.setItem("time", JSON.stringify(timeArr));
  ringAlarm();
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
        alertTime();
        clearInterval(handleAlarm);
        clearInterval(checkValue);
      } else {
        clearInterval(handleAlarm);
      }
    }, 1000);
    clearInterval(handleAlarm);
  }, 1000);
}

function alertTime() {
  alarmPopup.style.display = "block";
  audio.play();
  document.body.classList.add("blink");
  timeArr = {
    hour: false,
    minute: false,
  };
  saveTime();
}

alarmBtn.addEventListener("click", () => (popup.style.display = "block"));
closeBtn.addEventListener("click", () => (popup.style.display = "none"));
setBtn.addEventListener("click", setAlarm);
cancelBtn.addEventListener("click", setAlarm);
resetBtn.addEventListener("click", function () {
  popup.style.display = "block";
  setAlarm;
});
checkBtn.addEventListener("click", function () {
  alarmPopup.style.display = "none";
  document.body.classList.remove("blink");
});

if (
  localStorage.length !== 0 &&
  JSON.parse(localStorage.getItem("time")).hour !== false
) {
  timeArr = JSON.parse(localStorage.getItem("time"));
  saveTime();
}
