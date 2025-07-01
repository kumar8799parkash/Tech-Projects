import express from 'express';
import fetch from 'node-fetch';
const port = 3000;
const App = express();

function fetchWeather(citytext) {
  const url = `https://goweather.xyz/weather/${citytext}`;
  /*
  const p = fetch(url)

  const p1 = p.then(function(response){          // response is actually response(status like:404(error) , 200-299 are good responses)
    return response.json();
  });

  const data = p1.then((data)=>{
    console.log(data);
    return data;
  })
 */

  return fetch(url).then(response=>{
    return response.json();
  }).then(data=>{
    return data;
  })
}

App.get('/', (req, res) => {
  res.send("Hello world");
})

App.get('/:slug', (req, res) => {
  const cityText = (req.params.slug);
  fetchWeather(cityText).then(data=>{
    console.log(data);
    res.send(data.temperature);
  });                         
})


App.listen(port, () => {
  console.log("App is listening at port : " + port);
})
