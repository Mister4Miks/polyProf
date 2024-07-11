import React from "react";
import ImagePath from "../img/crossTwo.png";
function Warning(props) {
  if (!props.warn) {
    return null;
  }
  return (
    <div className="header-navbar-phone">
      <img src={ImagePath} alt="" className="cross" onClick={props.HeadFun} />
      <nav>
        <ul>
          <li>Trade</li>
          <li>P2P</li>
          <li>Partners</li>
          <li>Mining</li>
          <li>Academy</li>
        </ul>
      </nav>
      <hr />
      <div>
        <button id="register">Register</button>
        <button id="log-in">Log in</button>
      </div>
      <input type="search" placeholder="Search" />
    </div>
  );
}

class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      warn: false,
    };
  }

  blockScroll = () => {
    document.body.classList.add("no-scroll");
  };

  removeScroll = () => {
    document.body.classList.remove("no-scroll");
  };

  HeadFun = () => {
    this.setState(
      {
        warn: !this.state.warn,
      },
      () => {
        if (this.state.warn) {
          this.blockScroll();
        } else {
          this.removeScroll();
        }
      }
    );
  };

  render() {
    return (
      <>
        <Warning warn={this.state.warn} HeadFun={this.HeadFun} />
        <label className="burger" onClick={this.HeadFun}>
          <span onClick={this.HeadFun}></span>
          <span onClick={this.HeadFun}></span>
          <span onClick={this.HeadFun}></span>
        </label>
      </>
    );
  }
}

export default Head;
