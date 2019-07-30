import React, { useState, useEffect } from "react";
import axios from "axios";
import "normalize.css/normalize.css";
import "../styles/App.css";
import MaterialIcons from "material-icons-react";
import Moment from "moment";

export default function App(props) {
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
      {/* <header className="header">
        <div className="logo" />
        <form>
          <input type="text" placeholder="Search or jump to..." />
        </form>
        <ul className="requests">
          <li>Pull Requests</li>
          <li>Issues</li>
          <li>Marketplace</li>
          <li>Explore</li>
        </ul>
        <ul className="additional">
          <li>bell</li>
          <li>plus</li>
          <li>profile</li>
        </ul>
      </header> */}

      <aside className="userprofile">
        <img src={photo} alt="handsome guy" />
        <h1>{uname}</h1>
        <h2>{username}</h2>
        <p>{bio}</p>
        <h3>
          <MaterialIcons icon="location_on" />
          {location}
        </h3>
        <button>
          <span>Edit Profile</span>
        </button>
      </aside>

      <main className="repolist">
        <div className="options">
          <ul>
            <li>Overview</li>
            <li>Repositories</li>
            <li>Projects</li>
            <li>Stars</li>
            <li>Followers</li>
            <li>Following</li>
          </ul>
        </div>
        <div className="searchBar">
          <form>
            <input type="text" placeholder="Find a repository.." />
            <select>
              <option defaultValue>Type:All</option>
              <option>Public</option>
              <option>Private</option>
            </select>
            <select>
              <option defaultValue>Launguage:All</option>
              <option>English</option>
              <option>Spanish</option>
              <option>German</option>
              <option>Whatever</option>
            </select>
            <button>New</button>
          </form>
        </div>
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
