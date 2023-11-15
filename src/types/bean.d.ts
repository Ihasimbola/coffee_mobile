import { IPrices } from "./price"

export type BeanType = {
  id: string,
  name: string,
  description: string,
  roasted: string,
  imagelink_square: any,
  imagelink_portrait: any,
  ingredients: string,
  special_ingredient: string,
  prices: prices[],
  average_rating: number,
  ratings_count: string,
  favourite: boolean,
  type: string,
  index: number,
}