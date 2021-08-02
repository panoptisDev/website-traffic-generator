const fs = require('fs')
const https = require('https');

 function readAgents(path="./lib/userAgents.txt"){
    const agents =  fs.readFileSync(path,"utf8");
   return agents;
}

function readProxies(path="./lib/proxies.txt"){
    const proxies =  fs.readFileSync(path,"utf8");
   return proxies;
}

function getData(operation,number =10){
    let agents = null;
    if(operation==="AGENTS"){
        agents = readAgents().toString().replace(/\r\n/g,'\n').split('\n');
    }else if(operation==="PROXY"){
        agents = readProxies().toString().replace(/\r\n/g,'\n').split('\n');
    }else{
        process.exit(0);
    }
   
    if(number  >agents.length){
       console.log(`Error:  Number is greater than the actual agents available`)
    }
   
    let selectAgents = [];
    //fetch 100 random user agents
    for(let i=0 ; i< number;i++){
        selectAgents.push(agents[Math.floor(Math.random()* agents.length + 1)])
    }
   return selectAgents;
}


 function fetchProxies (){
    https.get('https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt', (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => { 
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //  console.log()
            try {
                fs.writeFileSync(`${__dirname}/proxies.txt`, data);
                //file written successfully
            } catch (err) {
                console.error(err);
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    }

module.exports={readAgents, getData , fetchProxies, readProxies}