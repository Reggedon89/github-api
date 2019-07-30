import React, { useState, useEffect } from "react";
import axios from "axios";
import "normalize.css/normalize.css";
import "../styles/App.css";
import MaterialIcons from "material-icons-react";
import Moment from "moment";

export default function Profile(props) {
  const [uname, setUname] = useState("");
  const [photo, setPhoto] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [repo, setRepo] = useState([]); // Important to us[] since object is an array
  const [location, setLocation] = useState("");

  useEffect(() => {
    axios.get("https://api.github.com/users/Reggedon89").then(resp => {
      setUname(resp.data.name);
      setPhoto(resp.data.avatar_url);
      setUsername(resp.data.login);
      setBio(resp.data.bio);
      setLocation(resp.data.location);
    });

    axios.get("https://api.github.com/users/Reggedon89/repos").then(resp => {
      console.log(resp.data);
      setRepo(resp.data);
    });
  }, []);

  return (
    <div id="container">
      <aside className="userprofile">
        <img src={photo} alt="handsome guy" />
        <h1>{uname}</h1>
        <h2>{username}</h2>
        <p>{bio}</p>
        <h3>
          <MaterialIcons icon="location_on" />
          {location}
        </h3>
      </aside>

      <main className="repolist">
        <h1>My Repositories</h1>
        <div>
          {repo.map(obj => (
            <div key={obj.name} className="list">
              <h2>{obj.name} </h2>
              <div id="specs">
                <div id="left">
                  <h4>{obj.language}</h4>
                  <p>
                    created{" "}
                    {Moment(obj.created_at)
                      .startOf("day")
                      .fromNow()}
                  </p>
                </div>
                <div id="right">
                  <button>
                    <MaterialIcons icon="star" />
                    Star
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// export default Profile;
