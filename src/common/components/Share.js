import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {typography} from '../typography';

// icons
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('screen');
const ShareAlert = ({status}) => {
  const [packageSearch, setPackageSearch] = useState('');
  const [recipient, setRecipient] = useState('');
  const [result, setResult] = useState('');
  const [open, setOpen] = useState(status);

  React.useEffect(() => {
    setOpen(status);
  }, [status]);

  function getErrorString(error, defaultValue) {
    let e = defaultValue || 'Something went wrong. Please try again';
    if (typeof error === 'string') {
      e = error;
    } else if (error && error.message) {
      e = error.message;
    } else if (error && error.props) {
      e = error.props;
    }
    return e;
  }

  return (
    <Modal visible={open} transparent={true}>
      <TouchableOpacity
        onPress={() => setOpen(false)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: height,
          width: width,
        }}>
        <View style={{...styles.container, width: width, padding: 20}}>
          <View style={styles.optionsRow}>
            <View style={styles.Option}>
              <Entypo name={'facebook'} color={'blue'} size={40} />
              <Text style={styles.shareText}>Share on Facebook</Text>
            </View>
            <View style={styles.Option}>
              <Entypo name={'instagram'} color={'magenta'} size={40} />
              <Text style={styles.shareText}>Share on Instagram</Text>
            </View>
            <View style={styles.Option}>
              <Entypo name={'linkedin'} color={'blue'} size={40} />
              <Text style={styles.shareText}>Share on LinkedIn</Text>
            </View>
            <View style={styles.Option}>
              <FontAwesome name={'whatsapp'} color={'lightgreen'} size={40} />
              <Text style={styles.shareText}>Share on Whatsapp</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    borderBottomColor: '#151313',
    borderBottomWidth: 1,
    marginRight: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  resultTitle: {
    marginTop: 20,
    fontSize: 20,
  },
  result: {
    fontSize: 14,
    margin: 10,
  },
  optionsRow: {
    justifyContent: 'space-between',
  },
  withInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  Option: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    width: width,
  },
  shareText: {
    alignSelf: 'center',
    fontFamily: typography.NotoSansSemiBold,
    fontSize: 18,
  },
});

export default ShareAlert;
