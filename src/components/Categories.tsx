import { GestureResponderEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface ICategoryIndex {
  index: number;
  category: any;
}

type PropsType = {
  categories: Array<string>;
  activeIndex: number;
  setCategoryIndex: (value: ICategoryIndex) => void,
}

export default function Categories({ categories, activeIndex, setCategoryIndex }: PropsType) {

  const handlePress = (index: number) => {
    setCategoryIndex({
      index: index,
      category: categories[index]
    })
  }

  return (
    <ScrollView 
     horizontal={true}
     showsHorizontalScrollIndicator={false}
     contentContainerStyle={{
      marginTop: SPACING.space_12,
      justifyContent: "center",
      paddingHorizontal: SPACING.space_30,
     }}
    >
      <View style={{
        gap: 15,
        flexDirection: "row",
      }}>
        {
          categories?.map((category, index) => (
            <View key={index.toString()} style={styles.categoryWrapper}>
              <TouchableOpacity key={index.toString()} style={styles.item} onPress={() => handlePress(+index)}>
                <Text style={[styles.text, activeIndex === index? styles.activeIndex : null]}>
                  { category }
                </Text>
              </TouchableOpacity>
            </View>
          ))
        }
      </View> 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  categoryWrapper: {},
  text: {
    color: COLORS.primaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  activeIndex: {
    color: COLORS.primaryOrangeHex
  },
  item: {
    // alignItems: "center",
    // justifyContent: "center"
  }
})