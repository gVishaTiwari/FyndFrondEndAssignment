import React, { useState } from "react";

const About = () => {
  const [buttonLink, setButtonLink] = useState("");
  const styleAbout = {
    fontSize: "20px",
  };

  const styleName = {
    fontFamily: "Dancing Script",
    fontSize: "30px",
    fontWeight: "bold",
  };

  const githubClick = () => {
    setButtonLink("https://github.com/gVishaTiwari");
  };

 

  return (
    <>
      <div className="row" style={{ height: "75px" }} />
      <div className="row" style={styleAbout}>
        <div className="col s0 m3"> </div>
        <div className="col s12 m6">
          <div className="card grey lighten-3 hoverable">
            <div className="card-content black-text">
              <span className="card-title">
                {" "}
                <i className="material-icons red-text">favorite</i>
              </span>
              <p>App Version 1.0.0</p>
              <p>
                Built by{" "}
                <span style={styleName} className="red-text">
                  Vishal Tiwari
                </span>{" "}
                <i className="tiny material-icons">copyright</i> 2022
              </p>
            </div>
            <div className="card-action">
              <form action={buttonLink} target="_blank">
                <button
                  className="btn waves-effect waves-light brown darken-1"
                  style={{ marginRight: "10px" }}
                  onClick={githubClick}
                >
                  Github
                  <i className="small material-icons left">code</i>
                </button>

               
              </form>
            </div>
          </div>
        </div>
        <div className="col s0 m3"> </div>
      </div>
    </>
  );
};

export default About;
