import React, { Component } from "react";
import Button from "../Button/Button";
import { connect } from "react-redux";
import Preloader from "../../utils/Preloader";

import ModalArtOrder from "../ModalArtOrder/ModalArtOrder";
import { purchaseSubmitted } from "../../actions/purchase";

class PageShopList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isOrdered: false,
      selectedArtName: "",
      selectedArtPrice: ""
    };
  }

  handleOpenModal = item => {
    this.setState({
      isModalVisible: true,
      selectedArtName: item.name,
      selectedArtPrice: item.price
    });
  };

  onSubmitModal = (name, phone, email, address, item, price) => {
    this.props.purchaseSubmitted(name, email, phone, address, item, price);
    this.setState({
      isOrdered: true
    });
  };

  onCloseModal = () => {
    this.setState({
      isModalVisible: false,
      isOrdered: false
    });
  };

  render() {
    const { shop } = this.props;
    if (this.props.isLoading) {
      return <Preloader />;
    }

    return (
      <div className="page-shop-slider">
        {shop.map((item, key) => {
          return (
            <div className="page-shop-slider-element">
              <p className="header-shop-page-text">{item.name}</p>
              <ul>
                <li>
                  <div className="descr">
                    <div className="information-of-element">
                      <p>Size: {item.size}</p>
                      <p>Material: {item.material}</p>
                    </div>
                    <Button
                      className="shop-more-details"
                      buttonName={"BUY"}
                      onClick={() => {
                        this.handleOpenModal(item);
                      }}
                    />
                  </div>
                  <img
                    src={`http://the-format.com.ua${item.image}`}
                    alt="image"
                  />
                </li>
              </ul>
              <p className="element-price">Price: {item.price}</p>
            </div>
          );
        })}
        <ModalArtOrder
          visible={this.state.isModalVisible}
          isOrdered={this.state.isOrdered}
          onSubmit={this.onSubmitModal}
          onClose={this.onCloseModal}
          artName={this.state.selectedArtName}
          artPrice={this.state.selectedArtPrice}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    shop: state.shopData.data.shop,
    isLoading: state.shopData.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    purchaseSubmitted: (address, name, phone, email, item, price) => {
      dispatch(purchaseSubmitted(address, name, phone, email, item, price));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageShopList);
