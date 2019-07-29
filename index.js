const express = require('express');

const app = express();
const fetch = require('node-fetch');
const  cors = require('cors')
const request = require('request')

app.use(cors())

app.get('/api/altitudeangel', (req, res) => {

var options = {
  url: 'https://api.altitudeangel.com/v2/mapdata/geojson?n=51.46227963315035&e=-0.9569686575500782&s=51.450125805383585&w=-0.9857433958618458',
  headers: {
    'Authorization': 'X-AA-ApiKey lxyJRuFoB6mYIJzV5Jybs8gZsiKzKlZSYdYr5U9V0',
  }
};

 request(options, callback);

 function callback(error, response, body) {

  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    //console.log(info.features)
    let smallerArr = []

    for (let i = 0; i < 3; i++) {
      smallerArr.push(info.features[i])      
    }

    res.json(smallerArr);
  }
}


});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);