import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";

export const useStore = create(
  persist(
    (set, get: any) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      FavoriteList: [],
      CartList: [],
      CartPrice: 0,
      OrderHistoryList: [],
      addToCart: (toAdd: any) => {
        const newCartList = [ ...get().CartList, toAdd ]
        return set({ CartList: newCartList })
      },
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
