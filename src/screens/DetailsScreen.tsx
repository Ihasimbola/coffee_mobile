import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, Dimensions, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useStore } from '../store/store';
import { CoffeeType } from '../types/coffee';
import { SizeTypes } from '../types/Size';
import { BeanType } from '../types/bean';
import CustomIcon from '../components/CustomIcon';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import IconDetails from '../components/IconDetails';
import ChooseBtn from '../components/ChooseBtn';
import AppButton from '../components/AppButton';

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

const DetailsScreen = ({ route, navigation }: Props) => {
  const beanList = useStore<BeanType[]>((state: any) => state.BeanList);
  const coffeeList = useStore<CoffeeType[]>((state: any) => state.CoffeeList);
  const cart = useStore((state: any) => state.CartList);
  const addToCart = useStore((state: any) => state.addToCart);
  const [data, setData] = useState<BeanType | CoffeeType | undefined>(undefined);
  const [ size, setSize ] = useState<SizeTypes>(0);
  const { itemId, type } = route.params;

  const getDetails = (id: string, type: string): (BeanType | CoffeeType | undefined) => {
    if (id && type) {
      if (type === "Coffee") {
        return coffeeList.filter((item, index) => item.id === id)[0];
      } else {
        return beanList.filter((item, index) => item.id === id)[0];
      }
    }
    return undefined;
  }

  const handleAddToCart = () => {
    if(data) {
      const toAdd = getDetails(data?.id, data?.type)
      addToCart(toAdd)
    }
  }

  useLayoutEffect(() => {
    setData(getDetails(itemId, type));
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, .1)"
          translucent={true}
        />
        <View style={styles.imgContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
            >
              <GradientBGIcon
                iconName='left'
                size={25}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <GradientBGIcon
                iconName='like'
                size={25}
                color={COLORS.primaryRedHex}
              />
            </TouchableOpacity>
          </View>

          {
            data?.imagelink_portrait && (
              <Image
                source={data?.imagelink_portrait}
                style={styles.img}
              />
            )
          }

          <View style={styles.infoWrapper}>
            <View style={styles.left}>
              <View>
                <Text style={styles.name}>{data?.name}</Text>
                <Text style={styles.from}>{`From ${data?.ingredients}`}</Text>
              </View>
              <View style={styles.ratingWrapper}>
                <CustomIcon name="star" size={25} color={COLORS.primaryOrangeHex} />
                <Text style={styles.averageRating}>{data?.average_rating}</Text>
                <Text style={styles.ratingCount}>{`(${data?.ratings_count})`}</Text>
              </View>
            </View>

            <View style={styles.right}>
              <View style={styles.icon}>
                <IconDetails iconName='bean' size={25} color={COLORS.primaryOrangeHex} text={data?.type} />
                <IconDetails iconName='location' size={25} color={COLORS.primaryOrangeHex} text={data?.ingredients} />
              </View>
              <View>
                <IconDetails text={data?.roasted} />
              </View>
            </View>
          </View>

        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.descTitle}>Description</Text>
          <Text style={styles.description}>
            {data?.description}
          </Text>
        </View>

        <View style={styles.weightAvailable}>
          <Text style={styles.descTitle}>Size</Text>
          <View style={styles.weights}>
            {
              data?.prices.map((item, idx) => (
                <ChooseBtn
                 key={idx} 
                 text={item.size}
                 active={size === idx}
                 setSize={setSize}
                 id={idx as SizeTypes}
                />
              ))
            }
          </View>
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.priceLeftContainer}>
            <Text style={{
              ...styles.descTitle,
              fontSize: FONTSIZE.size_14,
              fontFamily: FONTFAMILY.poppins_regular
            }}>
              Price
            </Text>
            <Text style={styles.priceValue}>
              <Text style={styles.currencyStyle}>{ data?.prices[size].currency }</Text>
              { data?.prices[size].price }
            </Text>
          </View>
          <View style={styles.priceRightContainer}>
            <AppButton 
              text='Add To Cart'
              textColor={COLORS.secondaryLightGreyHex}
              bgColor={COLORS.primaryOrangeHex}
              onPress={handleAddToCart}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const textStyle = {
  color: COLORS.secondaryLightGreyHex,
  fontSize: FONTSIZE.size_18,
  fontFamily: FONTFAMILY.poppins_medium
}

const priceFontStyle = {
  fontFamily: FONTFAMILY.poppins_semibold,
  fontSize: FONTSIZE.size_28,
}

const thinTextStyle = {
  color: COLORS.secondaryLightGreyHex,
  fontSize: FONTSIZE.size_14,
  fontFamily: FONTFAMILY.poppins_light
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  container: {
    backgroundColor: COLORS.primaryBlackHex,
    flex: 1
  },
  imgContainer: {

  },
  img: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 2 / 3,
  },
  detailContainer: {
    paddingHorizontal: SPACING.space_18,
    marginTop: SPACING.space_12
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    zIndex: 1000,
    width: "100%",
    paddingHorizontal: SPACING.space_18,
    marginTop: SPACING.space_36,
  },
  infoWrapper: {
    backgroundColor: COLORS.primaryBlackRGBA,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.space_18,
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: SPACING.space_12,
    borderTopLeftRadius: SPACING.space_12
  },
  left: {
    flexGrow: 1,
    justifyContent: "space-between"
  },
  right: {
    flexGrow: 0.5,
    justifyContent: "space-between",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.space_10
  },
  name: {
    ...textStyle
  },
  from: {
    ...thinTextStyle
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: 'baseline'
  },
  averageRating: {
    ...textStyle,
    marginLeft: SPACING.space_10
  },
  ratingCount: {
    ...thinTextStyle,
    marginLeft: SPACING.space_4
  },
  description: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex
  },
  descTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.secondaryLightGreyHex
  },
  weightAvailable: {
    marginTop: SPACING.space_8,
    paddingHorizontal: SPACING.space_18
  },
  weights: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceContainer: {
    flexDirection: "row",
    marginTop: SPACING.space_18,
    paddingHorizontal: SPACING.space_18,
    justifyContent: "space-between",
    alignItems: "center"
  },
  priceLeftContainer: {
    flexGrow: 1
  },
  priceRightContainer: {
    flexGrow: 2
  },
  currencyStyle: {
    color: COLORS.primaryOrangeHex,
    ...priceFontStyle,
  },
  priceValue: {
    ...priceFontStyle,
    color: COLORS.secondaryLightGreyHex,
    marginTop: -10
  }
})

export default DetailsScreen;