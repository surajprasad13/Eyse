import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/influencers-profile/ProfileScreen";
import AboutUser from "../screens/influencers-profile/AboutUser";
import Book from "../screens/user-booking/Book";
import ConfirmBook from "../screens/user-booking/ConfirmBook";
import ExpertContentList from "../screens/expert-advice/ExpertContentList";
import ExpertCategoryList from "../screens/expert-advice/ExpertCategoryList";
import ExpertList from "../screens/expert-advice/ExpertList";
import BecomeInfluencer from "../screens/influencer-onboarding/BecomeInfluencer";
import FillForm from "../screens/influencer-onboarding/FillForm";
import ProfileTabNavigator from "../screens/influencers-profile/ProfileTabNavigator";
import EditProfile from "../screens/influencers-profile/EditProfile";
import PostType from "../screens/post/PostType";
import ChooseImage from "../screens/post/image-post/ChooseImage";
import TagProducts from "../screens/post/image-post/TagProdcuts";
import AddDesc from "../screens/post/image-post/AddDesc";
import FullView from "../screens/influencers-profile/FullView";
import VideoType from "../screens/post/video-post/VideoType";
import ChooseVideo from "../screens/post/video-post/ChooseVideo";
import TagVideoProducts from "../screens/post/video-post/TagVideoProducts";
import AddVideoDesc from "../screens/post/video-post/AddVideoDesc";
import ChooseReel from "../screens/post/video-post/ChooseReel";
import TagReelProducts from "../screens/post/video-post/TagReelProducts";
import AddReelDesc from "../screens/post/video-post/AddReelDesc";
import TextPost from "../screens/post/text-post/TextPost";
import HomeTabNavigator from "./HomeTabNavigator";
import YourBooking from "../screens/user-booking/YourBooking";
import BookingDetail from "../screens/user-booking/BookingDetail";
import CameraSearch from "../screens/home/components/CameraSearch";
import InfluencerSideBookings from "../screens/user-booking/InfluencerSideBookings";
import UserSideDetails from "../screens/user-booking/UserSideDetails";

const Stack = createNativeStackNavigator();

export default class HomeStack extends React.Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="HomeTabNavigator"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeTabNavigator" component={HomeTabNavigator} />
        <Stack.Screen name="CameraSearch" component={CameraSearch} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen
          name="ProfileTabNavigator"
          component={ProfileTabNavigator}
        />
        <Stack.Screen name="AboutUser" component={AboutUser} />
        <Stack.Screen name="Book" component={Book} />
        <Stack.Screen name="YourBooking" component={YourBooking} />
        <Stack.Screen
          name="InfluencerSideBookings"
          component={InfluencerSideBookings}
        />
        <Stack.Screen name="BookingDetail" component={BookingDetail} />
        <Stack.Screen name="UserSideDetails" component={UserSideDetails} />
        <Stack.Screen name="ConfirmBook" component={ConfirmBook} />
        <Stack.Screen name="ExpertContentList" component={ExpertContentList} />
        <Stack.Screen name="ExpertList" component={ExpertList} />
        <Stack.Screen
          name="ExpertCategoryList"
          component={ExpertCategoryList}
        />
        <Stack.Screen name="BecomeInfluencer" component={BecomeInfluencer} />
        <Stack.Screen name="FillForm" component={FillForm} />
        <Stack.Screen name="PostType" component={PostType} />
        <Stack.Screen name="VideoType" component={VideoType} />
        <Stack.Screen name="ChooseImage" component={ChooseImage} />
        <Stack.Screen name="TagProducts" component={TagProducts} />
        <Stack.Screen name="TagVideoProducts" component={TagVideoProducts} />
        <Stack.Screen name="AddDesc" component={AddDesc} />
        <Stack.Screen name="AddVideoDesc" component={AddVideoDesc} />
        <Stack.Screen name="ChooseVideo" component={ChooseVideo} />
        <Stack.Screen name="ChooseReel" component={ChooseReel} />
        <Stack.Screen name="AddReelDesc" component={AddReelDesc} />
        <Stack.Screen name="TextPost" component={TextPost} />
        <Stack.Screen name="TagReelProducts" component={TagReelProducts} />
        <Stack.Screen name="FullView" component={FullView} />
      </Stack.Navigator>
    );
  }
}
