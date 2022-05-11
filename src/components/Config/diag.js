const diag = (twitch, type, loading, auth) => {
    if (twitch) { 
        twitch.rig.log(`Loading ${type}Config...`);
        if (!loading) twitch.rig.log("Loaded!");
        if (type === "Live" && !loading && auth.isMod) twitch.rig.log(`Displaying LiveConfig`);
        else if (type === "Static" && !loading) twitch.rig.log(`Displaying Config`);
    }

    console.log(`Loading ${type}Config...`);
    if (!loading) console.log("Loaded!");
    if (type === "Live" && !loading && auth.isMod) console.log(`Displaying LiveConfig`);
    else if (type === "Static" && !loading) console.log(`Displaying Config`);
}


module.exports = diag;