import React, { Component } from "react";
import Rating from "./rating";

class GridCategory extends Component {
  render() {
    return (
      <div
        className="col-lg-3 col-md-3"
        style={{
          height: 24 + "vw",
          background: "white",
          margin: "2.5vw"
        }}
      >
        <div
          className="row d-flex align-items-center justify-content-center"
          style={{ height: 70 + "%", background: "white" }}
        />
        <div
          className="row d-flex align-items-center justify-content-center"
          style={{
            height: 30 + "%",
            background: this.props.background,
            cursor: "pointer",
            color: this.props.color || "white"
          }}
          onClick={this.props.onDetailClick}
        >
          <div className="col">
            <div className="row justify-content-center ">
              <h3>{this.props.product}</h3>
            </div>
            <div className="row justify-content-center ">
              <h3 style={{ pointerEvents: "none" }}>
                <Rating
                  starCount={this.props.rating}
                  fontSize="1vw"
                  color="white"
                />
              </h3>
            </div>
            <div className="row justify-content-center ">
              <h2>
                Rp.
                {this.props.harga}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GridCategory;
