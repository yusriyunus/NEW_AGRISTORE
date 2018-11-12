import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";
import queryString from "query-string";
import { categoryOnClick } from "../actioncreators/index";
import Productscategory from "./productscategory";
import CCTlist from "./listCCT";
import Vegetablelist from "./listvegetable";
import Fruitlist from "./listfruit";
import Spicelist from "./listspice";
import Toplist from "./listtop";
import Hotlist from "./listhot";
import Grandpa from "./pics/home1(2).jpeg";
import Granddaughter from "./pics/model(3).jpeg";

const items = [
  {
    src: Grandpa
  },
  {
    src: Granddaughter
  }
];

class Example extends Component {
  state = {
    activeIndex: 0,
    cct: [],
    fruits: [],
    vegetables: [],
    spices: [],
    pageOnSliding: {
      cct: () => {
        alert("cct");
        return this.props.pageOnSliding(0, 0);
      },
      vegetables: () => {
        return this.props.pageOnSliding(-100, 0);
      },
      fruits: () => {
        return this.props.pageOnSliding(-200, 0);
      },
      spices: () => {
        return this.props.pageOnSliding(-300, 0);
      },
      home: () => {
        return this.props.pageOnSliding(-400, -100);
      }
    }
  };

  search = queryString.parse(this.props.location.search);
  params = new URLSearchParams(this.search);
  idProductUrl = this.params.get("idProduct");

  componentWillMount() {
    // return the same page after refresh and get API
    const category = this.params.get("product");
    const searchProduct = this.params.get("search");

    if (searchProduct !== null) {
      this.state.pageOnSliding[`${category}`]();
      this.props.categoryOnClick(category, searchProduct);
    } else {
      this.props.categoryOnClick(category);
    }
  }

  componentWillReceiveProps(newProps) {
    const params = queryString.parse(this.props.location.search);
    if (newProps.margin !== this.props.margin) {
      document.getElementById("slider").style.transition = "margin-top .6s";
    }
    if (
      newProps.products !== this.props.products &&
      newProps.products.searchClick
    ) {
      const { cct, vegetables, fruits, spices } = newProps.products;
      this.setState({ cct, vegetables, fruits, spices });
      // alert(params.product + "true");
    }
    if (
      newProps.products !== this.props.products &&
      !newProps.products.searchClick
    ) {
      const { cct, vegetables, fruits, spices } = newProps.products;
      this.setState({ cct, vegetables, fruits, spices });
      // alert(params.product + "false");
    }
  }

  // CAROUSEL FUNCTION //
  onExiting = () => {
    this.animating = true;
  };
  onExited = () => {
    this.animating = false;
  };
  next = () => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };
  previous = () => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };
  ////////////////////////////////

  changeUrl = category => {
    this.props.history.push(`/?product=${category}`);
  };

  render() {
    console.log(this.props.location.search.product, "home");
    const { activeIndex } = this.state;
    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img
            src={item.src}
            alt={item.altText}
            style={{ width: 92 + "vw", height: 45 + "vw", marginLeft: "4vw" }}
          />
        </CarouselItem>
      );
    });

    return (
      <div style={{ marginBottom: "2.5vw" }}>
        <div
          style={{
            marginTop: "5vw"
          }}
        >
          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
            ride="carousel"
            pause={false}
            interval="6000"
          >
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={this.previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={this.next}
            />
          </Carousel>
        </div>
        <div
          id="slider"
          style={{
            marginLeft: this.props.margin.marginLeft,
            marginTop: this.props.margin.marginTop
          }}
        >
          <div>
            <CCTlist
              pageOnSliding={this.props.pageOnSliding}
              productList={this.state.cct}
              changeUrl={this.changeUrl}
              queryIdProduct={this.idProductUrl}
            />
          </div>
          <div>
            <Vegetablelist
              pageOnSliding={this.props.pageOnSliding}
              productList={this.state.vegetables}
              changeUrl={this.changeUrl}
            />
          </div>
          <div>
            <Fruitlist
              pageOnSliding={this.props.pageOnSliding}
              productList={this.state.fruits}
              changeUrl={this.changeUrl}
            />
          </div>
          <div>
            <Spicelist
              pageOnSliding={this.props.pageOnSliding}
              productList={this.state.spices}
              changeUrl={this.changeUrl}
            />
          </div>
          <div>
            <Productscategory
              pageOnSliding={this.props.pageOnSliding}
              changeUrl={this.changeUrl}
            />
          </div>
          <div>
            <Toplist pageOnSliding={this.props.pageOnSliding} />
          </div>
          <div>
            <Hotlist pageOnSliding={this.props.pageOnSliding} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = globalState => {
  const products = globalState.products;
  return { products };
};

export default connect(
  mapStateToProps,
  { categoryOnClick }
)(Example);
