const request = require('request')
const config = require('./config')
const { delay, initialize } = require("./lib/utils");
const { readAgents, getData, fetchProxies, readProxies } = require("./lib/fileOperations");

(()=>{ 
    // initialize proxies 
   initialize(); 
   const proxies = getData("PROXY",config.PROXY); 
   const agents = getData("AGENTS",config.AGENTS);
 //let options = new URL("http://localhost:3000/")
  
   const options={
       host:"localhost",
       method:"GET",
       port: 3000,
       path:'/',
       connection: 'keep-alive',
       'cache-control': 'max-age=0',
       'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
       'sec-ch-ua-mobile': '?0',
       'upgrade-insecure-requests': '1',
       'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
       accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',      
       'sec-fetch-site': 'none',
       'sec-fetch-mode': 'navigate',
       'sec-fetch-user': '?1',
       'sec-fetch-dest': 'document',
       'accept-encoding': 'gzip, deflate, br',
       'accept-language': 'en-US,en;q=0.9', 
   }
   request.get('http://localhost:3000/', {forever: true, headers:{"user-agent": agents[0]}}, function (err, res, body) {
      
   });
})()