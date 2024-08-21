// Filename: product-api.ts

import { Product } from "../types"
import { myFetch } from "../utils/my-fetch.ts"

export const getProtected = async (): Promise<Product[]> => {
  const response = await myFetch(`http://localhost:8080/products`)
  if (!response.ok) {
    throw response.statusText
  }
  const data = (await response.json()) as { products: Product[] }
  return data.products
}
