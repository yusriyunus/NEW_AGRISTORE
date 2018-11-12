import React, { Component } from "react";
import { FormGroup, CustomInput } from "reactstrap";

class ProductDetail extends Component {
  state = {
    lokasiPengirim: [
      "Jabodetabek",
      "Sumatera",
      "Kalimantan",
      "Sulawesi",
      "Papua"
    ],
    promosi: ["Gratis Ongkir", "COD"],
    lokasiPengirimOnClick: this.props.product.lokasiPengirim || "",
    promosiOnClick: this.props.product.promosi || ""
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
    var {
      _id,
      category,
      nomor,
      nama,
      price,
      stokAwal,
      stokTersedia,
      lokasiPengirim,
      promosi
    } = this.props.product;
    console.log(category);
    if (promosi == "") {
      promosi = "Tidak Tersedia";
    }
    // return (
    if (this.props.editId !== nomor) {
      return (
        <tr>
          <td>{nomor}</td>
          <td>...</td>
          <td>{nama}</td>
          <td>{lokasiPengirim}</td>
          <td>{promosi}</td>
          <td>{stokAwal}</td>
          <td>{stokTersedia}</td>
          <td>
            Rp.
            {price}
          </td>
          <td
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <center>
              <div
                className="btn btn-primary"
                value="Edit"
                onClick={() => this.props.fnEdit(nomor)}
                style={{ width: "100%" }}
              >
                Edit
              </div>
            </center>
            <center>
              <div
                className="btn btn-danger"
                value="Delete"
                onClick={() => this.props.fnDel(_id, category)}
                style={{ width: "100%" }}
              >
                Delete
              </div>
            </center>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td>{nomor}</td>
        <td>
          <input type="text" ref="title" defaultValue="..." />
        </td>
        <td>
          <input type="text" ref="nama" defaultValue={nama} />
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
          <input type="number" ref="stokAwal" defaultValue={stokAwal} />
        </td>
        <td>
          <input type="number" ref="stokTersedia" defaultValue={stokTersedia} />
        </td>
        <td>
          <input type="text" ref="harga" defaultValue={price} />
        </td>
        <td
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <center>
            <div
              className="btn btn-primary"
              value="Update"
              onClick={() =>
                this.props.fnUpdate(
                  this.refs,
                  _id,
                  this.state.lokasiPengirimOnClick,
                  this.state.promosiOnClick
                )
              }
              style={{ width: "100%" }}
            >
              Update
            </div>
          </center>
          <center>
            <div
              className="btn btn-danger"
              value="Delete"
              onClick={() => this.props.fnDel(_id, category)}
              style={{ width: "100%" }}
            >
              Delete
            </div>
          </center>
        </td>
      </tr>
    );
    // );
  }
}

export default ProductDetail;
