import base from "./base";


const endpoint = (route) => {
    if (base.URI[base.URI.length-1] === "/") return `${base.URI}${route}`;
    else return `${base.URI}/${route}`;
};


export default endpoint;