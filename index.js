const express = require('express');
const hbs = require('hbs');
const path = require('path')
const ipInfo = require("ip-info-finder");

const app = express();
app.use(express.static(path.join(__dirname, 'views')));

app.use(express.json()); // JSON-Daten parsen
app.use(express.urlencoded({ extended: true })); // URL-codierte Daten parsen


// Setze den Pfad für die Views-Dateien
app.set('views', path.join(__dirname, 'views'));
// Setze den View-Engine auf HBS
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/result', (req,res)=>{
    const ip = req.body.ipaddress;
    console.log(ip)
    ipInfo.getIPInfo(ip).then(data => {
        res.render('result', {
            ip: ip,
            City: data.City,
            Region: data.Region,
            Country: data.Country,
            Continent: data.Continent,
            Coordinates: data.Coordinates,
            Time: data.Time,
            Hostname: data.hostname,
            Provider: data.provider,
            Postalcode: data.postalCode,

            google: data.City,
        })
    })
    .catch(err => {
        res.render('home')
    });
})


app.listen(3000, function(err){
    if(err){
        console.log(err)
    } else {
        console.log('Server is running on 3000')
    }
})