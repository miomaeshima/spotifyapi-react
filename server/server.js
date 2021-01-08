require("dotenv").config();
const express = require("express"); // Express web server framework
const request = require("request"); // "Request" library
const cors = require("cors");
const axios = require ("axios");
const querystring = require("querystring");
const bodyParser = require("body-parser");
const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirect_uri = "http://localhost:8888/callback"; // Your redirect uri

const app = express();

app.use(express.static(__dirname + "/public")).use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/login", function (req, res) {
  // your application requests authorization
  const scope =
    "user-read-private user-read-email user-read-currently-playing user-read-playback-state user-read-playback-position";
  //going to ask spotify to authorize and give response to callback url below
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
      })
  );
});

//app.get("/callback") below automatically start receiving auth from spotify.
//makes requests access token
app.get("/callback", function (req, res) {

  var code = req.query.code || null;

//requestの場合
  // var authOptions = {
  //   url: "https://accounts.spotify.com/api/token",
  //   form: {
  //     code: code,
  //     redirect_uri: redirect_uri,
  //     grant_type: "authorization_code",
  //   },
  //   headers: {
  //     Authorization:
  //       "Basic " +
  //       Buffer.from(client_id + ":" + client_secret).toString("base64"),
  //   },
  //   json: true,
  // };
  // request.post(authOptions, function (error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     let access_token = body.access_token;
  //   //

    axios.post("https://accounts.spotify.com/api/token",{
    headers: {
        Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    body:{
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
    }
    })
    .then((res)=>{
    let access_token=res.body.access_token
    console.log(access_token)
    res.redirect(
      "http://localhost:3000/#" +
      //"/#" +
        querystring.stringify({
          access_token: access_token,
        })
    )})});
        //axios end


//Pass the token to the browser to make requests for current playing from there
//         res.redirect(
//         "http://localhost:3000/#" +
//         //"/#" +
//           querystring.stringify({
//             access_token: access_token,
//           })
//       );
//     } else {
//       res.redirect(
//         "http://localhost:3000/#"+
//         //"/#" +
//           querystring.stringify({
//             error: "invalid_token",
//           })
//       );
//     }
//   });
// });

//Here the current playing data the browser posts is received. 
app.post("/playing", (req, res) => {
  const body = req.body;
  console.log("now playing is . . . ")
  console.log(body);
});

console.log("Listening on 8888");
app.listen(8888);
