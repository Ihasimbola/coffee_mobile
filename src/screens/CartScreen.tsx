import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../store/store';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { homeScreenStyles } from '../screens/HomeScreen';
import HeaderBar from '../components/HeaderBar';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { CoffeeType } from '../types/coffee';
import { BeanType } from '../types/bean';
import IconDetails from '../components/IconDetails';
import ChooseBtn from '../components/ChooseBtn';
import { IPrices } from '../types/price';
import { SizeTypes } from '../types/Size';
import AppButton from '../components/AppButton';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';

type CartCardPropsType = {
  data: BeanType & CoffeeType
}

type idType = {
  id: SizeTypes
}

// ******************************************* CartScreen ***************************************
 
const CartScreen = () => {
  const insets = useSafeAreaInsets();
  const carts = useStore((state: any) => state.CartList);
  // AsyncStorage.clear()
  const tabBarBottomHeight = useBottomTabBarHeight();
  
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingBottom: insets.bottom,
        paddingRight: insets.right,
        ...styles.container
      }}
    >
      <ScrollView style={{ marginBottom: SPACING.space_8 }}>
      <HeaderBar />
      <View style={{
        marginBottom: tabBarBottomHeight + SPACING.space_36
      }}>
        {
          carts.map((cart: (BeanType & CoffeeType), index: number) => (
            <CartCard data={cart} key={cart.id} />
          ))
        }
      </View>
    </ScrollView>

    <View style={[ styles.footer, {
      position: "absolute",
      bottom: tabBarBottomHeight,
      zIndex: 1500,
     }]}>
      <View style={styles.totalPrice}>
        <Text style={listPriceStyles.priceValue}>Total price</Text>
        <View style={{
          flexDirection: "row"
        }}>
          <Text style={listPriceStyles.currency}>$</Text>
          <Text style={listPriceStyles.priceValue}> 4.15</Text>
        </View>
      </View>
      <View style={styles.btnFooter}>
        <AppButton 
          text="Pay"
          bgColor={COLORS.primaryOrangeHex}
          textColor={COLORS.secondaryLightGreyHex}
        />
      </View>
      </View>
    </View>

    
  )
}

// ******************************************* CartCard ***************************************


const CartCard: React.FC<CartCardPropsType> = ({ data }) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={cardStyles.container}
    >
      <View style={styles.wrapper}>
        <Image
          style={styles.img} 
          source={data.imagelink_square}
          alt={data.name}
        />
        <View style={styles.info}>
          <View>
            <Text style={styles.name}>{ data.name }</Text>
            <Text style={styles.ingredient}>{ data.special_ingredient }</Text>
          </View>
          <IconDetails
            text={data.roasted}
          />
        </View>
      </View>

      <View style={styles.priceContainer}>
        {
          data.prices.map((price, idx: any) => (
            <ListPrice
             size={price.size} 
             currency={price.currency}  
             price={price.price}
             id={idx}
             key={idx}
            />
          ))
        }
      </View>

    </LinearGradient>
  )
}

// ******************************************* List Price ***************************************


const ListPrice: React.FC<IPrices & idType> = ({ currency, price, size, id }) => {
  return (
    <View style={listPriceStyles.container}>
      <ChooseBtn 
        text={size}
        setSize={() => {}}
        id={id}
        style={listPriceStyles.chooseBtnStyle}
      />
      <Text style={listPriceStyles.priceValue}>
        <Text style={listPriceStyles.currency}>{currency}</Text>
        { price }
      </Text>
      <View style={listPriceStyles.quantity}>
        <AppButton 
          iconName='add'
          bgColor={COLORS.primaryOrangeHex}
          iconSize={8}
          iconColor={COLORS.secondaryLightGreyHex}
        />
        <Text style={listPriceStyles.qtyValue}>{1}</Text>
        <AppButton 
          iconName='add'
          bgColor={COLORS.primaryOrangeHex}
          iconSize={8}
          iconColor={COLORS.secondaryLightGreyHex}
        />
      </View>
    </View>
  )
}

// *************************************** CONTAINER STYLE ****************************************

const styles = StyleSheet.create({
  container: {
    ...homeScreenStyles.styles.ScreenContainer,
    flex: 1,
  },
  priceContainer: {
    marginTop: SPACING.space_12
  },
  wrapper: {
    flexDirection: "row",
  },
  img: {
    width: 100,
    height: 100,
    marginRight: SPACING.space_18,
    borderRadius: BORDERRADIUS.radius_8
  },
  info: {
    justifyContent: "space-between"
  },
  name: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex
  },
  ingredient: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryLightGreyHex
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: SPACING.space_24,
    paddingRight: SPACING.space_18,
    paddingVertical: SPACING.space_4
  },
  btnFooter: {
    flexGrow: 2
  },
  totalPrice: {
    flexGrow: 1,
    // alignItems: "center"
  },
  blurView: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})



// ********************************* CARD STYLE *********************************************

const cardStyles = StyleSheet.create({
  container: {
    padding: SPACING.space_12,
    marginHorizontal: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_10,
    marginBottom: SPACING.space_12
  }
})



// ******************************** LIST PRICE STYLE ****************************************

const listPriceStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginVertical: SPACING.space_4,
  },
  currency: {
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  priceValue: {
    color: COLORS.secondaryLightGreyHex
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyValue: {
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
    paddingHorizontal: SPACING.space_16,
    paddingVertical: 6,
    marginHorizontal: SPACING.space_12,
    borderColor: COLORS.primaryOrangeHex,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_8,
    justifyContent: "center",
    alignItems: "center"
  },
  chooseBtnStyle: {
    paddingVertical: 6,
    width: 75
  }
})

export default CartScreen