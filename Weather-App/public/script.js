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


function displayData(obj){
  const tempvaluecont = document.getElementById('tempvaluecont');
  tempvaluecont.textContent = obj.temperature;

  const windvaluecont = document.getElementById('windvaluecont');
  windvaluecont.textContent = obj.wind;

}


const searchbtn = document.getElementById('searchbtn');
searchbtn.addEventListener('click' , ()=>{
  const searchinputcont = document.getElementById('searchinput');
  const inputtext = searchinputcont.value;
  
  const cityname = document.getElementById('cityname');
  cityname.textContent = inputtext

  fetchWeather(inputtext).then((data)=>{
    console.log(data);
    displayData(data);
  })
  searchinputcont.value = "";

})