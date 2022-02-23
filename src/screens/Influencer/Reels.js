import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
//import Share from "react-native-share";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Video from "react-native-video";
import { typography } from "../../common/typography";
//import { options } from "../../data/Options";
const { width, height } = Dimensions.get("window");

const videos = [
  {
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    ],
    subtitle: "By Blender Foundation",
    thumb: "images/BigBuckBunny.jpg",
    title: "Big Buck Bunny",
  },
  {
    description: "The first Blender Open Movie from 2006",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    ],
    subtitle: "By Blender Foundation",
    thumb: "images/ElephantsDream.jpg",
    title: "Elephant Dream",
  },
  {
    description:
      "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    ],
    subtitle: "By Google",
    thumb: "images/ForBiggerBlazes.jpg",
    title: "For Bigger Blazes",
  },
  {
    description:
      "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    ],
    subtitle: "By Google",
    thumb: "images/ForBiggerEscapes.jpg",
    title: "For Bigger Escape",
  },
  {
    description:
      "Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    ],
    subtitle: "By Google",
    thumb: "images/ForBiggerFun.jpg",
    title: "For Bigger Fun",
  },
];

const Reels = ({ navigation }) => {
  const [currentIndex, setIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const VideoPlayerComponent = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          height: height,
          width: width,
          backgroundColor: "#000",
        }}
      >
        <Video
          //ref={videoRef}
          source={{
            uri: item.sources[0],
          }}
          posterResizeMode={"cover"}
          autoPlay={true}
          repeat={true}
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          paused={currentIndex !== index}
          muted={currentIndex !== index}
          resizeMode={"cover"}
        />
        {opened ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              width: width,
              backgroundColor: "rgba(1,30,70,0.7)",
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",

                width: width,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    marginRight: 30,
                    borderRadius: 50,
                  }}
                  source={require("../../assets/images/img3.png")}
                />
                <View style={{ alignSelf: "center" }}>
                  <Text
                    style={{
                      color: "#F2F7FD",
                      fontSize: 16,
                      fontFamily: typography.NotoSansSemiBold,
                    }}
                  >
                    Influencers Name
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: "#F2F7FD",
                        fontSize: 14,
                        fontFamily: typography.NotoSansSemiBold,
                      }}
                    >
                      Follow
                    </Text>
                    <TouchableOpacity onPress={() => setOpened(false)}>
                      {/* <Image
                          source={require('../../assets/images/arrow-up.png')}
                          style={{
                            height: 22,
                            width: 22,
                            alignSelf: 'center',
                            marginHorizontal: 10,
                          }}
                        /> */}
                      <MaterialCommunityIcons
                        name={"chevron-up"}
                        color={"#fff"}
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Image
                source={require("../../assets/images/more_vertical.png")}
                style={{ height: 28, width: 28, alignSelf: "center", right: 0 }}
              />
            </View>
            <Text
              style={{
                color: "#F2F7FD",
                fontSize: 14,
                fontFamily: typography.NotoSansRegular,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              molestie, ante id tincidunt dapibus... Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. In molestie, ante id tincidunt
              dapibus...
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              {/* <Image
                  source={require('../../assets/images/profile-icon.png')}
                  style={{height: 28, width: 28, alignSelf: 'center', right: 0}}
                /> */}
              <MaterialIcons name={"person"} size={24} color={"#fff"} />
              <Text
                style={{
                  alignSelf: "center",
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: typography.NotoSansRegular,
                }}
              >
                {" "}
                2 Products
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              padding: 20,
              width: width,
              position: "absolute",
              top: 0,
              justifyContent: "space-between",
              //backgroundColor: 'rgba(1,30,70,0.7)',
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",

                justifyContent: "center",
              }}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons
                name={"chevron-left"}
                color={"#fff"}
                size={34}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", marginLeft: -40 }}>
              <Image
                style={{
                  height: 50,
                  width: 50,
                  marginHorizontal: 30,
                  borderRadius: 50,
                }}
                source={require("../../assets/images/img3.png")}
              />
              <View style={{ alignSelf: "center" }}>
                <Text
                  style={{
                    color: "#F2F7FD",
                    fontSize: 16,
                    fontFamily: typography.NotoSansSemiBold,
                  }}
                >
                  Influencers Name
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#F2F7FD",
                      fontSize: 14,
                      fontFamily: typography.NotoSansSemiBold,
                    }}
                  >
                    Follow
                  </Text>
                  <TouchableOpacity onPress={() => setOpened(true)}>
                    {/* <Image
                source={require('../../assets/images/arrow-down.png')}
                style={{
                  height: 22,
                  width: 22,
                  alignSelf: 'center',
                  marginHorizontal: 10,
                }}
              /> */}
                    <MaterialCommunityIcons
                      name={"chevron-down"}
                      color={"#fff"}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <SimpleLineIcons
                name={"options-vertical"}
                color={"#fff"}
                size={24}
              />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            position: "absolute",
            bottom: 20,
            width: width,
            padding: 20,
            flexDirection: "row",
            justifyContent: "flex-end",
            //alignItems: 'flex-end',
          }}
        >
          <View style={{ justifyContent: "space-around" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(255,255,255,0.7)",
                height: 40,
                width: 40,
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name={"pin-outline"}
                color={"#011E46"}
                size={32}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(255,255,255,0)",
                height: 40,
                width: 40,
                borderRadius: 40,
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <SimpleLineIcons name={"pin"} color={"#F2F7FD"} size={20} />
              <Text
                style={{
                  marginLeft: 10,
                  color: "#F2F7FD",
                  fontFamily: typography.NotoSansMedium,
                }}
              >
                12
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              //  onPress={() => Share.open(options)}
              style={{
                backgroundColor: "rgba(255,255,255,0)",
                height: 40,
                width: 40,
                borderRadius: 40,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name={"share-variant"}
                color={"#F2F7FD"}
                size={28}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        height: height,
        width: width,
      }}
    >
      <SwiperFlatList
        data={videos}
        keyExtractor={(item) => item.title}
        vertical={true}
        renderItem={VideoPlayerComponent}
        pagingEnabled={true}
        snapToInterval={height}
        onChangeIndex={(index) => setIndex(index.index)}
      />
    </View>
  );
};

export default Reels;
{
  /*<Video
        style={{
          height: height,
          width: width,
          flex: 1,
        }}
        paused={false}
        ref={videoRef}
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        resizeMode={'cover'}
      />
      
      <FlatList
        data={videos}
        renderItem={Reels}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        disableIntervalMomentum
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={false}
      />
      */
}
