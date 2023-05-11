const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;

buttonStart.addEventListener('click', function () {
  buttonStart.disabled = true;
  intervalId = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

buttonStop.addEventListener('click', function () {
  buttonStart.disabled = false;
  clearInterval(intervalId);
});
