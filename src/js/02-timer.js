import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate > new Date()) {
      document.querySelector('[data-start]').removeAttribute('disabled');
    } else {
      Notiflix.Notify.warning('Please choose a date in the future');
    }
  },
};

const dateTimePicker = flatpickr('#datetime-picker', options);
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownIntervalId;

startButton.addEventListener('click', startCountdown);

function startCountdown() {
  // Wyłącz przycisk Start
  startButton.setAttribute('disabled', true);

  const selectedDate = dateTimePicker.selectedDates[0];
  const countdownEndDate = new Date(selectedDate).getTime();

  countdownIntervalId = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownEndDate - now;

    if (distance <= 0) {
      clearInterval(countdownIntervalId);
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, '0');
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0');

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
  }
}
