import { allIceCakeProducts } from "./fetches"

const divAllCakes = document.querySelector(".all-cakes")
if (allIceCakeProducts) {
  const iceCakes = allIceCakeProducts.products
  iceCakes.forEach((iceCake) => {
    const divIceCake = document.createElement("div")
    const nameIceCake = document.createElement("h3")
    const flavourIceCake = document.createElement("p")
    const descriptionIceCake = document.createElement("p")
    const priceIceCake = document.createElement("p")
    const inStock = document.createElement("p")

    divIceCake.classList.add("div-ice-cake")
    nameIceCake.classList.add("name-ice-cake")
    flavourIceCake.classList.add("flavour-ice-cake")
    descriptionIceCake.classList.add("description-ice-cake")
    priceIceCake.classList.add("price-ice-cake")
    inStock.classList.add("instock-ice-cake")

    nameIceCake.textContent = `Name: ${iceCake.name}`
    flavourIceCake.textContent = `Flavour: ${iceCake.flavour}`
    descriptionIceCake.textContent = `Description: ${iceCake.description}`
    priceIceCake.textContent = `Price: €${iceCake.price}/PP`

    if (iceCake.stock > 0) {
      inStock.textContent = "The product is in stock"
    } else {
      inStock.textContent = "The product is not in stock"
    }

    divIceCake.append(
      nameIceCake,
      flavourIceCake,
      descriptionIceCake,
      priceIceCake,
      inStock,
    )
    // if (iceCake.name.trim() !== "") {
    //   divIceCake.append(nameIceCake)
    // }
    // if (iceCake.flavour.trim() !== "") {
    //   divIceCake.append(flavourIceCake)
    // }
    // if (iceCake.description.trim() !== "") {
    //   divIceCake.append(descriptionIceCake)
    // }
    // if (iceCake.price.trim() !== "") {
    //   divIceCake.append(priceIceCake)
    // }
    divAllCakes.append(divIceCake)
  })
} else {
  const ptagNoIceCake = document.createElement("p")
  ptagNoIceCake.textContent = "No ice cakes were found in the database"
}
