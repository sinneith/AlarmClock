const setBtn = document.getElementById("setBtn");
const resetBtn = document.getElementById("reset");
const cancelBtn = document.getElementById("cancel");
const alarmBtn = document.getElementById("alarm");
const closeBtn = document.getElementById("close");
const popup = document.getElementById("popup");

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

alarmBtn.addEventListener("click", () => (popup.style.display = "block"));
closeBtn.addEventListener("click", () => (popup.style.display = "none"));
setBtn.addEventListener("click", setAlarm);
resetBtn.addEventListener("click", function () {
  popup.style.display = "block";
  setAlarm;
});
cancelBtn.addEventListener("click", setAlarm);

if (
  localStorage.length !== 0 &&
  JSON.parse(localStorage.getItem("time")).hour !== false
) {
  timeArr = JSON.parse(localStorage.getItem("time"));
  saveTime();
}
