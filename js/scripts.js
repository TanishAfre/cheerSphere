function confettiCaller() {

      let canvas = document.createElement("canvas");
      canvas.width = 1000;
      canvas.height = 600;
      let container = document.getElementsByClassName("button-wrapper")[0];
      container.appendChild(canvas);
  
      let confetti_button = confetti.create(canvas);
      confetti_button().then(() => {
        container.removeChild(canvas);
      });
  
      var count = 300; // Adjusted count for shorter duration
  
      var defaults = {
        origin: { y: 0.7 }
      };
  
      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }
  
      function runAnimation(times) {
        if (times <= 0) return;
        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
  
        setTimeout(() => runAnimation(times - 1), 1000); // 1 second delay
      }
  
      runAnimation(3); // Run the animation 3 times

  }
  
  // Call the function to start the confetti animation
  startConfettiAnimation();
  