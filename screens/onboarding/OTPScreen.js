import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import InputFormField from "./components/InputFormField";

export default class OTPScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      sent: false,
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView
          style={{
            marginTop: StatusBar.currentHeight,
            justifyContent: "center",
            marginHorizontal: 30,
            alignItems: "center",
          }}
        >
          <Text style={styles.primaryLTextBold}>Verify number</Text>
        </SafeAreaView>
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 100,
          }}
        >
          {this.state.sent && (
            <Text style={{ ...styles.secondaryMText, paddingVertical: 10 }}>
              A otp will be sent to you to verify number
            </Text>
          )}
          <InputFormField
            label={this.state.sent ? "Enter OTP" : "Enter contact number"}
            placeholder="Enter here"
            keyboardType="phone-pad"
            setState={this.setState}
            onChangeText={(text) =>
              this.setState({
                username: text,
              })
            }
          />
          <TouchableOpacity
            onPress={() => {
              this.setState({ sent: !this.state.sent });
            }}
            style={{
              ...styles.submitBtnWrapper,
              paddingVertical: 10,
              marginVertical: 40,
            }}
          >
            <Text
              style={{
                ...styles.primaryMTextBold,
                color: "white",
                textAlign: "center",
              }}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
