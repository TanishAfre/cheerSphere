let countdownTimer;
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const sessionLength = document.getElementById('sessionLength');
const decreaseSession = document.getElementById('decreaseSession');
const increaseSession = document.getElementById('increaseSession');


document.addEventListener('DOMContentLoaded', function() {
  restoreCountdown(); // Call this function on page load to restore any ongoing countdown
});

function toggleCountdown() {
  var button = document.getElementById('toggleButton');
  
  if (button.textContent === 'Start Countdown') {
    button.textContent = 'Stop Countdown';
    const sessionMinutes = parseInt(sessionLength.textContent, 10);
    const targetDate = new Date();
    targetDate.setMinutes(targetDate.getMinutes() + sessionMinutes);
    localStorage.setItem('countdownRunning', 'true');
    localStorage.setItem('targetDate', targetDate.getTime().toString());
    startCountdown(targetDate);
  } else {
    button.textContent = 'Start Countdown';
    stopCountdown();
  }
}

function restoreCountdown() {
  const countdownRunning = localStorage.getItem('countdownRunning') === 'true';
  const storedTargetDate = localStorage.getItem('targetDate');
  
  if (countdownRunning && storedTargetDate) {
    const targetDate = new Date(parseInt(storedTargetDate, 10));
    const sessionMinutes = Math.ceil((targetDate - new Date()) / 60000);
    sessionLength.textContent = sessionMinutes >= 0 ? sessionMinutes : 0; // Ensure session length doesn't go negative
    startCountdown(targetDate);
  } else {
    resetTimeDisplay();
  }
}

function startCountdown(targetDate) {
  if (!countdownTimer) {
    countdownTimer = setInterval(() => {
      const isComplete = updateAllSegments(targetDate); // Pass targetDate to update function
      if (isComplete) {
        stopCountdown();
      }
    }, 1000);
    updateAllSegments(targetDate); // Pass targetDate to update function
  }
}

// Ensure the stopCountdown function marks the countdown as not running and clears relevant localStorage items
function stopCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
    resetTimeDisplay();
    localStorage.setItem('countdownRunning', 'false');
    localStorage.removeItem('targetDate'); // Clear the targetDate from localStorage
  }
}

document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    restoreCountdown();
  }
});

decreaseSession.addEventListener('click', function() {
    let length = parseInt(sessionLength.textContent, 10);
    if (length > 1) {
        sessionLength.textContent = length - 5;
    }
});

increaseSession.addEventListener('click', function() {
    let length = parseInt(sessionLength.textContent, 10);
    sessionLength.textContent = length + 5;
});


//const targetDate = new Date();
//targetDate.setHours(targetDate.getHours() + 5);

function getTimeSegmentElements(segmentElement) {
  const segmentDisplay = segmentElement.querySelector(
    '.segment-display'
  );
  const segmentDisplayTop = segmentDisplay.querySelector(
    '.segment-display__top'
  );
  const segmentDisplayBottom = segmentDisplay.querySelector(
    '.segment-display__bottom'
  );

  const segmentOverlay = segmentDisplay.querySelector(
    '.segment-overlay'
  );
  const segmentOverlayTop = segmentOverlay.querySelector(
    '.segment-overlay__top'
  );
  const segmentOverlayBottom = segmentOverlay.querySelector(
    '.segment-overlay__bottom'
  );

  return {
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  };
}

function updateSegmentValues(
  displayElement,
  overlayElement,
  value
) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
  const segmentElements =
    getTimeSegmentElements(segmentElement);

  if (
    parseInt(
      segmentElements.segmentDisplayTop.textContent,
      10
    ) === timeValue
  ) {
    return;
  }

  segmentElements.segmentOverlay.classList.add('flip');

  updateSegmentValues(
    segmentElements.segmentDisplayTop,
    segmentElements.segmentOverlayBottom,
    timeValue
  );

  function finishAnimation() {
    segmentElements.segmentOverlay.classList.remove('flip');
    updateSegmentValues(
      segmentElements.segmentDisplayBottom,
      segmentElements.segmentOverlayTop,
      timeValue
    );

    this.removeEventListener(
      'animationend',
      finishAnimation
    );
  }

  segmentElements.segmentOverlay.addEventListener(
    'animationend',
    finishAnimation
  );
}

function updateTimeSection(sectionID, timeValue) {
  const firstNumber = Math.floor(timeValue / 10) || 0;
  const secondNumber = timeValue % 10 || 0;
  const sectionElement = document.getElementById(sectionID);
  const timeSegments =
    sectionElement.querySelectorAll('.time-segment');

  updateTimeSegment(timeSegments[0], firstNumber);
  updateTimeSegment(timeSegments[1], secondNumber);
}

function getTimeRemaining(targetDateTime) {
  const nowTime = Date.now();
  const complete = nowTime >= targetDateTime;

  if (complete) {
    return {
      complete,
      seconds: 0,
      minutes: 0,
      hours: 0,
    };
  }

  const secondsRemaining = Math.floor(
    (targetDateTime - nowTime) / 1000
  );
  const hours = Math.floor(secondsRemaining / 60 / 60);
  const minutes =
    Math.floor(secondsRemaining / 60) - hours * 60;
  const seconds = secondsRemaining % 60;

  return {
    complete,
    seconds,
    minutes,
    hours,
  };
}

function resetTimeDisplay() {
  // Assuming you have a function similar to updateTimeSection that you can call
  // to update the display of hours, minutes, and seconds.
  // If not, you'll need to implement this based on your existing code structure.

  updateTimeSection('hours', 0);
  updateTimeSection('minutes', 0);
  updateTimeSection('seconds', 0);
}

function updateAllSegments(targetDate) {
  const timeRemainingBits = getTimeRemaining(targetDate.getTime());
  updateTimeSection('seconds', timeRemainingBits.seconds);
  updateTimeSection('minutes', timeRemainingBits.minutes);
  updateTimeSection('hours', timeRemainingBits.hours);
  return timeRemainingBits.complete;
}

resetTimeDisplay();
updateAllSegments();