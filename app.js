const express = require("express");
const app = express();
//**when using an api ,we need to connect to external node modules
//**but https is a native node module that helps to connect to api
//**http helps to make a request to api
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));

//** app.get --> when the browser tries to get in touch with our server "/"--> this means that when the browser tries to get in touch with our server,
//** it is redirected to home page of the website
//** function (request,response)--> means what happens when browser gets in touch with our server
//** request --> contains details abt the request made by the Server
//** response --> contains response that is sent to the browser eg:response.send("hello!"); (hello! gets displayed on the browser)
//** there can be multiple app.get methods eg: app.get("/contact",function(.....)) ,this means what happens when the browser wants to get in touch with contact page
app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");
  //**url of the api
  // const url="https://api.openweathermap.org/data/2.5/weather?q=London&appid=6df27dd455658fbb0b56309821c185fb&units=metric";
  //**http.get(url -- 1 st parameter )
  //**it goes to that url and sends a response
  // https.get(url,function(response){
  //   console.log(response.statusCode);
  //** to check the data sent by the url,this response.on is used
  //   response.on("data",function(data){
  //** jason.parse()  converts the data to jason format
  //     const weatherData=JSON.parse(data);
  //     const temp=weatherData.main.temp;
  //     const weatherDescription=weatherData.weather[0].description;
  //     const icon=weatherData.weather[0].icon;
  //     const imageURL=
  //     res.write("The weather condition  in London is " + weatherDescription + " ");
  //     res.write("<h1>The temperature in London is " + temp + " degree Celcius</h1>");
  //   })
  // })
});


app.post("/", function(req, res) {

  const querry = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + querry + "&appid=6df27dd455658fbb0b56309821c185fb&units=metric";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL =
        res.write("<p>The weather condition  in " + querry + " is " + weatherDescription + "<p> ");
      res.write("<h1>The temperature in " + querry + " is " + temp + " degree Celcius<h1>");
      res.send();
    })
  })
});

app.listen(3000, function() {
  console.log("Server is runnign on port 3000");
});
