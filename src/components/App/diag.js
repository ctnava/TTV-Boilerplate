const diag = (twitch, type, loading, visible) => {
    if (twitch) { 
        twitch.rig.log(`Loading ${type}...`);
        if (!loading && visible) twitch.rig.log(`Loaded! Displaying ${type}`);
    }

    console.log(`Loading ${type}...`);
    if (!loading && visible) console.log(`Loaded! Displaying ${type}`);
}


module.exports = diag;