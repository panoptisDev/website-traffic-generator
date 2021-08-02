const fs = require("fs");
const {fetchProxies} = require('./fileOperations');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const initialize = ()=>{
    if (!(fs.existsSync(`${__dirname}/proxies.txt`))) {
        fetchProxies();
    } 
    return true;
}

module.exports={delay, initialize}