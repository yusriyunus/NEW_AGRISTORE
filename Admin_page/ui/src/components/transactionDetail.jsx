import React, { Component } from "react";

class TransactionDetail extends Component {
  render() {
    var {
      nomor,
      userName,
      productName,
      harga,
      jumlah,
      totalPrice,
      alamat,
      kurir,
      tanggal,
      waktu
    } = this.props.transaction;
    return (
      <tr>
        <td>{nomor}</td>
        <td>{userName}</td>
        <td>{productName}</td>
        <td>Rp.{harga}</td>
        <td>{jumlah}</td>
        <td>Rp.{totalPrice}</td>
        <td>{alamat}</td>
        <td>{kurir}</td>
        <td>{tanggal}</td>
        <td>{waktu}</td>
      </tr>
    );
  }
}

export default TransactionDetail;
