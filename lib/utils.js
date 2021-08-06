const fs = require("fs");
const {fetchProxies} = require('./fileOperations');

const delay = milliseconds => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds)

const initialize = ()=>{
    if (!(fs.existsSync(`${__dirname}/proxies.txt`))) {
        fetchProxies();
        delay(2000);
    } 
    return true;
}

module.exports={delay, initialize}