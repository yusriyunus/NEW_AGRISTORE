import React, { Component } from "react";
import axios from "axios";
import { API_URL_AGRISTORE } from "../supports/apiurl/apiurl";
import TransactionDetail from "./transactionDetail";

class Transactions extends Component {
  state = {
    transactionsList: []
  };

  componentWillMount() {
    alert("transactions");
    axios
      .get(API_URL_AGRISTORE + "/gettransaction")
      .then(res => {
        this.setState({ transactionsList: res.data });
      })
      .catch(err => {
        alert("gagal");
        console.log(err);
      });
  }

  renderList = () => {
    return this.state.transactionsList.map((transaction, key) => {
      return (
        <TransactionDetail transaction={{ ...transaction, nomor: key + 1 }} />
      );
    });
  };

  render() {
    return (
      <div style={{ paddingTop: "100px" }} className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <div className="box-header" style={{ padding: "1vw 0" }}>
                <h3 className="box-title">TABLE TRANSACTIONS LIST</h3>
              </div>
              <div className="box-body">
                <table
                  id="example2"
                  className="table table-bordered table-hover"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>User Name</th>
                      <th>Product Name</th>
                      <th>Harga Satuan</th>
                      <th>Jumlah</th>
                      <th>Total Harga</th>
                      <th>Alamat</th>
                      <th>Kurir</th>
                      <th>Tanggal</th>
                      <th>Waktu</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderList()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Transactions;
