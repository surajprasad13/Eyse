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

export default class NewPassword extends Component {
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
          <InputFormField
            label="Enter new password"
            secureTextEntry={true}
            placeholder="Enter here"
            setState={this.setState}
            onChangeText={(text) =>
              this.setState({
                username: text,
              })
            }
          />
          <InputFormField
            label="Re-enter password"
            secureTextEntry={true}
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
              this.props.navigation.navigate("Success", {
                msg: "Password reset",
                navigateTo: "Login",
              });
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
