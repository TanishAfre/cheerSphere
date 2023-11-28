const generateSTYLES = () => {
    return `<style>
    * {
    box-sizing: border-box;
    color: #fff;
    font-family: monospace;
    font-size: 5vw;
    font-weight: bold;
    text-align: center;
  }
  
  html {
    background: radial-gradient(68.34% 50% at 50% 50%, #2D9AFF 0%, #41DEE8 0%, #A22DFF 100%);
    height: 100vh;
    padding: 50px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  html::before {
    content: '!! Website Blocked !!';
  }
  
  body {
    display: none !important;
  }
    
   
     </style>`;
};

const generateHTML = (pageName) => {
    return `
        <div class='_1'>Focus Mode Enabled</div>
        <div class='_2'>Website Blocked ${pageName}</div>
    </div>
     `;
};

switch (window.location.hostname) {
    case "www.youtube.com":
        document.head.innerHTML = generateSTYLES();
        document.body.innerHTML = generateHTML("YOUTUBE");
        break;
    case "www.facebook.com":
        document.head.innerHTML = generateSTYLES();
        document.body.innerHTML = generateHTML("FACEBOOK");
        break;
    case "www.netflix.com":
        document.head.innerHTML = generateSTYLES();
        document.body.innerHTML = generateHTML("NETFLIX");
        break;
    case "www.roblox.com":
        document.head.innerHTML = generateSTYLES();
        document.body.innerHTML = generateHTML("ROBLOX");
        break;
    case "discord.com":
        document.head.innerHTML = generateSTYLES();
        document.body.innerHTML = generateHTML("DISCORD");
        break;
    case "www.spotify.com":
        document.head.innerHTML = generateSTYLES();
        document.body.innerHTML = generateHTML("SPOTIFY");
        break;
}
