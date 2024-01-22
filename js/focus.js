let countdownTimer;
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const sessionLength = document.getElementById('sessionLength');
const decreaseSession = document.getElementById('decreaseSession');
const increaseSession = document.getElementById('increaseSession');

decreaseSession.addEventListener('click', function() {
    let length = parseInt(sessionLength.textContent, 10);
    if (length > 1) {
        sessionLength.textContent = length - 1;
    }
});

increaseSession.addEventListener('click', function() {
    let length = parseInt(sessionLength.textContent, 10);
    sessionLength.textContent = length + 1;
});


const targetDate = new Date();
targetDate.setHours(targetDate.getHours() + 5);

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

function updateAllSegments() {
  const timeRemainingBits = getTimeRemaining(
    new Date(targetDate).getTime()
  );

  updateTimeSection('seconds', timeRemainingBits.seconds);
  updateTimeSection('minutes', timeRemainingBits.minutes);
  updateTimeSection('hours', timeRemainingBits.hours);

  return timeRemainingBits.complete;
}

startButton.addEventListener('click', function() {
    if (!countdownTimer) {
        countdownTimer = setInterval(() => {
            const isComplete = updateAllSegments();
            if (isComplete) {
                clearInterval(countdownTimer);
                countdownTimer = null;
            }
        }, 1000);
        updateAllSegments();
    }
});

stopButton.addEventListener('click', function() {
    clearInterval(countdownTimer);
    countdownTimer = null;
});

updateAllSegments();
