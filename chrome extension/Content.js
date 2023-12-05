const generateSTYLES = () => {
  return `<style>
  #container {
    position: fixed;
    backdrop-filter: saturate(180%) blur(30px); 
    height: 100vh;
    width: 100vw;--
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    display: flex;
    z-index: 9999;
  }

    ._1 {
      font-size: 90px;
      font-weight: bold;
      text-align: center;
    }

    ._2 {
      font-size: 20px;
      text-align: center;
      margin-top: 100px;
      position: absolute;
    }
  </style>`;
};

const generateHTML = (pageName) => {
  return `
    <div id='container'>
        <div class='_1'>Focus Mode Enabled</div>
        <div class='_2'>Website Blocked: ${pageName}</div>
    </div>`;
};
// Create a new element to hold content
const overlayContainer = document.createElement("div");

switch (window.location.hostname) {
  case "www.youtube.com":
    overlayContainer.innerHTML = generateSTYLES() + generateHTML(window.location.hostname);
    document.body.appendChild(overlayContainer);
    break;
  case "www.facebook.com":
    overlayContainer.innerHTML = generateSTYLES() + generateHTML(window.location.hostname);
    document.body.appendChild(overlayContainer);
    break;
  case "www.netflix.com":
    overlayContainer.innerHTML = generateSTYLES() + generateHTML(window.location.hostname);
    document.body.appendChild(overlayContainer);
    break;
  case "www.roblox.com":
    overlayContainer.innerHTML = generateSTYLES() + generateHTML(window.location.hostname);
    document.body.appendChild(overlayContainer);
    break;
  case "discord.com":
    overlayContainer.innerHTML = generateSTYLES() + generateHTML(window.location.hostname);
    document.body.appendChild(overlayContainer);
    break;
  case "www.spotify.com":
    overlayContainer.innerHTML = generateSTYLES() + generateHTML(window.location.hostname);
    document.body.appendChild(overlayContainer);
    break;
}
//document.body.innerHTML = generateHTML(window.location.hostname);
