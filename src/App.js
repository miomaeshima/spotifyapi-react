import "./App.css";

const App = () => {
  //function to get hashparams, which contains access_token
  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    //eslint-disable-next-line
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  var params = getHashParams();

  //obtain access token from the hashparam
  var access_token = params.access_token;

  //let token = false;
  
  const getUri = () => {
    if(access_token){
    console.log(access_token);
    fetch("https://api.spotify.com/v1/me/player?additional_types=episode", {
      headers: { Authorization: "Bearer " + access_token },
    })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      const body = { uri: data.item.uri };
      console.log(body);
      
      fetch("http://localhost:8888/playing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    });
  } else {
    //token = false;
  }}

  return (
    <div>
      <div>
        <h3>Login with Spotify</h3>
        <button>
          <a href="http://localhost:8888/login">Log in with Spotify</a>
        </button>
      </div>

      <div>
        <h3>Once logged in, you can send uri of current playing to server<br></br>
        (See it on the server terminal)<br></br>
        You can also see <br>
        </br>(1) access token used and <br></br>(2) uri in the develper's console.</h3>
        <button onClick={getUri} id="obtain-current-song">Obtain the current song</button>
      </div>
    </div>
  );
}

export default App;
