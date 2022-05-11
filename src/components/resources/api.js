/**
     * Makes a call against a given endpoint using a specific method. 
     * 
     * Returns a Promise with the Request() object per fetch documentation.
     * 
     */

 function makeCall(url, method="GET"){
    return new Promise((resolve, reject)=>{
        if(this.isAuthenticated()){
            let headers={
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }

            fetch(url,
                {
                    method,
                    headers,
                })
                .then(response=>resolve(response))
                .catch(e=>reject(e))
        }else{
            reject('Unauthorized')
        }
    })
}