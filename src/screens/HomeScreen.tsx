import { FlatList, NativeSyntheticEvent, ScrollView, StatusBar, StyleSheet, Text, TextInputTextInputEventData, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import Input from '../components/Input';
import Categories from '../components/Categories';
import CoffeeCard from '../components/CoffeeCard';
import { CoffeeType } from "../types/coffee";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  if(category === "All") {
    return data;
  } else {
    const filtered = data.filter((item: any) => item.name === category);
    return filtered;
  }
}

const HomeScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  // stores
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  // AsyncStorage.setItem('test', "12");
  // console.log(useStore.persist.getOptions().storage?.getItem("test"))
  // states
  const [ categories, setCategories ] = useState(getCategoriesFromData(CoffeeList));
  const [ searchText, setSearchText ] = useState<string>("");
  const [ categoryIndex, setCategoryIndex ] = useState({
    index: 0,
    category: categories[0]
  });

  const [ sortedCoffee, setSortedCoffee ] = useState<CoffeeType[]>(getCoffeeList(categoryIndex.category, CoffeeList))

  useLayoutEffect(() => {
    setSortedCoffee([ ...getCoffeeList(categoryIndex.category, CoffeeList) ]);
  }, [ categoryIndex ]);

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={{
      ...styles.ScreenContainer,
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingBottom: insets.bottom,
      paddingRight: insets.right,
    }}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} translucent={true} />
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

        {/* Categories */}
        <View style={styles.listCategoryContainer}>
          <Categories
            categories={categories} 
            activeIndex={categoryIndex.index} 
            setCategoryIndex={setCategoryIndex}
          />
        </View>

        <View>
          <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={sortedCoffee}
            keyExtractor={item => item.id}
            renderItem={(item) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Detail", {
                  itemId: item.item.id,
                  type: item.item.type
                })}
              >
                <CoffeeCard item={item.item} />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.cardContainer}
          />
        </View>

        <View style={{
          marginBottom: tabBarHeight,
          ...styles.beanListContainer
        }}
        >
          <View>
            <Text style={styles.beansListTite}>Coffee beans</Text>
          </View>
          <FlatList 
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={BeanList}
              keyExtractor={item => item.id}
              renderItem={(item) => (
                <TouchableOpacity onPress={() => navigation.navigate('Detail', {
                  itemId: item.item.id,
                  type: item.item.type
                })}>
                  <CoffeeCard item={item.item} />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.cardContainer}
            />
        </View>

      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  cardContainer: {
    paddingHorizontal: SPACING.space_30,
    gap: SPACING.space_30,
  },
  listCategoryContainer: {
    marginBottom: 15
  },
  beanListContainer: {
    marginTop: SPACING.space_36,
  },
  SCrollViewFlex: {
    flexGrow: 1
  },
  screenTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,

  },
  beansListTite: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    paddingLeft: SPACING.space_30,
    marginBottom: SPACING.space_12
  }
})

export default HomeScreen
export const homeScreenStyles = {
  styles
}