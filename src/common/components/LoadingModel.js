import React, {Component} from 'react';
import {View} from 'react-native';
import {CirclesLoader} from 'react-native-indicator';
import Modal from 'react-native-modal';

class LoadingModel extends Component {
  render() {
    return (
      <Modal
        isVisible={this.props.loading}
        backdropOpacity={0.7}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <CirclesLoader color="#fff" dotRadius={13} size={50} />
        </View>
      </Modal>
    );
  }
}
export default LoadingModel;
