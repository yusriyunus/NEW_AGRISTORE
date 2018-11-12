import React, { Component } from "react";
import axios from "axios";
import { FormGroup, CustomInput } from "reactstrap";
import { API_URL_AGRISTORE } from "../supports/apiurl/apiurl";
import ProductDetail from "./productDetail";

class Spices extends Component {
  state = {
    productList: [],
    editId: 0,
    lokasiPengirim: [
      "Jabodetabek",
      "Sumatera",
      "Kalimantan",
      "Sulawesi",
      "Papua"
    ],
    promosi: ["Gratis Ongkir", "COD"],
    lokasiPengirimOnClick: "",
    promosiOnClick: ""
  };

  componentWillMount() {
    this.getProduct();
  }

  getProduct = () => {
    axios
      .post(API_URL_AGRISTORE + "/getproduct", { product: "spices" })
      .then(res => {
        this.setState({ productList: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onEditClick = key => {
    this.setState({ editId: key });
  };

  onAddClick = () => {
    axios
      .post(API_URL_AGRISTORE + "/addproduct", {
        category: "spices",
        nama: this.refs.nama.value,
        price: this.refs.harga.value,
        stokAwal: this.refs.stokAwal.value,
        stokTersedia: this.refs.stokTersedia.value,
        lokasiPengirim: this.state.lokasiPengirimOnClick,
        promosi: this.state.promosiOnClick
      })
      .then(() => {
        alert("berhasil");
        this.getProduct();
        this.refs.nama.value = "";
        this.refs.stokAwal.value = "";
        this.refs.stokTersedia.value = "";
        this.refs.harga.value = "";
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };

  onUpdateClick = (refs, _id, lokasiPengirim, promosi) => {
    console.log(_id);
    axios
      .post(API_URL_AGRISTORE + "/updateproduct", {
        _id,
        category: "spices",
        nama: refs.nama.value,
        price: refs.harga.value,
        stokAwal: refs.stokAwal.value,
        stokTersedia: refs.stokTersedia.value,
        lokasiPengirim,
        promosi
      })
      .then(() => {
        this.getProduct();
        this.setState({ editId: 0 });
        alert("berhasil");
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };

  onDeleteClick = (_id, category) => {
    console.log(category, _id);
    axios
      .post(API_URL_AGRISTORE + "/deleteproduct", {
        _id,
        category
      })
      .then(() => {
        this.getProduct();
        this.setState({ editId: 0 });
        alert("berhasil");
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };

  renderList = () => {
    // if (this.state.productList.length > 0) {
    return this.state.productList.map((product, key) => {
      return (
        <ProductDetail
          product={{ ...product, nomor: key + 1 }}
          fnUpdate={this.onUpdateClick}
          fnEdit={this.onEditClick}
          fnDel={this.onDeleteClick}
          editId={this.state.editId}
        />
      );
    });
    // }
  };

  selectorOnClick = (selector, item) => {
    if (selector == "lokasi") {
      this.setState({ lokasiPengirimOnClick: item });
    } else {
      this.setState({ promosiOnClick: item });
    }
  };

  renderDikirimDari = () => {
    return this.state.lokasiPengirim.map((daerah, key) => {
      return (
        <option
          onClick={() => {
            this.selectorOnClick("lokasi", daerah);
          }}
        >
          {daerah}
        </option>
      );
    });
  };

  renderPromosi = () => {
    return this.state.promosi.map((promosi, key) => {
      return (
        <option
          onClick={() => {
            this.selectorOnClick("promosi", promosi);
          }}
        >
          {promosi}
        </option>
      );
    });
  };

  render() {
    console.log(this.state.productList);
    return (
      <div style={{ paddingTop: "100px" }} className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <div className="box-header" style={{ padding: "1vw 0" }}>
                <h3 className="box-title">TABLE SPICES LIST</h3>
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
                      <th>Image</th>
                      <th>Nama</th>
                      <th>Lokasi Pengirim</th>
                      <th>Promosi</th>
                      <th>Stok Awal</th>
                      <th>Stok Tersedia</th>
                      <th>Harga</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderList()}
                    <tr>
                      <td />
                      <td>
                        <input type="text" ref="title" defaultValue="" />
                      </td>
                      <td>
                        <input type="text" ref="nama" defaultValue="" />
                      </td>
                      <td>
                        <FormGroup>
                          <CustomInput
                            type="select"
                            id="exampleCustomSelect"
                            name="customSelect"
                            style={{
                              textAlign: "left"
                            }}
                          >
                            <option value="">--Select--</option>
                            {this.renderDikirimDari()}
                          </CustomInput>
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup>
                          <CustomInput
                            type="select"
                            id="exampleCustomSelect"
                            name="customSelect"
                            style={{
                              textAlign: "left"
                            }}
                          >
                            <option value="">--Select--</option>
                            {this.renderPromosi()}
                          </CustomInput>
                        </FormGroup>
                      </td>
                      <td>
                        <input type="number" ref="stokAwal" defaultValue="" />
                      </td>
                      <td>
                        <input
                          type="number"
                          ref="stokTersedia"
                          defaultValue=""
                        />
                      </td>
                      <td>
                        <input type="text" ref="harga" defaultValue="" />
                      </td>
                      <td>
                        <center>
                          <div
                            className="btn btn-success"
                            value="Add"
                            onClick={this.onAddClick}
                            style={{ width: "100%" }}
                          >
                            Add
                          </div>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Spices;
