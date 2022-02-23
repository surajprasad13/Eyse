//import RenderImageStore from "./components/RenderImageStore";
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// components
import RenderImage from './components/RenderImage';
import RenderProductCard from './components/RenderProductCard';

const InfluencerContainer = ({route, navigation}) => {
  const [clicked, setClicked] = useState(false);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#fff', padding: 20}}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          backgroundColor: '#fff',
          elevation: 5,
          marginBottom: 1,
          paddingVertical: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',

              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name={'chevron-left'}
              color={'#000'}
              size={34}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/img11.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
            <Text
              style={{fontFamily: fontMedium, fontSize: 14, color: '#011E46'}}>
              Influencer's Name
            </Text>
            <Text
              style={{fontFamily: fontMedium, fontSize: 14, color: '#677890'}}>
              Follow
            </Text>
          </View>
        </View>
        <SimpleLineIcons
          name={'options-vertical'}
          size={20}
          color={'#99A5B5'}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          // navigation.navigate('InfluencerPost', {
          //   image: route.params.image,
          //   type: route.params.type,
          // })
          setClicked(!clicked)
        }
        style={{backgroundColor: '#fff', elevation: 5, marginBottom: 10}}>
        <ImageBackground
          style={{
            width: '100%',
            height: 250,
            marginVertical: 20,
            borderRadius: 6,
            resizeMode: 'contain',
          }}
          source={route.params.image}>
          {clicked ? (
            <View style={{position: 'absolute', top: 160, left: 20, zIndex: 3}}>
              <RenderProductCard />
            </View>
          ) : null}
        </ImageBackground>
        <TouchableOpacity style={styles.floatingActionBtn}>
          {/* <Image
            source={require('../../assets/images/heart-outline.png')}
            style={{...styles.icon28, top: 2}}
            resizeMode="contain"
          /> */}
          <MaterialCommunityIcons
            name="pin-outline"
            size={30}
            color={'#011E46'}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <SimpleLineIcons name="pin" size={14} color={'#677890'} />
          <Text
            style={{
              fontFamily: fontRegular,
              fontSize: 14,
              color: '#677890',
              alignSelf: 'center',
              marginHorizontal: 10,
            }}>
            12
          </Text>
        </View>
        <Text
          style={{
            fontFamily: fontRegular,
            fontSize: 14,
            color: '#677890',
            marginTop: 10,
            textAlign: 'center',
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie,
          ante id tincidunt dapibus...
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginTop: -10,
            marginBottom: 10,
            marginRight: 10,
          }}>
          <TouchableOpacity
          //  onPress={() => Share.open(options)}
          >
            <MaterialIcons name="share" size={24} color={'#99A5B5'} />
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
      <MasonryList
        data={[
          {
            id: '123',
            imgURL:
              'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
            text: 'Pioneer LHS Chaise Lounger in Grey Colour',
          },
          {
            id: '124',
            imgURL:
              'https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red',
            text: 'Precedant Furniture',
          },
          {
            id: '125',
            imgURL:
              'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg',
            text: 'Leverette Upholstered Platform Bed',
          },
          {
            id: '126',
            imgURL:
              'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*',
            text: 'Briget Accent Table',
          },
          {
            id: '127',
            imgURL:
              'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*',
            text: 'Rivet Emerly Media Console',
          },
        ]}
        keyExtractor={(item, index) => item.ID}
        numColumns={2}
        style={{marginBottom: 80}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <RenderImage item={item} navigation={navigation} />
        )}
      />
    </ScrollView>
  );
};

const fontRegular = 'DidactGothic_400Regular';
const fontMedium = 'NotoSans_400Regular';

export default InfluencerContainer;

const styles = StyleSheet.create({
  floatingActionBtn: {
    width: 55,
    height: 55,
    borderRadius: 30,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    right: 20,
    bottom: 90,
  },
  icon28: {
    width: 28,
    height: 28,
  },
  reviewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
  },
  profileImage: {width: 50, height: 50, borderRadius: 50, marginRight: 10},
  textReview: {
    fontFamily: fontRegular,
    fontSize: 16,
    color: '#677890',
    alignSelf: 'center',
    marginHorizontal: 10,

    paddingVertical: 21,
  },
});
