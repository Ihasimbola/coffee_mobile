import { NativeSyntheticEvent, ScrollView, StatusBar, StyleSheet, Text, TextInputTextInputEventData, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import Input from '../components/Input';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for(let i = 0 ; i < data.length ; ++i) {
    if(temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
}

const getCoffeeList = (category: string, data: any) => {
  if(category === "All") return data;
  return data.filter((item: any) => item.name === category);
}

const HomeScreen = () => {
  // stores
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);

  // states
  const [ categories, setCategories ] = useState(getCategoriesFromData(CoffeeList));
  const [ searchText, setSearchText ] = useState<string>("");
  const [ categoryIndex, setCtegoryIndex ] = useState({
    index: 0,
    category: categories[0]
  });

  const [ sortedCoffee, setSortedCoffee ] = useState(getCoffeeList(categoryIndex.category, CoffeeList))
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
       contentContainerStyle={styles.SCrollViewFlex}
       showsVerticalScrollIndicator={false}
      >
        {/* Header bar */}
        <HeaderBar />

        <Text style={styles.screenTitle}>
          Find the best {'\n'}coffee for you
        </Text>

        <Input inputValue={searchText} setValue={setSearchText} />

      </ScrollView>
    </View> 
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  SCrollViewFlex: {
    flexGrow: 1
  },

  screenTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,

  }
})