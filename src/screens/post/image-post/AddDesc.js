import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import styles from "../styles";
import InputFormField from "../../onboarding/components/InputFormField";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { UserPost } from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class AddDesc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: this.props.route.params.selectedImage,
      tagList: this.props.route.params.tagList,
      desc: "",
      tags: "",
      loading: false,
      token: null,
      url: "",
    };
  }
  async componentDidMount() {
    console.log(this.state.tagList);
    const user = JSON.parse(await AsyncStorage.getItem("userToken"));
    if (user != null) {
      this.setState({ token: user });
    }

    UserPost.getHashtags()
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  publishValidation = () => {
    if (this.state.desc != "" && this.state.tags != "") {
      return true;
    } else return false;
  };
  onSubmit = () => {
    this.setState({ loading: true });
    let uri = this.state.selectedImage.toString();
    let filename = uri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formdata = new FormData();
    formdata.append("content", {
      uri: uri,
      name: filename,
      type: type,
    });

    UserPost.uploadFile(formdata)
      .then((res) => {
        this.setState({ url: res.data.url });

        axios
          .post(
            "http://18.190.154.188:9000/inflncr/addInfluencerPosts",

            {
              type: "IMAGE",
              description:
                "https://featureventures-storage.s3.us-east-2.amazonaws.com/images/1635358998782gLYYZnSeA.mp4",
              caption: this.state.desc,
              hashtags: ["ggfddf", "gffgfdg", "gfdgfd", "gdfgfd"],
              data: [
                {
                  name: filename,
                  url: this.state.url,
                },
              ],
              products: [
                {
                  name: "sun glasses",
                  brand_name: "Raybon",
                  color: "Red",
                  size: "XXL",
                  category: "Wearable",
                  sub_category: "Glasses",
                },
                {
                  name: "T- shirt",
                  brand_name: "Raybon",
                  color: "Red",
                  size: "XXL",
                  category: "Clothings",
                  sub_category: "T-shirt",
                },
              ],
            },
            {
              headers: {
                Authorization: this.state.token,
                "Content-Type": "application/json",
              },
            }
          )
          .then(async (response) => {
            console.log(response.data);
            if (response.status == 200) {
              this.props.navigation.navigate("HomeTabNavigator");
            }
          })
          .catch(function (error) {
            console.log(error.response);
          });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
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
              source={require("../../../assets/icons/back.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <Text style={{ ...styles.primaryLTextBold, marginLeft: 10 }}>
            Create a new post
          </Text>
        </SafeAreaView>

        <View style={{ flex: 1, margin: 30 }}>
          <View style={{ ...styles.row, justifyContent: "space-between" }}>
            <Text style={{ ...styles.primaryMTextBold }}>Add description</Text>
            <Text style={{ ...styles.primaryMTextBold }}>3/3</Text>
          </View>

          <TextInput
            style={{
              height: height / 2,
              backgroundColor: "#F2F7FD",
              borderRadius: 5,
              padding: 10,
              fontSize: 16,
              marginVertical: 10,
              textAlignVertical: "top",
              ...styles.secondarySText,
            }}
            onChangeText={(text) => {
              this.setState({ desc: text });
            }}
            multiline={true}
            placeholder="Write something..."
          />

          <InputFormField
            onChangeText={(text) => {
              this.setState({ tags: text });
            }}
            label="Tags"
            placeholder="Enter hashtags here"
          />

          <TouchableOpacity
            disabled={this.state.loading ? true : false}
            onPress={() => {
              this.onSubmit();
            }}
            style={{
              ...styles.submitBtnWrapper,
              paddingVertical: 10,
              marginVertical: 30,
              opacity: this.state.loading && 0.5,
            }}
          >
            {this.state.loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                style={{
                  ...styles.primaryMTextBold,
                  color: "white",
                  textAlign: "center",
                }}
              >
                Publish
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
