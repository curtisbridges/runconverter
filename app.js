let distance = 0;
let minutes = 0;
let seconds = 0;

// add input handlers for: distance, minutes, seconds
const distanceElem = document.getElementById('distance');
distanceElem.addEventListener('input', function(e) {
  try {
    distance = Number.parseFloat(e.target.value);
  } catch(err) {
    distance = 0;
  }
  calculateValues(distance, minutes, seconds);
});

const minutesElem = document.getElementById('minutes');
minutesElem.addEventListener('input', function(e) {
  try {
    minutes = Number.parseInt(e.target.value);
  } catch(err) {
    minutes = 0;
  }
  calculateValues(distance, minutes, seconds);
});

const secondsElem = document.getElementById('seconds');
secondsElem.addEventListener('input', function(e) {
  try {
    seconds = Number.parseInt(e.target.value);
  } catch(err) {
    seconds = 0;
  }
  calculateValues(distance, minutes, seconds);
});

// if all inputs are filled, update calculated values (clear them if not)
function calculateValues(distance, minutes, seconds) {
  const timeInSeconds = (minutes * 60) + seconds;
  if (distance === 0 || timeInSeconds === 0) {
    return;
  }

  const aveMph = distance / (timeInSeconds / 3600.0);
  const minutesPerMile = (60.0 / aveMph);

  const fiveK = minutesPerMile * 3.108;

  const tenK = minutesPerMile * 6.216;

  updateResults(aveMph, minutesPerMile, fiveK, tenK);
}

function convertFloatToTime(time) {
  const minutes = Math.floor(time);
  const seconds = Math.round((time - minutes) * 60);
  const  secondsString = (seconds + "").padStart(2,"0");
  return `${minutes}:${secondsString}`
}

// update divs for aveMph, pace, 5kTime, 10kTime
function updateResults(aveMph, pace, fiveK, tenK) {
  const aveMphElem = document.getElementById('aveMph');
  aveMphElem.innerText = aveMph >= 0 ? aveMph.toFixed(2) : '-';

  const paceElem = document.getElementById('pace');
  paceElem.innerText = pace >= 0 ? convertFloatToTime(pace) : '-';

  const fiveKElem = document.getElementById('5kTime');
  fiveKElem.innerText = fiveK >= 0 ? convertFloatToTime(fiveK) : '-';

  const tenKElem = document.getElementById('10kTime');
  tenKElem.innerText = tenK >= 0 ? convertFloatToTime(tenK) : '-';
}
