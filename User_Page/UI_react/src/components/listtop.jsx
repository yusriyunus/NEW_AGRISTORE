import React, { Component } from "react";
import GridCategory from "./gridcategory";
import Sidebar from "./sidebar";

class Toplist extends Component {
  state = {
    sidebarProp: {
      title: "TOP PRODUCTS",
      detail: "",
      color: "orange",
      font: "white"
    },
    gridProp: {
      color: "rgba(255,165,0,0.7)"
    },
    displayDetail: "none"
  };

  onDetailClick = () => {
    this.setState({
      displayDetail: "flex"
    });
  };

  onCloseClick = () => {
    this.setState({
      displayDetail: "none"
    });
  };

  render() {
    // const { Default } = this.props.margin;
    return (
      <div className="sliderPage">
        <div className="row" style={{ margin: 0 }}>
          <Sidebar
            sidebarProp={this.state.sidebarProp}
            display={this.state.displayDetail}
            onCloseClick={this.onCloseClick}
          />
          <div
            className="col-lg-9"
            style={{
              padding: 0,
              margin: 0,
              background: "aliceblue",
              height: 100 + "%"
            }}
          >
            <div style={{ position: "sticky", top: "5vw", zIndex: "2" }}>
              <div
                className="row justify-content-center"
                style={{ padding: "0", marginTop: "-10px" }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{
                    color: "black",
                    background: this.state.gridProp.color,
                    padding: "2px 10px",
                    borderRadius: "10px",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    this.props.pageOnSliding(-400, -100);
                    this.props.changeUrl("home");
                  }}
                >
                  <h3 className="glyphicon glyphicon-th" />
                  <h4 style={{ display: "inline", padding: "0 10px" }}>
                    Product Categories
                  </h4>
                  <h5 className="glyphicon glyphicon-share-alt" />
                </div>
              </div>
            </div>
            <div
              className="row justify-content-center"
              style={{ margin: "0 10px" }}
            >
              <GridCategory
                background={this.state.gridProp.color}
                onDetailClick={this.onDetailClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Toplist;
