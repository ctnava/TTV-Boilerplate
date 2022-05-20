# Unofficial React + Express Boilerplate for TTV Extensions

## About

I made this primarily out of frustration with how outdated the official boilerplates are. It's meant to produce every type of extension by default. If you look at the source, I treat everything the same except for Config pages. To start developing your extension, install dependencies and edit "./src/components/App/App.jsx" or "./src/components/Config/Config.jsx".

Tests are coming soon.

## Developer Console Settings (Extension Management)

###  Asset Hosting
```
{   
    "Testing Base URI": "https://localhost:8080/",
    "Type of Extension": "all",
    "Panel Viewer Path": "panel.html",
    "Video - Fullscreen Viewer Path": "video_overlay.html",
    "Mobile Path": "mobile.html",
    "Video - Component Viewer Path": "video_component.html"
    "Config Path": "config.html",
    "Live Config Path": "live_config.html"
}
```

### Capabilities
```
{
    "Allowlist for URL Fetching Domains": ["https://linkToMyExpressServer.com"]
}
```

## Setup

### Step 0: Dependencies

I recommend installing yarn with ```npm i -g yarn``` because it will guarantee the easiest setup. For those of you that do not know or have a hard time understanding yarn, it is yet another node package manager like npm. However, it offers the distinct advantage of allowing you to never have to use ```npx```. If you dislike yarn or find it too complex, you can uninstall it with ```npm uninstall -g yarn``` at any time. If you proceed without the yarn package, replace any instances of ```yarn``` with ```npm run``` as they have identical function. Updating your npm with ```npm update -g``` may also be a good idea if you are having issues.

Whether you are using yarn or not execute ```npm i``` in the project root. This will create a package lock file. If you run ```yarn i``` instead, it will create a yarn lock file instead. Honestly it's up to you, but going with npm on this leads to less issues.

### Step 1: Quick Start

```yarn quickStart TTV_EXTENSION_CLIENT_ID_HERE```
This command will generate a ```.env``` and ```Project.json``` file containing the required values for basic operation. From there, you will need to open your Twitch Developer Rig and access your project by clicking the "Add Project" dropdown menu in the upper-left corner and then selecting "Open Project". 

.env contents
```
BACKEND_BASE_URI=http://localhost:4000
BACKEND_PORT=4000
BACKEND_SECRET=anythingYouWantReallyJustRememberMe
```
Notes: 
- Do NOT end the BACKEND_BASE_URI with a "/". This will mess up your AJAX requests.
- BACKEND_PORT must match the base uri

### Step 2: Fetching Your Project

After getting the File Explorer open, navigate to the boiler plate root and open "Project.json". In its current state, it will simply serve no other function than to grab your extension's metadata from your TTV Developer Console. Once successfully linked, click "Refresh Manifest" to fetch your current configuration and mesh it with my preset. The resulting "Project Details" page will look like this.

![ConfigScreenshot](https://raw.githubusercontent.com/ctnava/TTV-Boilerplate/development/blob/ProjectDetails.PNG)

### Step 3: Booting up the Backend Server

```yarn api```
It is preferable to use this script as opposed to using the dedicated devrig button. The reason that this script differs from what is in the project configuration file is that we want to use the nodemon package. Think of this as "Live Reload", but for REST Servers.

Using the "Run Back End" button on, either, the "Extension Views" or "Project Details" tab WILL work, but if your server crashes you will need to manually stop and restart the server.

If the aforementioned steps are followed exactly, you will see:
```Server Started on Port:4000```

### Step 4: Booting up the Frontend Server

Click "Run Front End" on, either, the "Extension Views" or "Project Details" tab.

If the aforementioned steps are followed exactly, you will see the following log:

![LogScreenshot](https://raw.githubusercontent.com/ctnava/TTV-Boilerplate/development/blob/Success.PNG)

The text in red is a non-fatal error caused by a missing certificate. This prompts webpack to self-certify your back end. In short, this is nothing to worry about. The true indicator of a successful front end start is when the log ends in the following line:
```
webpack 5.xx.x compiled successfully in 2347 ms
```

### Step 5: Setting up your Views

Do not be alarmed when you see nothing after starting the front end, instead click "Create New View" and then:
- Choose a "View Type"
- Label it whatever you want
- (Optionally) turn on some feature flags
- Choose where to test your extension with "Frame Properties" (existing user's channel or the devrig's channel)
- Choose your perspective with "Viewer Type"

Notes: 
- Configuration and Dashboard Views are generally restricted to broadcasters and moderators.
- Choosing to use a custom user ID is generally only to test features in the aforementioned feature flags. Unless you plan to support bits or subs, you don't need to do this.


### Step 6: Getting It to Run

As a sanity check run ```yarn api``` in any terminal window and then click "Run Front End" in the developer rig. All viewer-facing windows should display their respective credentials and, if they are a mod, they should see a non-functional "Mod Button". All configuration windows (mod-facing) should allow the user to see any and all information that the REST API has collected on them. 

Whether you are a streamer or not, the CCPA/GDPR mandates that consumers be able to access, download, and delete their data; invoking the right to be forgotten so that your extension is allowed to lawfully operate in California and the EU. Visiting the REST API directly at "/" should result in a JSON response of "Hello World!" or similar while the "/legal" endpoint should result in the display of a blank Terms & Conditions/ Privacy Policy contract. Because I am not a lawyer, it is up to you to COVER YOUR ASS. I highly recommend that you include legal wording that covers these laws specifically and invoke Twitch TV's own legally binding contracts where applicable because they have spent BANK on lawyers.


### Step 7: Actual Development

Firstly, pat yourself on the back. Most people give up before they get here. Secondly, remember that this is why you downloaded this boilerplate.

#### Front End

This boiler plate ends at the following paths:
- ```./src/components/App/components```
- ```./src/components/Config/components```
This is also where YOUR code begins!

#### Static Assets 

If you intend to use static CSS and images, please place them in ```./public```. When the webpack is called to host or build, there is a post-build script that copies every file from this directory into the ```./build``` folder. 

#### Utilities

General utilities can be found in ```./src/components/util```. In this folder, you can find "api.js"; which contains contains general AJAX request utilities powered by Axios. It contains all basic CRUD operators (get, post, put, patch, & del). After importing these utilities as "api", it's as simple as calling ```api.post("endpoint", props.auth, {dataToBeIncludedInTheBody})```. 

TTV-specific utilities can be found in ```./src/components/util/twitch```. While this is not a comprehensive TTV library, it contains the bare minimum needed to get your extension working. I took this approach because, in order to work in the hosted testing environment, the total size for any bundle must be kept under 1000KB; otherwise your extension will fail.

#### Back End

In ```./api/app.js```, you can add custom endpoints below line 10 to serve your extension with preloaded utilities for json interaction, request validation, and easy pathfinding. Do check them out in ```./api/utils/utils.js```!


### Step 8: Preparing for the Hosted Test

```yarn build```
This command will bundle your extension so that it may be zipped and uploaded to Twitch's CDN. Open the ```./build``` folder and send only the relevant files to a compressed zip. Once compressed, you will be able to the "Status" tab of your developer console, scroll to the bottom where the "Next Steps" Section is located, click "Go to Files", upload your file, navigate back to the "Status" tab, and click "Move to Hosted Test".

Notes:
- Renamed .rar or .7z files will not work and, at the time of writing, result in a faulty error message.
- Do NOT compress every file in the build folder. Only archive the files that are intended to be used.

## Good Luck; Have Fun!

DISCLAIMER: This boiler plate is far from complete and receive regular maintenance within reason. If you want a feature integrated, feel free to submit a PR! If you have any questions, you can contact me at CAT6#2699 on discord.

[So you made it this far? Feel free to buy me a coffee if I made your first TTV extension a managable experience.](https://www.buymeacoffee.com/CAT6)