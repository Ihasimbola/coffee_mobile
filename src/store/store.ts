import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";
import { SizeTypes } from "../types/Size";

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
        const newCartList = [
          ...get().CartList, 
          {
            ...toAdd,
            prices: toAdd.prices.map((item: any) => ({ ...item, count: 1 }))
          }
        ]
        return set({ CartList: newCartList })
      },
      evaluateCartPrice: () => {
        const carts = get().CartList;
        let totalPrice = 0;
        for(let i = 0 ; i < carts.length ; ++i) {
          carts[i].prices.forEach((item: any) => {
            totalPrice += +(item.price) * +(item.count);
          })
        }

        return set({ CartPrice: totalPrice });
      },
      changePriceCount: (action: "add" | "subtract", id: string, index: SizeTypes) => {
        const carts = get().CartList;
        for(let i = 0 ; i < carts.length ; ++i) {
          if(carts[i].id === id) {
            if(action === "subtract") {
              (carts[i].prices[index].count === 0) ?
              carts[i].prices[index].count : carts[i].prices[index].count -= 1
            } else {
              carts[i].prices[index].count += 1;
            }
          }
        }

        return set({ CartList: carts });
      }
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
