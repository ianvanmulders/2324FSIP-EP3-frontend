export const VITE_API_BASE_URL: string = "http://localhost:8080/api"
//TODO: deze link moet nog aangepast worden naar de juiste link

export const addEvent: string = VITE_API_BASE_URL + "/events"
export const sendMail: string = VITE_API_BASE_URL + "/contact"
export const addPopup: string = VITE_API_BASE_URL + "/popups"
export const editProducts: string = VITE_API_BASE_URL + "/products/"
export const deleteProduct: string = VITE_API_BASE_URL + "/products/"
export const addProduct: string = VITE_API_BASE_URL + "/products/"

export const contact = async (formData: FormData): Promise<void> => {
  const data = {
    fname: formData.get("fname"),
    lname: formData.get("lname"),
    email: formData.get("email"),
    address: formData.get("address"),
    message: formData.get("message"),
  }
  await fetch(sendMail, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
    credentials: "include",
  })
    .then((response) => {
      if (response.status === 201) {
        location.assign("../")
      }
      console.log("Contact made: ", response)
    })
    .catch((err) => console.log(err))
}

export const event = async (eventData: FormData): Promise<void> => {
  const data = {
    name: eventData.get("name"),
    date: eventData.get("date"),
    url: eventData.get("url"),
    is_closed: eventData.get("is_closed"),
  }
  console.log(data)
  await fetch(addEvent, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

export const product = async (productData: FormData): Promise<void> => {
  // const data = {
  //   name: productData.get("name"),
  //   flavour: productData.get("flavour"),
  //   description: productData.get("description"),
  //   price: productData.get("price"),
  //   stock: productData.get("stock"),
  //   category_id: productData.get("category_id"),
  //   is_cake: productData.get("is_cake"),
  //   image_product: productData.get("image"),
  // }
  // console.log(data)
  await fetch(addProduct, {
    method: "POST",
    body: productData,
  })
    .then((response) => {
      if (response.status === 201) {
        console.log("Popup was made successfully")
      } else {
        console.log("Popup was not made successfully")
      }
      console.log("Contact made: ", response)
    })
    .catch((err) => console.log(err))
}

export const popup = async (popupData: FormData): Promise<void> => {
  const data = {
    start_date: popupData.get("start_date"),
    end_date: popupData.get("end_date"),
    frequency_in_days: popupData.get("frequency_in_days"),
    user_id: popupData.get("user_id"),
  }
  console.log(data)
  await fetch(addPopup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 201) {
        console.log("Popup was made successfully")
      } else {
        console.log("Popup was not made successfully")
      }
      console.log("Contact made: ", response)
    })
    .catch((err) => console.log(err))
}

export const editProduct = async (
  productID: number,
  editProductData: FormData,
): Promise<void> => {
  const data = {
    id: productID,
    name: editProductData.get("name"),
    flavour: editProductData.get("flavour"),
    description: editProductData.get("description"),
    price: editProductData.get("price"),
    stock: editProductData.get("stock"),
    category_id: editProductData.get("category_id"),
    is_cake: editProductData.get("is_cake"),
  }

  await fetch(editProducts + productID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((r) => {
      if (r.status === 204) {
        console.log("The product is updated")
      } else {
        console.log("The product wasn't updated")
      }
      console.log(r)
    })
    .catch((err) => console.log(err))
}

export const removeProduct = async function (id: number): Promise<void> {
  await fetch(deleteProduct + id, {
    method: "DELETE",
  })
  // .then((response) => {
  //   if (response.status === 204) {
  //     console.log("The product is successfully removed")
  //   }
  // })
  // .catch((err) => console.log(err))
}
