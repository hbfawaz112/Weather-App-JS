const api_key = "b530d4360d87c3c35b77cf87fe9887a5"

function fetch_data(city){
  
  //  alert("sss");
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    api_key).then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          document.getElementById("input-field").value="";
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) =>display_data(data));

}

function display_data(data){
    if(data===null){alert("Not Found");}
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed , deg } = data.wind;

      document.getElementById("city").innerHTML = "Wather in " + name;
      document.getElementById("temp").innerHTML = temp+"°C";
      document.getElementById("img_icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.getElementById("description").innerText = description;
      document.getElementById("humidity").innerHTML="<b>Humidity :</b> " +humidity + "%";
      document.getElementById("wind").innerHTML  = "<b>Wind speed : </b>" + speed + " km/h" + ", degree : " +  deg + "°";    

      document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  
      
        }

    

    function search(){
        var city_name = document.getElementById("input-field").value;
        fetch_data(city_name);
    }


    var mycurrentcity;

    function sucess(data){
        var apikey = '9b5c9591eca54f9288d100b0d7a29413';
  var latitude = data.coords.latitude;
  var longitude = data.coords.longitude;

  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + apikey
    + '&q=' + encodeURIComponent(latitude + ',' + longitude)
    + '&pretty=1'
    + '&no_annotations=1';

  // see full list of required and optional parameters:
  // https://opencagedata.com/api#forward

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status === 200){ 
      // Success!
      var data = JSON.parse(request.responseText);
       // print the location
    mycurrentcity=data.results[0].components.country;
        console.log(mycurrentcity);
        fetch_data(mycurrentcity);

    } else if (request.status <= 500){ 
      // We reached our target server, but it returned an error
                           
      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };

  
  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");        
  };

  request.send();  // make the request
    }

    navigator.geolocation.getCurrentPosition(sucess , console.error)


