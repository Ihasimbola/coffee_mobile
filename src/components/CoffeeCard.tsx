import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import { IPrices } from '../types/price';
import AppButton from './AppButton';

interface IProps {
  item: {
    id: string;
    name: string;
    description: string;
    roasted: string;
    imagelink_square: any;
    imagelink_portrait:any;
    ingredients: string;
    special_ingredient: string;
    prices: IPrices[];
    average_rating: number;
    ratings_count: string;
    favourite: boolean;
    type: string;
    index: number;
  }
}

const CoffeeCard = ({ item }: IProps) => {

  return (
    <View style={styles.cardContainer}>
        <View style={styles.imgWrapper}>
          <View style={styles.ratingWrapper}>
            <CustomIcon name="star" size={10} color={COLORS.primaryOrangeHex} />
           { item.type === "Coffee" && <Text style={styles.rating}>{ item.average_rating }</Text> }
          </View>
          <Image 
            source={item.imagelink_square}
            style={styles.image}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>{ item.name }</Text>
          <Text style={[styles.name, styles.specialName]}>{ item.special_ingredient }</Text>
        </View>
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>
            <Text style={styles.currency}>{item.prices[0].currency}</Text>
            { ` ${item.prices[2].price}` }
          </Text>
          <TouchableOpacity>
            <AppButton iconName='add' iconColor={COLORS.secondaryLightGreyHex} bgColor={COLORS.primaryOrangeHex}/>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const ratingStyleFont = {
  fontSize: FONTSIZE.size_20,
  fontFamily: FONTFAMILY.poppins_bold,
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 149,
    backgroundColor: COLORS.primaryGreyHex,
   padding: SPACING.space_12,
    borderRadius: SPACING.space_12,
  },
  imgWrapper: {
    
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: SPACING.space_8,
  },
  name: {
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium
  },
  nameWrapper: {
    marginTop: SPACING.space_15
  },
  specialName: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_light
  },
  rating: {
    color: COLORS.secondaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10
  },
  ratingWrapper: {
    position: 'absolute',
    zIndex: 1000,
    right: 0,
    top: 0,
    width: 53,
    backgroundColor: COLORS.primaryBlackHex,
    opacity: 0.65,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    borderBottomLeftRadius: SPACING.space_28,
    borderTopRightRadius: SPACING.space_10,
    gap: 8
  },
  priceWrapper: {
    marginTop: SPACING.space_15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  price: {
    ...ratingStyleFont,
    color: COLORS.secondaryLightGreyHex
  },
  currency: {
    ...ratingStyleFont,
    color: COLORS.primaryOrangeHex
  }
})

export default CoffeeCard