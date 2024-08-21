import { FormValidator } from "./validation"
import { FlavourManager, FieldsetManager, ProductManager } from "./helpClasses"
import { addOptions } from "./utils"

document.addEventListener("DOMContentLoaded", () => {
  const hiddenField: HTMLInputElement = document.getElementById(
    "option",
  ) as HTMLInputElement
  const productList = ["1", "2"]
  const fieldsetManager: FieldsetManager = new FieldsetManager()
  const flavourManager: FlavourManager = new FlavourManager()
  const productManager: ProductManager = new ProductManager(
    "productContainer",
    "addProduct",
    `
     <option value="" > <img src="../img/logo.png" alt="Product 1 Image">Select Ice...</option>
    <option disabled value="">Ice</option>
          <option value="1" > <img src="../img/logo.png" alt="Product 1 Image">Product 1 - Description 1</option>
      <option value="2" >Product 2 - Description 2 <img src="../img/logo.png" alt="Product 2 Image"></option>
`,
  )
  const cakeManager: ProductManager = new ProductManager(
    "cakeContainer",
    "addCake",
    `
               <option value="" > <img src="../img/logo.png" alt="Product 1 Image">Select Cake...</option>
    <option disabled value="">Cake</option>
          <option value="1" > <img src="../img/logo.png" alt="Product 1 Image">Product 1 - Description 1</option>
      <option value="2" >Product 2 - Description 2 <img src="../img/logo.png" alt="Product 2 Image"></option>
`,
  )
  productManager.start()
  cakeManager.start()

  let validator: FormValidator
  addOptions()
  // Code for submit form
  // Code for submit form
  // Code for submit form
  function sendForm() {}

  // Code for form validation
  // Code for form validation
  // Code for form validation

  const form = document.querySelector("form")

  function addRules(index: number) {
    if (index == 0) {
      validator.addValidator({
        name: "name",
        method: (field) => field.value.length >= 2,
        message: "Name must be at least 2 characters long.",
        field: form.elements["name"] as HTMLInputElement,
      })

      validator.addValidator({
        name: "email",
        method: (field) => {
          // Regular expression for basic email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return emailRegex.test(field.value)
        },
        message: "Please enter a valid email address.",
        field: form.elements["email"] as HTMLInputElement,
      })

      validator.addValidator({
        name: "phone",
        method: (field) => {
          // Regular expression for basic phone number validation
          // This allows an empty value or a valid phone number format
          const phoneRegex =
            /^$|^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/
          return phoneRegex.test(field.value)
        },
        message: "Please enter a valid phone number (optional).",
        field: form.elements["phone"] as HTMLInputElement,
      })
      validator.addValidator({
        name: "address",
        method: (field) => {
          // Check if the value is either an empty string or a non-empty string
          return (
            typeof field.value === "string" &&
            (field.value.trim() === "" || field.value.trim().length > 0)
          )
        },
        message: "Please enter a valid address (optional).",
        field: form.elements["address"] as HTMLInputElement,
      })
    }
    if (index == 1) {
      validator.addValidator({
        name: "option",
        method: (field: HTMLInputElement) => {
          // Assuming the field is an <input type="hidden"> element
          return field.value.trim() !== "" // Check if the value is not empty after trimming whitespace
        },
        message: "Please select an option",
        field: hiddenField,
      })
      if (hiddenField.value == "icecream") {
        const iceCreamOptions = document.getElementById("icecream-options")
        const productElements: NodeListOf<HTMLElement> | HTMLElement[] =
          iceCreamOptions ? iceCreamOptions.querySelectorAll(".product") : []
        if (productElements.length < 1) {
          validator.addValidator({
            name: hiddenField.name,
            method: () => false,
            message: "Please add a product",
            field: hiddenField,
          })
        } else {
          productElements.forEach(function (product1, index) {
            const productSelect: HTMLSelectElement = (
              product1 as HTMLElement
            ).querySelector("select")
            const quantityInput: HTMLInputElement = (
              product1 as HTMLElement
            ).querySelector("input")
            const productSelectName = `productSelect_${index}`
            const quantityInputName = `quantityInput_${index}`

            // Set the names for the HTML elements
            productSelect.name = productSelectName
            quantityInput.name = quantityInputName
            //override bridge because of problem with SELECT

            if (!productList.includes(productSelect.value)) {
              validator.addValidator({
                name: hiddenField.name,
                method: () => false,
                message: "Please choose a valid product",
                field: form.elements[productSelectName] as HTMLInputElement,
              })
            }
            validator.addValidator({
              name: quantityInputName,
              method: (field) => parseInt(field.value, 10) >= 1,
              message: "Please enter a valid quantity",
              field: form.elements[quantityInputName] as HTMLInputElement,
            })
          })
        }
      }
      if (hiddenField.value == "icecake") {
        const iceCreamOptions = document.getElementById("icecake-options")
        const productElements: NodeListOf<HTMLElement> | HTMLElement[] =
          iceCreamOptions ? iceCreamOptions.querySelectorAll(".product") : []
        if (productElements.length < 1) {
          validator.addValidator({
            name: hiddenField.name,
            method: () => false,
            message: "Please add a product",
            field: hiddenField,
          })
        } else {
          productElements.forEach(function (product1, index) {
            const productSelect: HTMLSelectElement = (
              product1 as HTMLElement
            ).querySelector("select")
            const quantityInput: HTMLInputElement = (
              product1 as HTMLElement
            ).querySelector("input")
            const productSelectName = `productSelect_${index}`
            const quantityInputName = `quantityInput_${index}`

            // Set the names for the HTML elements
            productSelect.name = productSelectName
            quantityInput.name = quantityInputName
            //override bridge because of problem with SELECT

            if (!productList.includes(productSelect.value)) {
              validator.addValidator({
                name: hiddenField.name,
                method: () => false,
                message: "Please choose a valid product",
                field: form.elements[productSelectName] as HTMLInputElement,
              })
            }
            validator.addValidator({
              name: quantityInputName,
              method: (field) => parseInt(field.value, 10) >= 1,
              message: "Please enter a valid quantity",
              field: form.elements[quantityInputName] as HTMLInputElement,
            })
          })
        }
      }

      if (hiddenField.value == "quote") {
        const quoteOptions = document.getElementById("quote-options")
        const productElements: NodeListOf<HTMLElement> | HTMLElement[] =
          quoteOptions ? quoteOptions.querySelectorAll(".flavour") : []
        if (!(productElements.length >= 1)) {
          validator.addValidator({
            name: hiddenField.name,
            method: () => false,
            message: "Please add a product",
            field: hiddenField,
          })
        } else {
          productElements.forEach(function (product1, index) {
            const productSelect: HTMLSelectElement = (
              product1 as HTMLElement
            ).querySelector("select")
            const quantityInput: HTMLInputElement = (
              product1 as HTMLElement
            ).querySelector("input")
            const productSelectName = `productSelect_${index}`
            const quantityInputName = `quantityInput_${index}`

            // Set the names for the HTML elements
            productSelect.name = productSelectName
            quantityInput.name = quantityInputName

            //validators

            if (!productSelect.checkValidity()) {
              validator.addValidator({
                name: hiddenField.name,
                method: () => false,
                message: "Please choose a valid product",
                field: form.elements[productSelectName] as HTMLInputElement,
              })
            }
            validator.addValidator({
              name: quantityInputName,
              method: (field) => parseInt(field.value, 10) >= 1,
              message: "Please enter a valid quantity",
              field: form.elements[quantityInputName] as HTMLInputElement,
            })
          })
        }
        validator.addValidator({
          name: "eventDate",
          method: (field) => {
            // Add your custom validation logic for the date input
            const currentDate = new Date()
            const selectedDate = new Date(field.value)

            // Calculate the difference in days
            const timeDifference =
              selectedDate.getTime() - currentDate.getTime()
            const daysDifference = timeDifference / (1000 * 3600 * 24)

            return daysDifference >= 7 // Check if the selected date is at least 7 days in the future
          },
          message: "Please select a valid date at least 7 days from today.",
          field: form.elements["event-date"] as HTMLInputElement,
        })
      }
    }
    if (index == 2) {
      if ((form.elements["pickupDate"] as HTMLInputElement).value) {
        validator.addValidator({
          name: "pickupDate",
          method: (field) => {
            const currentDate = new Date()
            const selectedDate = new Date(field.value)

            // Calculate the difference in days
            const timeDifference =
              selectedDate.getTime() - currentDate.getTime()
            const daysDifference = timeDifference / (1000 * 3600 * 24)

            return daysDifference >= 3 // Check if the selected date is at least 7 days in the future
          },
          message: "Please select a valid date at least 3 days from today.",
          field: form.elements["pickupDate"] as HTMLInputElement,
        })
      } else if (
        hiddenField.value == "icecream" ||
        hiddenField.value == "icecake"
      ) {
        validator.addValidator({
          name: "pickupDate",
          method: () => false,
          message: "Please select a pickup date for your order",
          field: form.elements["pickupDate"] as HTMLInputElement,
        })
      }
    }
  }

  function validate(index: number, event: MouseEvent) {
    let isComplete: boolean = false
    if (form instanceof HTMLFormElement) {
      validator = new FormValidator(form)
      console.log(index)
      switch (index) {
        case 0:
          addRules(0)
          break
        case 1:
          addRules(0)
          addRules(1)

          break
        case 2:
          addRules(0)
          addRules(1)
          addRules(2)
          isComplete = true
          break
        default:
          break
      }
      validator.onSubmit(event, false)
      if (isComplete) {
        sendForm()
      }
    }
  }

  //set event listener and validate before next
  fieldsetManager.nextButtons.forEach((nextBtn: HTMLElement, index: number) => {
    nextBtn.addEventListener("click", (event) => validate(index, event))
    nextBtn.addEventListener("click", () => fieldsetManager.handleNext(index))
  })

  fieldsetManager.prevButtons.forEach((prevBtn: HTMLElement, index: number) => {
    prevBtn.addEventListener("click", () =>
      fieldsetManager.handlePrevious(index),
    )
  })

  flavourManager.start()

  // do not remove last line
})
