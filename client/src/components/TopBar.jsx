import React, { Component } from "react";
import { Link } from "react-router-dom";

// const ferrari = require('../Content/icons/ferrari.png'); 

export default class TopBar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              
              {/* <i src = {ferrari}></i> */}
              {/* <i className="material-icons">code</i> */}
              MTMF
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
