import { allProductsObject, allEvents } from "./fetches"

import {
  event,
  popup,
  product,
  removeProduct,
  editProduct,
} from "./api/requestsAPI"

// const testButtonIceCreams = document.querySelector("#ice")
// const testButtonIceCakes = document.querySelector("#cakes")
const showProducts = document.querySelector(".show-products")
const showEvents = document.querySelector(".show-events")
// const deleteButton = document.querySelector("#button-delete")
const buttonAddPopup = document.querySelector(".button-add-popup")
const buttonAddProduct = document.querySelector(".button-add-product")
const buttonAddEvent = document.querySelector(".button-add-event")
const buttonClose = document.querySelectorAll(".close")

const overlayPopup = document.getElementById("overlay-popup")
const overlayProduct = document.getElementById("overlay-product")
const overlayEvent = document.getElementById("overlay-event")
const overlayUpdateProduct = document.getElementById("overlay-update-product")

buttonAddPopup.addEventListener("click", () => {
  overlayPopup.style.display = "flex"
})
buttonAddProduct.addEventListener("click", () => {
  overlayProduct.style.display = "flex"
})
buttonAddEvent.addEventListener("click", () => {
  overlayEvent.style.display = "flex"
})

buttonClose.forEach((button) => {
  button.addEventListener("click", () => {
    overlayPopup.style.display = "none"
    overlayProduct.style.display = "none"
    overlayEvent.style.display = "none"
    overlayUpdateProduct.style.display = "none"
  })
})

const producten = allProductsObject
console.log(producten)
if (producten) {
  const allProducts = producten.products
  allProducts.forEach((product) => {
    console.log(product)
    const divProductInfo = document.createElement("div")
    divProductInfo.classList.add("div-info")

    const divButtons = document.createElement("div")
    divButtons.classList.add("div-buttons")

    const divProduct = document.createElement("div")
    divProduct.classList.add("div-product")

    /* Edit button */
    const buttonEdit = document.createElement("button")
    buttonEdit.textContent = "Edit"
    buttonEdit.setAttribute("id", "button-edit")
    buttonEdit.addEventListener("click", () => {
      overlayUpdateProduct.style.display = "flex"
      const divEditProduct = document.querySelector(".update-product")
      const saveChangesButton = document.querySelector("#saveChanges")
      if (divEditProduct instanceof HTMLElement) {
        divEditProduct.style.display = "block"
      }
      const editProductName = ((
        document.getElementById("editProductName") as HTMLInputElement
      ).value = product.name)

      const editProductFlavour = ((
        document.getElementById("editProductFlavour") as HTMLInputElement
      ).value = product.flavour)

      const editProductDescription = ((
        document.getElementById("editProductDescription") as HTMLInputElement
      ).value = product.description)

      const editProductPrice = ((
        document.getElementById("editProductPrice") as HTMLInputElement
      ).value = product.price)

      const editProductStock = ((
        document.getElementById("editProductStock") as HTMLInputElement
      ).value = String(product.stock))

      const editProductCategory = ((
        document.getElementById("editProductCategory") as HTMLInputElement
      ).value = String(product.category_id))

      const editCakeOrNot = ((
        document.getElementById("editCakeOrNot") as HTMLInputElement
      ).value = String(product.is_cake))

      const editProductData = new FormData()
      const productID = product.id
      console.log(productID)
      saveChangesButton.addEventListener("click", () => {
        console.log(
          editProductName +
            "\n" +
            editProductFlavour +
            "\n" +
            editProductDescription +
            "\n" +
            editProductPrice +
            "\n" +
            editProductStock +
            "\n" +
            editProductCategory +
            "\n" +
            editCakeOrNot,
        )
        editProductData.set(
          "name",
          (document.getElementById("editProductName") as HTMLInputElement)
            .value,
        )
        editProductData.set(
          "flavour",
          (document.getElementById("editProductFlavour") as HTMLInputElement)
            .value,
        )
        editProductData.set(
          "description",
          (
            document.getElementById(
              "editProductDescription",
            ) as HTMLInputElement
          ).value,
        )
        editProductData.set(
          "price",
          (document.getElementById("editProductPrice") as HTMLInputElement)
            .value,
        )
        editProductData.set(
          "stock",
          (document.getElementById("editProductStock") as HTMLInputElement)
            .value,
        )
        editProductData.set(
          "category_id",
          (document.getElementById("editProductCategory") as HTMLInputElement)
            .value,
        )
        editProductData.set(
          "is_cake",
          (document.getElementById("editCakeOrNot") as HTMLInputElement).value,
        )

        editProduct(productID, editProductData)
          .then(() => {
            console.log("Product is successfully updated")
          })
          .catch((error) => {
            console.error("Failed to update product:", error)
          })
      })
    })

    /* Delete button */
    const buttonDelete = document.createElement("button")
    buttonDelete.textContent = "Delete"
    buttonDelete.setAttribute("id", "button-delete")
    buttonDelete.addEventListener("click", () => {
      const productID = product.id
      removeProduct(productID)
        .then(() => {
          console.log("Product is successfully removed")
        })
        .catch((error) => {
          console.error("Failed to delete product:", error)
        })
    })

    const pTagNameEvent = document.createElement("p")
    pTagNameEvent.textContent = `Naam ${product.name}, Smaak: ${product.flavour}`

    divProductInfo.append(pTagNameEvent)
    divButtons.append(buttonEdit)
    divButtons.append(buttonDelete)
    divProduct.append(divProductInfo)
    divProduct.append(divButtons)
    showProducts.append(divProduct)
  })
} else {
  console.log("Failed to fetch products")
}

/* toon alle evenementen */
const evenementen = allEvents
if (evenementen) {
  const alleEvenementen = evenementen.events
  alleEvenementen.forEach((event) => {
    const pTagNameEvent = document.createElement("p")
    pTagNameEvent.classList.add("event")
    pTagNameEvent.textContent = `Naam van het evenement ${event.name}, Datum van het evenement: ${event.date}`
    showEvents.append(pTagNameEvent)
  })
} else {
  console.log("Failed to fetch evenementen")
}

// testButtonIceCreams.addEventListener("click", () => {
//   const dataIceCream = allIceProducts
//   if (dataIceCream) {
//     const allIceCream = dataIceCream.products
//     allIceCream.forEach((productIceCream) => {
//       console.log(`Ice cream = ${productIceCream.name}`)
//     })
//   } else {
//     console.log("Failed to fetch Ice Creams")
//   }
// })
//
// testButtonIceCakes.addEventListener("click", () => {
//   const dataIceCake = allIceCakeProducts
//   if (dataIceCake) {
//     const allIceCakes = dataIceCake.products
//     allIceCakes.forEach((productIceCake) => {
//       console.log(`Ice cake = ${productIceCake.name}`)
//     })
//   } else {
//     console.log("Failed to fetch Ice Cakes")
//   }
// })

const testButtonAddEvent = document.querySelector("#addEventButton")
testButtonAddEvent.addEventListener("click", () => {
  function isValidDate(dateString: string): boolean {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
  }

  function isValidFormattedDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/
    return regex.test(dateString) && isValidDate(dateString)
  }

  const errorsEvent = []
  const eventName = (document.getElementById("nameEvent") as HTMLInputElement)
    .value
  const eventDate = (document.getElementById("dateEvent") as HTMLInputElement)
    .value
  const eventDateAsString: string = eventDate
  const eventUrl = (document.getElementById("url") as HTMLInputElement).value

  const radioButtonClosed = (
    document.getElementById("closed") as HTMLInputElement
  ).checked
  const radioButtonNotClosed = (
    document.getElementById("not_closed") as HTMLInputElement
  ).checked

  const eventData = new FormData()

  if (eventName.trim() === "") {
    errorsEvent.push("Please fill in a name")
  }
  if (eventName.length < 3) {
    errorsEvent.push("Name must at least have 3 characters")
  }
  if (!isValidFormattedDate(eventDateAsString)) {
    errorsEvent.push("Fill in a valid date")
  }
  if (!radioButtonClosed && !radioButtonNotClosed) {
    errorsEvent.push("You didn't select a valid option for closing")
  }

  if (errorsEvent.length > 0) {
    const errorContainer = document.querySelector(".error-container-event")
    errorContainer.textContent = ""
    errorsEvent.forEach((error: string) => {
      const aTag = document.createElement("a")
      aTag.textContent = error
      errorContainer.append(aTag)
    })
  } else {
    eventData.set("name", eventName)
    eventData.set("date", eventDate)
    eventData.set("url", eventUrl)
    if (radioButtonClosed) {
      eventData.set("is_closed", "1")
    } else {
      eventData.set("is_closed", "0")
    }

    event(eventData)
      .then(() => {
        console.log("Event added successfully")
        overlayEvent.style.display = "none"
      })
      .catch((error) => {
        console.error("Failed to add event:", error)
      })
  }
})

const testButtonAddProducts = document.querySelector("#addProduct")
testButtonAddProducts.addEventListener("click", () => {
  const errorsProduct = []
  const errorContainer = document.querySelector(".error-container-product")
  const productName = (
    document.getElementById("productName") as HTMLInputElement
  ).value
  const productFlavour = (
    document.getElementById("productFlavour") as HTMLInputElement
  ).value
  const productDescription = (
    document.getElementById("productDescription") as HTMLInputElement
  ).value
  const productPrice = (
    document.getElementById("productPrice") as HTMLInputElement
  ).value
  const productStock = (
    document.getElementById("productStock") as HTMLInputElement
  ).value

  const inputFiles = document.getElementById("productImage") as HTMLInputElement
  const selectedFile = inputFiles.files[0]

  const productCategory = document.getElementById(
    "productType",
  ) as HTMLSelectElement

  const productCake = (document.getElementById("cake") as HTMLInputElement)
    .checked
  const productNoCake = (
    document.getElementById("not_cake") as HTMLInputElement
  ).checked

  if (productName.trim() === "") {
    errorsProduct.push("Please fill in a name")
  } else if (productName.length < 3) {
    errorsProduct.push("Name must at least have 3 characters")
  }
  if (productFlavour.trim() === "") {
    errorsProduct.push("Fill in a flavour")
  }
  if (productFlavour.length < 3) {
    errorsProduct.push("Flavour must be longer then 3 characters")
  }
  if (productStock < 1) {
    errorsProduct.push("Stock must be bigger then 0")
  }
  if (!productCake && !productNoCake) {
    errorsProduct.push("You didnt select a valid option")
  }

  if (errorsProduct.length > 0) {
    errorContainer.textContent = ""
    errorsProduct.forEach((error: string) => {
      const aLink = document.createElement("a")
      aLink.textContent = error
      errorContainer.append(aLink)
    })
  } else {
    const productData = new FormData()
    productData.append("name", productName)
    productData.append("flavour", productFlavour)
    productData.append("description", productDescription)
    productData.append("price", productPrice)
    productData.append("stock", productStock)
    productData.append("image", selectedFile)
    const selectedValue = productCategory.value
    switch (selectedValue) {
      case "sorbet":
        productData.append("category_id", "1")
        break
      case "artisanal":
        productData.append("category_id", "2")

        break
      case "alcohol":
        productData.append("category_id", "3")
        break
      default:
        errorsProduct.push("You didnt select a valid category")
    }

    if (productCake) {
      productData.append("is_cake", "1")
    } else {
      productData.append("is_cake", "0")
    }

    console.log(productData)
    product(productData)
      .then(() => {
        console.log("Product added successfully")
      })
      .catch((error) => {
        console.error("Failed to add product:", error)
      })
  }
})

const testButtonAddPopup = document.querySelector("#addPopup")
testButtonAddPopup.addEventListener("click", () => {
  const errorsPopup = []
  const errorContainer = document.querySelector(".error-container-popup")
  const startDatum = (document.getElementById("startDate") as HTMLInputElement)
    .value
  const eindDatum = (document.getElementById("endDate") as HTMLInputElement)
    .value
  const userId = (document.getElementById("user_id") as HTMLInputElement).value

  function isValidDate(dateString: string): boolean {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
  }

  function isValidFormattedDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/
    return regex.test(dateString) && isValidDate(dateString)
  }
  if (!isValidFormattedDate(startDatum)) {
    errorsPopup.push("Start date is not a valid date")
  }
  if (!isValidFormattedDate(eindDatum)) {
    errorsPopup.push("End date is not a valid date")
  }

  const startDate = new Date(startDatum)
  const endDate = new Date(eindDatum)
  const timeDifference = endDate.getTime() - startDate.getTime()
  const dayDifference = timeDifference / (1000 * 3600 * 24)
  const amountOfDays: string = dayDifference.toString()
  if (dayDifference < 0) {
    errorsPopup.push("End date must be after start date")
  }
  if (errorsPopup.length > 0) {
    errorContainer.textContent = ""
    errorsPopup.forEach((error: string) => {
      const aLink = document.createElement("a")
      aLink.textContent = error
      errorContainer.append(aLink)
    })
  } else {
    const popupData = new FormData()
    popupData.set("start_date", startDatum)
    popupData.set("end_date", eindDatum)
    popupData.set("frequency_in_days", amountOfDays)
    popupData.set("user_id", userId)

    popup(popupData)
      .then(() => {
        console.log("Popup added successfully")
      })
      .catch((error) => {
        console.error("Failed to add event:", error)
      })
  }
})
