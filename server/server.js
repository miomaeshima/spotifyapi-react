require("dotenv").config();
const express = require("express"); // Express web server framework
const cors = require("cors");
const axios = require ("axios");
const qs = require("querystring");
const bodyParser = require("body-parser");
const client_id = process.env.SPOTIFY_CLIENT_ID; // app's client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // app's client secret
const redirect_uri = "http://localhost:8888/callback"; // redirect uri

const app = express();

app.use(express.static(__dirname + "/public")).use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//When user clicks on login app comes here
app.get("/login", function (req, res) {
  //scope of data to be shared with our app need to declared
  const scope =
    "user-read-private user-read-email user-read-currently-playing user-read-playback-state user-read-playback-position";

  //redirects the user to spotify authorization page
  //when user clicks agree button, app will receive a code and be redirected to "/callback"
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      qs.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
      })
  );
});

//Once redirected to /callback, app sends code and credentials to spotify to get token 
app.get("/callback", function (req, res) {

      const code = req.query.code || null;

      axios({
      method:'POST',
      url:"https://accounts.spotify.com/api/token", 
      data: qs.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirect_uri
      }),
      headers:{ 
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64")
      }
      }) 
      .then((response)=>{
        let access_token=response.data.access_token       
        
      //Pass the token to the browser to make requests for current playing from there
        res.redirect(
      // To redirect to the front end url (hardcoded in this case)
              "http://localhost:3000/#" +
               qs.stringify({
               access_token: access_token,
             })
        )
      })
      .catch(err=>{console.log(err.message)})});

//Receiving the current playing data from the browser 
app.post("/playing", (req, res) => {
  const body = req.body;
  console.log("now playing is . . . ")
  console.log(body);
});

console.log("Listening on 8888");
app.listen(8888);
