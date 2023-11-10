import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

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
  const [ serachText, setSearchText ] = useState("");
  const [ categoryIndex, setCtegoryIndex ] = useState({
    index: 0,
    category: categories[0]
  });

  const [ sortedCoffee, setSortedCoffee ] = useState(getCoffeeList(categoryIndex.category, CoffeeList))
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View>
      <Text>Home Screen</Text>
    </View> 
  )
}

export default HomeScreen

const styles = StyleSheet.create({})