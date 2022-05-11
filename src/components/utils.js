function authorize(twitch, setAuth, loading, setLoading) {
    twitch.onAuthorized((credentials)=>{
        require("./OAuth/utils").setToken(credentials.token, credentials.userId, setAuth);
        if(loading){
            // additionalSetup();
            setLoading(false);
        }
    });
}


function listen(twitch) {
    twitch.listen('broadcast', (target, contentType, body)=>{
        twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${body}`);
        // now that you've got a listener, do something with the result... 

        // do something...

    });
}


function unmount(twitch) {
    twitch.unlisten('broadcast', () => console.log('successfully unlistened'));
}


function updateVisibility(twitch, setVisible) {
    twitch.onVisibilityChanged((visibility, _c) => {
        setVisible(visibility);
    });
}


function updateContext(twitch, setTheme) {
    twitch.onContext((context, delta) => {
        if(delta.includes('theme')) setTheme(context.theme);
    });
}


module.exports = { authorize, listen, unmount, updateVisibility, updateContext }