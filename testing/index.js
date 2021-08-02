/* eslint-disable no-console */
const express = require('express')
const geoip = require('geoip-lite');
const {firebase} = require('./firebase');

const app = express()
const port = 3000
const database = firebase.database();
const visitorRef = database.ref("visitor")



app.get('/', (req, res) => {
 console.log(req.headers)

visitorRef.once('value')
.then((snapshot) => {
    const array = snapshot?.val();
    console.log(array)
    let currentVisited = array[array.length-1].visited;
  //  const geo = geoip.lookup(req.ip);
    let data = {
        visited: ++currentVisited,
        headers: JSON.stringify(req.headers),
        ip: JSON.stringify(req.ip),
       lookup: geo,
        browser: req.headers["user-agent"] || "NA"
    }
    database.ref(`visitor/${++currentVisited}`).set(data,(errors)=>{
        if(errors){
          console.log("whoppps something went wrong");
        }else{
            res.send(`<h1>Current visitors count is ${currentVisited}</h1>`);
        }
    });
}).catch(err=>console.log(err))


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})