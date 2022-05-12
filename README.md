# React Boilerplate for TTV Extensions

## About

I made this primarily out of frustration with how outdated the official boilerplates are. It's meant to produce every type of extension by default. If you look at the source, I treat everything the same except for Config pages. To start developing your extension, install dependencies and edit "./src/components/App/App.jsx" or "./src/components/Config/Config.jsx".

When you are ready to use this with Twitch's DevRig, run ```yarn host```.
For local testing, use ```yarn start```.
To pack up for deployment, use ```yarn build``` to populate "./dist".

Tests are coming soon.

## Dotenv

Required Values
```
BACKEND_BASE_URI=http://localhost:${portNumber}/
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

### Commands
```
"frontendCommand": "yarn host",
"frontendFolderName": "public",
"usingRandomFrontendHostingPort": false
```
