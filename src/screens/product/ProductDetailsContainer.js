import React, {Component} from 'react';
//import { connect } from "react-redux";
// import {
//   getSimalProducts,
//   getProductsSizes,
//   getProductsColors,
// } from '../../actions/Products/ProductActions';
// import {addItemToCart} from '../../actions/Cart/CartAction';
//import { Toast } from "../../container/common/Toast";
//import { productData } from "../../data/productData";
import ProductDetailsNew from './components/ProductDetailsNew';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNavItem: 'overview',
      sliderValue: 0.25,
      sizeModal: false,
      activeSize: -1,
      colorModal: false,
      activeColor: -1,
      quantityModal: false,
      productData: this.props.route.params.item,
      mainPhoto: '',
      selectedSize: '',
      selectedColor: '',
      selectedQuantity: 1,
      quantity: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.cartItems !== this.props.cartItems &&
      !this.props.addDeleteCartItemLoading
    ) {
      this.props.navigation.navigate('ShoppingCartContainer');
    }
  }

  componentDidMount() {
    //this.getSimilarProducts(this.state.productData._id);
    //this.getProductSize(this.state.productData._id);
    this.setState({
      mainPhoto: {uri: this.state.productData.prdct_attributes.media[0].url},
    });
  }

  getSimilarProducts = id => {
    //this.props.getSimalProducts(id);
  };

  getProductSize = id => {
    //this.props.getProductsSizes(this.state.productData._id);
  };

  setActiveNavItem = item => {
    this.setState({
      activeNavItem: item,
    });
  };

  setSizeModal = val => {
    this.setState({
      sizeModal: val,
    });
  };

  setActiveSize = val => {
    this.setState({
      activeSize: val,
    });
  };

  setColorModal = val => {
    this.setState({
      colorModal: val,
    });
  };

  setQuantityModal = val => {
    this.setState({
      quantityModal: val,
    });
  };

  setActiveColor = val => {
    this.setState({
      activeColor: val,
    });
  };

  images = [
    {id: '0', img: require('../../assets/images/img1.png')},
    {id: '1', img: require('../../assets/images/img11.png')},
    {id: '2', img: require('../../assets/images/img1.png')},
  ];

  sizes = [
    {id: '1', label: '1'},
    {id: '2', label: '2'},
    {id: '3', label: '3'},
    {id: '4', label: '4'},
    {id: '5', label: '5'},
    {id: '6', label: '6'},
    {id: '7', label: '7'},
  ];

  colors = [
    {id: '1', color: '#015DD3'},
    {id: '2', color: '#01D3BA'},
    {id: '3', color: '#C5FF7B'},
    {id: '4', color: '#FDF28D'},
    {id: '5', color: '#FBB040'},
    {id: '6', color: '#EE2E2D'},
    {id: '7', color: '#FBB040'},
  ];

  viewSubCaterogy = (subcategoryId, headerName) => {
    this.props.navigation.navigate('SubCategoryContainer', {
      headerName: headerName,
      subcategoryId: subcategoryId,
    });
  };

  viewProduct = product => {
    this.setState({productData: product});
    //this.getSimilarProducts(product._id);
    //this.setState({mainPhoto: {uri: product.prdct_attributes.media[0].url}});
  };

  onclickImage = imageurl => {
    this.setState({mainPhoto: {uri: imageurl}});
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  buySample = () => {
    let totalAmount =
      this.state.productData.prdct_attributes.dsct_price *
      this.state.productData.prdct_attributes.min_order_quantity;
    this.props.addItemToCart(
      this.state.productData._id,
      totalAmount,
      this.state.productData.prdct_attributes.min_order_quantity,
    );
  };

  addToCart = () => {
    if (this.state.selectedSize) {
      let totalAmount =
        this.state.productData.prdct_attributes.dsct_price *
        this.state.quantity;
      this.props.addItemToCart(
        this.state.productData._id,
        totalAmount,
        this.state.quantity,
      );
    } else {
      this.setSizeModal(true);
    }
  };

  onClickSize = index => {
    this.setActiveSize(index);
    this.setState({selectedSize: this.props.productSize[index]});
    //this.props.getProductsColors(this.props.productSize[index]._id);
    setTimeout(() => {
      this.setSizeModal(false);
    }, 1000);
    setTimeout(() => {
      this.setColorModal(true);
    }, 1000);
  };

  onClickColor = index => {
    this.setActiveColor(index);
    this.setState({selectedColor: this.props.productColor[index]});
    setTimeout(() => {
      this.setColorModal(false);
    }, 1000);
    setTimeout(() => {
      this.setQuantityModal(true);
    }, 1000);
  };

  setSelectedQuantity = val => {
    this.setState({selectedQuantity: val});
  };

  onClickSubmit = () => {
    this.setState({
      quantity: this.state.selectedQuantity,
      quantityModal: false,
    });
  };
  //this.props.similarProducts.slice(0, 10)
  render() {
    return (
      <ProductDetailsNew
        images={this.images}
        activeNavItem={this.state.activeNavItem}
        setActiveNavItem={item => this.setActiveNavItem(item)}
        productData={[]}
        product={this.state.productData}
        viewSubCaterogy={(subcategoryId, headerName) =>
          this.viewSubCaterogy(subcategoryId, headerName)
        }
        goBack={this.goBack}
        sliderValue={this.state.sliderValue}
        sizes={this.sizes}
        activeSize={this.state.activeSize}
        setActiveSize={val => this.setActiveSize(val)}
        sizeModal={this.state.sizeModal}
        setSizeModal={val => this.setSizeModal(val)}
        colors={this.colors}
        colorModal={this.state.colorModal}
        setColorModal={val => this.setColorModal(val)}
        activeColor={this.state.activeColor}
        setActiveColor={val => this.setActiveColor(val)}
        quantityModal={this.state.quantityModal}
        setQuantityModal={val => this.setQuantityModal(val)}
        viewProduct={productData => this.viewProduct(productData)}
        onclickImage={imageurl => this.onclickImage(imageurl)}
        similarProductsLoading={this.props.similarProductsLoading}
        mainPhoto={this.state.mainPhoto}
        buySample={this.buySample}
        loading={this.props.addDeleteCartItemLoading}
        productSize={this.props.productSize}
        addToCart={this.addToCart}
        onClickSize={index => this.onClickSize(index)}
        productColor={this.props.productColor}
        onClickColor={index => this.onClickColor(index)}
        selectedQuantity={this.state.selectedQuantity}
        setSelectedQuantity={val => this.setSelectedQuantity(val)}
        onClickSubmit={this.onClickSubmit}
        quantity={this.state.quantity}
        navigation={this.props.navigation}
      />
    );
  }
}
function mapStatetoProps(state) {
  return {
    similarProducts: state.ProductReducer.similarProducts,
    similarProductsLoading: state.ProductReducer.similarProductsLoading,
    addDeleteCartItemLoading: state.CartReducer.addDeleteCartItemLoading,
    cartItems: state.CartReducer.cartItems,
    productSize: state.ProductReducer.productSize,
    productColor: state.ProductReducer.productColor,
  };
}

// const ProductDetailsContainer = connect(mapStatetoProps, {
//   getSimalProducts,
//   addItemToCart,
//   getProductsSizes,
//   getProductsColors,
// })(ProductDetails);

export default ProductDetails;
