import React, { Component } from "react";
import axios from "axios";
import { API_URL_AGRISTORE } from "../supports/apiurl/apiurl";

class Products extends Component {
  state = { productList: [] };

  componentWillMount() {
    axios
      .post(API_URL_AGRISTORE + "/getproduct", { product: "cct" })
      .then(res => {
        this.setState({ productList: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    console.log(this.state.productList);
    return <div />;
  }
}

export default Products;
