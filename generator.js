const request = require('request')
const config = require('./config')
const { delay, initialize } = require("./lib/utils");
const { readAgents, getData, fetchProxies, readProxies } = require("./lib/fileOperations");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
( ()=>{ 
    // initialize proxies 
   initialize(); 
   const proxies = getData("PROXY",config.PROXY); 
   const agents = getData("AGENTS",config.AGENTS);
 //let options = new URL("http://localhost:3000/")  

 const options={
 
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
let proxy_counter =0;
  for(let visited = 0; visited < 2; visited++){
    try{
      console.log(`http://${proxies[proxy_counter++]}`);
     request.get(config.url, {forever: true, headers:options, proxy:`http://${proxies[proxy_counter++]}`}, function (err, res, body) {
      console.error(err); 
      console.log(res?.body);   
      if(!err & res?.body){
        // visited++;
      }
     }); 
    }catch{

    }
  
  }

  
  //  request.get('https://nohax.club/visitor.html', {forever: true, headers:options, proxy:"http://51.195.91.5:8080"}, function (err, res, body) {
  //   console.error(err); 
  //   console.log(res?.body);   
  //  }); 
})()