const generateSTYLES = () => {
  return `<style>
    #container {
      position: fixed;
      backdrop-filter: saturate(180%) blur(30px);
      height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: white;
      z-index: 9999;
    }
    
    ._1 {
      font-size: 90px;
      font-weight: bold;
    }
    
    ._2 {
      font-size: 20px;
      margin-top: 20px; /* Adjust as needed */
    }
    
    #toggle {
      margin-top: 20px; /* Adjust as needed */
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: blue;
      color: white;
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
    }
  </style>`;
};

const generateHTML = (pageName) => {
  return `
    <div id='container'>
        <div class='_1'>Focus Mode Enabled</div>
        <div class='_2'>Website Blocked: ${pageName}</div>
        <button id='toggle'>Close Focus Mode</button>
    </div>`;
};

// Create a new element to hold content
const overlayContainer = document.createElement("div");

switch (window.location.hostname) {
  case "www.youtube.com":
  case "www.facebook.com":
  case "www.netflix.com":
  case "www.roblox.com":
  case "discord.com":
  case "www.spotify.com":
    overlayContainer.innerHTML = generateSTYLES() + generateHTML(window.location.hostname);
    document.body.appendChild(overlayContainer);

    // Add event listener to the Close Focus Mode button
    const closeButton = document.getElementById('toggle');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        // Remove the overlay container when the button is clicked
        document.body.removeChild(overlayContainer);
      });
    }
    break;
}
