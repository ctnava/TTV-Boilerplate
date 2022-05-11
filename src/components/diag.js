const diag = (twitch, type) => {
    var twitch = window.Twitch ? window.Twitch.ext : null;
    if (twitch) {
        twitch.rig.log("TTV Detected");
        twitch.rig.log(`Attempting to display ${type}`);
    } else console.log("TTV not Detected");
    console.log(`Attempting to display ${type}`);
};


module.exports = diag;