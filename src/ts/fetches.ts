// file with all the fetches
export const VITE_API_BASE_URL: string =
  //TODO: deze link moet nog aangepast worden naar de juiste link
  "http://localhost:8080/api"
// "https://apiGelato.dietersenesael.ikdoeict.be/api"

//export const VITE_API_BASE_URL: string = "https://apiGelato.dietersenesael.ikdoeict.be/api"

export interface Product {
  id?: number
  name: string
  flavour: string
  description?: string
  price?: string
  stock?: number
  category_id?: number
  is_cake?: number
}

export interface Event {
  id?: number
  name: string
  date: string
  url?: string
  is_closed: number
}
export interface Popup {
  id?: number
  start_date: string
  end_date: string
  frequency_in_days?: string
  user_id?: number
}

export const allProducts: string = VITE_API_BASE_URL + "/products"
export const iceProducts: string = VITE_API_BASE_URL + "/ice"
export const cakeProducts: string = VITE_API_BASE_URL + "/cake"
export const events: string = VITE_API_BASE_URL + "/events"
export const infoProduct: string = VITE_API_BASE_URL + "/products/"
export const popups: string = VITE_API_BASE_URL + "/popups/"

//TODO: how to fix this event, doesnt work
// get all events
export const allEvents = await fetch(events, {
  method: "GET",
})
  .then((response) => {
    return response.json() as Promise<{ events: Event[] }>
  })
  .then((events) => {
    console.log("Events:", events)
    return events // Return the array of events
  })
  .catch((err) => console.log(err))

// get all products
export const allProductsObject = await fetch(allProducts, {
  method: "GET",
})
  .then((response) => {
    return response.json() as Promise<{ products: Product[] }>
  })
  .then((products) => {
    console.log("Alle producten: ", products)
    return products
  })
  .catch((err) => console.log(err))

// get product info
export const productInfo = async (productId: number): Promise<void> => {
  const entireLink = `${infoProduct}/${productId}`
  await fetch(entireLink, {
    method: "GET",
  })
    .then((response) => {
      return response.json() as Promise<{ product: Product }>
    })
    .then((products) => {
      console.log(`Info over product`, products)
      return products
    })
    .catch((err) => console.log(err))
}
// get all ice
export const allIceProducts = await fetch(iceProducts, {
  method: "GET",
})
  .then((response) => {
    return response.json() as Promise<{ products: Product[] }>
  })
  .then((products) => {
    console.log("Ice cream: ", products)
    return products
  })
  .catch((err) => console.log(err))

// get all popups
export const allPopups = await fetch(popups, {
  method: "GET",
})
  .then((response) => {
    return response.json() as Promise<{ popups: Popup[] }>
  })
  .then((popups) => {
    console.log("Popup: ", popups)
    return popups
  })
  .catch((err) => console.log(err))

// get all icecakes
export const allIceCakeProducts = await fetch(cakeProducts, {
  method: "GET",
})
  .then((response) => {
    return response.json() as Promise<{ products: Product[] }>
  })
  .then((products) => {
    console.log("Ice cake: ", products)
    return products
  })
  .catch((err) => console.log(err))
