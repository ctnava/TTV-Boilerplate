# Unofficial React + Express Boilerplate for TTV Extensions
[Buy Me a Coffee](https://www.buymeacoffee.com/CAT6)
## About

I made this primarily out of frustration with how outdated the official boilerplates are. It's meant to produce every type of extension by default. If you look at the source, I treat everything the same except for Config pages. To start developing your extension, install dependencies and edit "./src/components/App/App.jsx" or "./src/components/Config/Config.jsx".

When you are ready to use this with Twitch's DevRig, run ```yarn host```.
For local testing, use ```yarn start```.
To pack up for deployment, use ```yarn build``` to populate "./dist".
If you want to update the public folder without accidentally deleting your work, use ```yarn publish```
To launch the backend, use ```yarn api```.

Tests are coming soon.

## Dotenv

Required Values
```
BACKEND_BASE_URI=http://localhost:4000/
BACKEND_PORT=4000
BACKEND_SECRET=anythingYouWantReally
```

## Project Settings

### Base URI
```
https://localhost:8080/
```

### Viewer Paths
```
{
    "mobile": "mobile.html",
    "panel": "panel.html",
    "videoOverlay": "video_overlay.html",
    "component": "video_component.html"
    "config": "config.html",
    "liveConfig": "live_config.html"
}
```

### Config
```
"backendCommand": "node api/app.js",
"backendFolderName": "temp",
"frontendCommand": "yarn host",
"frontendFolderName": "public",
"usingRandomFrontendHostingPort": false
```

## Screenshots for Every Extension Type
![Screenshot1](https://raw.githubusercontent.com/ctnava/TTV-Boilerplate/main/blob/1.PNG)
![Screenshot2](https://raw.githubusercontent.com/ctnava/TTV-Boilerplate/main/blob/2.PNG)
![Screenshot3](https://raw.githubusercontent.com/ctnava/TTV-Boilerplate/main/blob/3.PNG)
