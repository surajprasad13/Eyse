import React from "react";
import ProductDetailsNew from "./components/ProductDetailsNew";

const ProductScreen = ({ navigation }) => {
  return (
    <>
      <ProductDetailsNew
        activeNavItem={this.state.activeNavItem}
        setActiveNavItem={(item) => this.setActiveNavItem(item)}
        productData={this.props.similarProducts.slice(0, 10)}
        product={this.state.productData}
        viewSubCaterogy={(subcategoryId, headerName) =>
          this.viewSubCaterogy(subcategoryId, headerName)
        }
        goBack={this.goBack}
        sliderValue={this.state.sliderValue}
        sizes={this.sizes}
        activeSize={this.state.activeSize}
        setActiveSize={(val) => this.setActiveSize(val)}
        sizeModal={this.state.sizeModal}
        setSizeModal={(val) => this.setSizeModal(val)}
        colors={this.colors}
        colorModal={this.state.colorModal}
        setColorModal={(val) => this.setColorModal(val)}
        activeColor={this.state.activeColor}
        setActiveColor={(val) => this.setActiveColor(val)}
        quantityModal={this.state.quantityModal}
        setQuantityModal={(val) => this.setQuantityModal(val)}
        viewProduct={(productData) => this.viewProduct(productData)}
        onclickImage={(imageurl) => this.onclickImage(imageurl)}
        similarProductsLoading={this.props.similarProductsLoading}
        mainPhoto={this.state.mainPhoto}
        buySample={this.buySample}
        loading={this.props.addDeleteCartItemLoading}
        productSize={this.props.productSize}
        addToCart={this.addToCart}
        //onClickSize={index => this.onClickSize(index)}
        productColor={this.props.productColor}
        onClickColor={(index) => this.onClickColor(index)}
        selectedQuantity={this.state.selectedQuantity}
        setSelectedQuantity={(val) => this.setSelectedQuantity(val)}
        onClickSubmit={this.onClickSubmit}
        quantity={this.state.quantity}
        navigation={this.props.navigation}
      />
    </>
  );
};

export default ProductScreen;
