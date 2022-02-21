import React from 'react';
import {Text, View, TextInput, Dimensions, Switch} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../constants/colors';
const width = Dimensions.get('window').width;

export default class InputFormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
    };
  }

  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {this.props.label && (
            <Text
              style={{
                ...styles.primaryMTextBold,
                padding: 10,
                bottom: this.props.toggle ? 0 : -20,
              }}>
              {this.props.label}
            </Text>
          )}

          {this.props.toggle && (
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={
                this.state.isEnabled ? colors.primaryBackground : '#f4f3f4'
              }
              onValueChange={() =>
                this.setState({isEnabled: !this.state.isEnabled})
              }
              value={this.state.isEnabled}
            />
          )}
        </View>
        {this.props.dropdown ? (
          <ModalDropdown
            options={this.props.dropdownData}
            defaultValue={this.props.placeholder}
            onSelect={this.props.onSelect}
            style={{
              height: 45,
              backgroundColor: '#F2F7FD',
              borderRadius: 5,
              padding: 10,
              marginVertical: 10,
              ...styles.secondarySText,
            }}
            textStyle={{
              ...styles.secondarySText,
              color: '#677890',
            }}
            dropdownStyle={{
              backgroundColor: 'white',
              width: width - 60,
            }}
            dropdownTextStyle={{
              fontSize: 15,
              color: 'black',
            }}
            renderRightComponent={() => {
              return <AntDesign name="caretdown" size={15} color="#011E46" />;
            }}
            buttonAndRightComponentContainerStyle={{
              justifyContent: 'space-between',
            }}
          />
        ) : (
          <TextInput
            style={{
              height: this.props.multiline ? 200 : 45,
              width: this.props.row ? width / 2.5 : '100%',
              backgroundColor: '#F2F7FD',
              borderRadius: 5,
              padding: 10,
              marginVertical: 10,
              ...styles.secondarySText,
              color: '#677890',
            }}
            multiline={this.props.multiline}
            placeholder={this.props.placeholder}
            placeholderTextColor="#677890"
            onChangeText={this.props.onChangeText}
            secureTextEntry={this.props.secureTextEntry}
            keyboardType={this.props.keyboardType}
            editable={
              this.props.toggle ? (this.state.isEnabled ? true : false) : true
            }
          />
        )}
      </View>
    );
  }
}
