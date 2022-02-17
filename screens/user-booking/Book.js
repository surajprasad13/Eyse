import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import InputFormField from "../onboarding/components/InputFormField";
import RadioForm from "react-native-simple-radio-button";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../../constants/colors";
import axios from "axios";

class Time extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.id);
    console.log(this.props.selected);
    return (
      <TouchableOpacity
        disabled={this.props.booked ? true : false}
        onPress={this.props.onPress}
        style={{ ...styles.row }}
      >
        <View
          style={{
            backgroundColor: this.props.booked
              ? "#E6E8EC"
              : this.props.selected === this.props.id
              ? colors.primaryBackground
              : "#E6E8EC",
            borderRadius: 5,
            padding: 5,
            marginRight: 40,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              ...styles.secondaryMText,
              color: this.props.booked
                ? "#B3BBC7"
                : this.props.selected === this.props.id
                ? "#F2F7FD"
                : "#011E46",
            }}
          >
            07:00 AM - 08:00 AM
          </Text>
        </View>
        {this.props.booked && (
          <Text style={{ ...styles.secondaryMText, color: "#FF2E00" }}>
            Booked!
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}
export default class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      note: "",
      follow: false,
      types: [
        { label: "Male", value: 0 },
        { label: "Female", value: 1 },
        { label: "Other", value: 2 },
      ],
      value: "",
      birthDate: null,
      sessionDate: null,
      sessionTime: new Date(),
      showBirth: false,
      showDate: false,
      showTime: false,
      dropdownData: ["Morning", "Afternoon", "Evening", "Night"],
      selected: null,
      shift: "",
      loader: false,
      user_id: this.props.route.params.user_id,
      influencer_id: this.props.route.params.influencer_id,
      payment: this.props.route.params.payment,
    };
  }

  bookingValidation = () => {
    if (
      this.state.name != "" &&
      this.state.selected != null &&
      this.state.shift != ""
    ) {
      return true;
    } else return false;
  };

  async onSubmit() {
    const user_id = this.props.route.params.user_id;
    const influencer_id = this.props.route.params.influencer_id;
    const payment = this.props.route.params.payment;

    this.setState({ loader: true });

    if (user_id != "" && influencer_id != "" && payment != null) {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWJlZTJjMzg3Nzg1ZjA5NzljY2ZiY2EiLCJlbWFpbCI6InRhbWFuQDEyMy5nbWFpbC5jb20iLCJtb2JpbGUiOiI3MDA3MzMyNzI3IiwiaWF0IjoxNjQxNjI0OTc0LCJleHAiOjE2NDQyMTY5NzR9.7DYVd6nVLLpi1-nGsOwE7pudxfkcTN1gHZTFarMQdAQ",
        },
      };
      let url = "http://18.190.154.188:9000/bookings/createNewBooking";

      let formdata = new FormData();

      formdata.append("user_id", user_id);
      formdata.append("influencer_id", influencer_id);
      formdata.append("payment_id", "61ac85f65fd1c001b33c4078");
      formdata.append("booking_slot_details", {
        date: [
          {
            slot_start: "2021-05-27T05:55:23.408+0000",
            slot_end: "2021-05-27T05:55:23.408+0000",
          },
        ],
      });

      axios
        .post(
          url,
          {
            user_id: user_id,
            influencer_id: influencer_id,
            payment_id: "61ac85f65fd1c001b33c4078",
            amount_of_payment: payment,
            booking_slot_details: {
              date: [
                {
                  slot_start: "2021-05-27T05:55:23.408+0000",
                  slot_end: "2021-05-27T05:55:23.408+0000",
                },
              ],
            },
          },
          axiosConfig
        )
        .then((res) => {
          if (res.status == 201) {
            this.setState({ loader: false });
            this.props.navigation.navigate("ConfirmBook", {
              user_id: this.state.user_id,
              influencer_id: this.state.influencer_id,
              payment: this.state.payment,
            });
          }
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err.response);
          // alert(err.response.data.message);
          this.setState({ loader: false });
        });
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={{ ...styles.headerWrapper }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Image
              source={require("../../assets/icons/back.png")}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </TouchableOpacity>
          <Text style={{ ...styles.primaryLTextBold, marginLeft: 10 }}>
            Enter Details
          </Text>
        </SafeAreaView>

        <View
          style={{
            marginHorizontal: 30,
            paddingTop: 20,
          }}
        >
          <Text style={{ ...styles.primaryMTextBold }}>Name</Text>
          <InputFormField
            placeholder="Enter Anttendee’s name"
            setState={this.setState}
            onChangeText={(text) =>
              this.setState({
                name: text,
              })
            }
          />
          <View style={{ paddingTop: 20 }}>
            <Text style={{ ...styles.primaryMTextBold }}>Gender</Text>
            <RadioForm
              radio_props={this.state.types}
              initial={0}
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor="#677890"
              selectedButtonColor="#011E46"
              animation={true}
              buttonSize={10}
              onPress={(value) => {
                this.setState({ value: value });
              }}
              style={{ justifyContent: "space-between", padding: 10 }}
              labelStyle={styles.secondaryMText}
            />
          </View>
          <View
            style={{
              paddingVertical: 20,
              height: 120,
              borderBottomWidth: 1,
              borderColor: "#E6E8EC",
            }}
          >
            <Text style={{ ...styles.primaryMTextBold }}>Date of birth</Text>
            <TouchableOpacity
              style={{
                borderRadius: 5,
                elevation: 3,
                padding: 10,
                marginVertical: 10,
                backgroundColor: "white",
                width: 150,
              }}
              onPress={() => {
                this.setState({ showBirth: true });
              }}
            >
              <Text style={styles.secondaryMText}>
                {this.state.birthDate === null
                  ? "Select date of Birth"
                  : this.state.birthDate.toDateString()}
              </Text>
            </TouchableOpacity>
            {this.state.showBirth && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || this.state.birthDate;
                  this.setState({ showBirth: Platform.OS === "ios" });
                  this.setState({ birthDate: currentDate });
                }}
                placeholder="Select date of Birth"
              />
            )}
          </View>
          <View
            style={{
              paddingVertical: 20,
              borderBottomWidth: 1,
              borderColor: "#E6E8EC",
            }}
          >
            <Text style={{ ...styles.primaryMTextBold }}>
              Choose date & time of session
            </Text>
            <Text
              style={{
                ...styles.primaryMTextBold,
                color: "#B3BBC7",
                marginTop: 10,
              }}
            >
              DATE
            </Text>
            <View>
              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  elevation: 3,
                  padding: 10,
                  marginVertical: 10,
                  backgroundColor: "white",
                  width: Dimensions.get("window").width / 1.5,
                }}
                onPress={() => {
                  this.setState({ showDate: true });
                }}
              >
                <Text style={styles.secondaryMText}>
                  {this.state.sessionDate === null
                    ? "Select date of session start"
                    : this.state.sessionDate.toDateString()}
                </Text>
              </TouchableOpacity>
              {this.state.showDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || this.state.sessionDate;
                    this.setState({ showDate: Platform.OS === "ios" });
                    this.setState({ sessionDate: currentDate });
                  }}
                  placeholder="Select date"
                />
              )}
            </View>

            <Text
              style={{
                ...styles.primaryMTextBold,
                color: "#B3BBC7",
                marginTop: 10,
              }}
            >
              TIME SLOT
            </Text>

            <InputFormField
              onSelect={(index, value) => {
                this.setState({ shift: value });
              }}
              dropdown={true}
              dropdownData={this.state.dropdownData}
              placeholder="Select shift"
              dropdown={true}
            />

            {this.state.shift != "" && (
              <>
                <Time
                  id={1}
                  selected={this.state.selected}
                  onPress={() => {
                    this.setState({ selected: 1 });
                  }}
                />
                <Time
                  id={2}
                  selected={this.state.selected}
                  onPress={() => {
                    this.setState({ selected: 3 });
                  }}
                  booked
                />
                <Time
                  id={3}
                  selected={this.state.selected}
                  onPress={() => {
                    this.setState({ selected: 3 });
                  }}
                />
                <Time
                  id={4}
                  selected={this.state.selected}
                  onPress={() => {
                    this.setState({ selected: 4 });
                  }}
                />
              </>
            )}
          </View>

          <View
            style={{
              paddingTop: 20,
            }}
          >
            <Text style={{ ...styles.primaryMTextBold }}>
              Add note (optional)
            </Text>
            <TextInput
              style={{
                height: 200,
                backgroundColor: "#F2F7FD",
                borderRadius: 5,
                padding: 10,
                fontSize: 16,
                marginVertical: 10,
                textAlignVertical: "top",
              }}
              multiline={true}
              placeholder="Write something..."
              onChangeText={(text) => {
                this.setState({ note: text });
              }}
            />
          </View>

          <TouchableOpacity
            disabled={!this.bookingValidation()}
            onPress={() => {
              this.onSubmit();
              // this.props.navigation.navigate("ConfirmBook", {
              //   user_id: this.state.user_id,
              //   influencer_id: this.state.influencer_id,
              //   payment: this.state.payment,
              //   date: this.state.sessionDate.toDateString(),
              //   time: this.state.sessionTime.toLocaleTimeString(),
              // });
            }}
            style={{
              paddingVertical: 10,
              opacity: !this.bookingValidation() && 0.5,
            }}
          >
            <View
              style={{
                ...styles.submitBtnWrapper,
                backgroundColor: colors.primaryBackground,
              }}
            >
              {this.state.loader ? (
                <ActivityIndicator size={"small"} color={"white"} />
              ) : (
                <Text
                  style={{
                    ...styles.primaryMTextBold,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Confirm
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
