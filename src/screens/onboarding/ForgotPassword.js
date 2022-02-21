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

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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
          <Text style={styles.primaryLTextBold}>Forgot password</Text>
        </SafeAreaView>
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 100,
          }}
        >
          <Text style={{ ...styles.secondaryMText, paddingVertical: 10 }}>
            A link will be sent to you to reset your password{" "}
          </Text>
          <InputFormField
            label="Enter email id or contact number"
            placeholder="Enter here"
            setState={this.setState}
            onChangeText={(text) =>
              this.setState({
                username: text,
              })
            }
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("NewPassword");
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
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
