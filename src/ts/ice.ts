import { allIceProducts } from "./fetches"

const sorbetIceCream = document.querySelector(".ice-sorbet")
const artisanalIceCream = document.querySelector(".ice-artisanal")
const alcoholIceCream = document.querySelector(".ice-alcohol")

if (allIceProducts) {
  const allIce = allIceProducts.products
  allIce.forEach((iceCream) => {
    const divIceCream = document.createElement("div")
    divIceCream.classList.add("div-ice-cream")
    const nameIceCream = document.createElement("h3")
    const flavourIceCream = document.createElement("p")
    const descriptionIceCream = document.createElement("p")
    const priceIceCream = document.createElement("p")
    const inStock = document.createElement("p")

    nameIceCream.classList.add("name-ice-cream")
    flavourIceCream.classList.add("flavour-ice-cream")
    descriptionIceCream.classList.add("description-ice-cream")
    priceIceCream.classList.add("price-ice-cream")
    inStock.classList.add("instock-ice-cream")

    nameIceCream.textContent = `Name: ${iceCream.name}`
    flavourIceCream.textContent = `Flavour: ${iceCream.flavour}`
    descriptionIceCream.textContent = `Description: ${iceCream.description}`
    priceIceCream.textContent = `Price: €${iceCream.price}/kg`

    if (iceCream.stock > 0) {
      inStock.textContent = "The product is in stock"
    } else {
      inStock.textContent = "The product is not in stock"
    }
    divIceCream.append(
      nameIceCream,
      flavourIceCream,
      descriptionIceCream,
      priceIceCream,
      inStock,
    )
    const category_id = iceCream.category_id
    if (category_id === 1 && sorbetIceCream) {
      sorbetIceCream.append(divIceCream)
    } else if (category_id === 2 && artisanalIceCream) {
      artisanalIceCream.append(divIceCream)
    } else if (category_id === 3 && alcoholIceCream) {
      alcoholIceCream.append(divIceCream)
    }
  })
}
