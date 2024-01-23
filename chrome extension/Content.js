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

let focusmodeResponse;

const generateHTML = (pageName) => {
  return `
    <div id='container'>
        <div class='_1'>Focus Mode Enabled</div>
        <div class='_2'>Website Blocked: ${pageName}</div>
        <button id='toggle'>Close Focus Mode</button>
    </div>`;
};
// implement using fetch api


// Create a new element to hold content
const overlayContainer = document.createElement("div");

// Function to check if a website is blocked
const isWebsiteBlocked = async (hostname) => {
  const response = await new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: 'readWebsites' }, resolve);
  });
  // Extract the array of blocked websites from the response
  const blockedWebsites = response.data || [];
  console.log('blockedWebsites: ' + blockedWebsites);
  return blockedWebsites.includes(hostname);
};

// Read the current hostname
const currentHostname = window.location.hostname;

// Fetch focus mode response and check if the website is blocked
chrome.runtime.sendMessage({ action: 'readFocusMode' }, function (response) {
  console.log('FocusMode Status: ' + response.data);
  focusmodeResponse = response.data;

  // Check if the current website is blocked
  isWebsiteBlocked(currentHostname).then((blocked) => {
    if (blocked && focusmodeResponse == 'on') {
      // Website is blocked, and focus mode is enabled

      // Display the overlay container
      overlayContainer.innerHTML = generateSTYLES() + generateHTML(currentHostname);
      document.body.appendChild(overlayContainer);

      // Add event listener to the Close Focus Mode button
      const closeButton = document.getElementById('toggle');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          // Remove the overlay container when the button is clicked
          document.body.removeChild(overlayContainer);
        });
      }
    }
  });
});


chrome.runtime.sendMessage({ action: 'readSQLDatabase' }, function (response) {
  console.log('readSQLDatabase response.data:', response.data);
});