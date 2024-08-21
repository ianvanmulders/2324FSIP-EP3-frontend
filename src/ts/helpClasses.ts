export class FieldsetManager {
  public readonly nextButtons: NodeListOf<HTMLElement>
  public readonly prevButtons: NodeListOf<HTMLElement>

  constructor() {
    this.nextButtons = document.querySelectorAll(".next")
    this.prevButtons = document.querySelectorAll(".previous")
  }

  private toonFieldset(fieldsetNum: number): void {
    // Verberg alle fieldsets
    document.querySelectorAll("fieldset").forEach((fieldset) => {
      ;(fieldset as HTMLElement).style.display = "none"
    })

    // Toon het gewenste fieldset
    const targetFieldset = document.querySelectorAll("fieldset")[
      fieldsetNum
    ] as HTMLElement
    if (targetFieldset) {
      targetFieldset.style.display = "block"
    } else {
      console.error(`Fieldset with index ${fieldsetNum} not found.`)
    }
  }

  handleNext(index: number): void {
    const hasNextFieldset = index < this.nextButtons.length - 1

    if (hasNextFieldset) {
      const currentFieldset = document.querySelectorAll("fieldset")[
        index
      ] as HTMLElement
      if (currentFieldset) {
        currentFieldset.style.display = "none"
      }

      this.toonFieldset(index + 1)
    }
  }

  handlePrevious(index: number): void {
    const currentFieldset = document.querySelectorAll("fieldset")[
      index
    ] as HTMLElement
    if (currentFieldset) {
      currentFieldset.style.display = "none"
    }

    this.toonFieldset(index)
  }
}

export class ProductManager {
  private productContainer: HTMLElement | null
  private addProductButton: HTMLElement | null
  private productCount: number
  private optionsHTML: string

  constructor(
    productcontainer: string,
    addproductbutton: string,
    optionsHTML: string,
  ) {
    this.productContainer = document.getElementById(productcontainer)
    this.addProductButton = document.getElementById(addproductbutton)
    this.productCount = 0
    this.optionsHTML = optionsHTML
  }

  public start(): void {
    this.addProduct()
    if (this.addProductButton) {
      this.addProductButton.addEventListener("click", () => this.addProduct())
    }

    document.addEventListener("DOMContentLoaded", () => this.initialize())
  }

  private initialize() {
    // Add event listener for initial "Remove Product" buttons
    document.querySelectorAll(".remove-product").forEach((button) => {
      button.addEventListener("click", () => this.removeProduct())
    })
  }

  private addProduct() {
    this.productCount++

    const productGroup = document.createElement("div")
    productGroup.classList.add("product")

    productGroup.innerHTML = `
      <label for="productName${this.productCount}">Select Product:</label>
      <select  title="productSelect[]" name="productSelect${this.productCount}" class="product-select" required>
      ${this.optionsHTML}
        </select>
      <label for="quantity${this.productCount}">Quantity:</label>
      <input type="number" name="quantity${this.productCount}" required min="1" value="1">
      <button type="button" class="remove-product">Remove Product</button>
`
    if (this.productContainer) {
      this.productContainer.appendChild(productGroup)

      // Add event listener to the new "Remove Product" button
      const removeProductButtons = document.querySelectorAll(".remove-product")
      removeProductButtons.forEach((button) => {
        button.addEventListener("click", () => this.removeProduct())
      })
    } else {
      console.error("productContainer not found")
    }
  }

  private removeProduct() {
    const productFieldset = (event.target as HTMLElement).closest(".product")
    if (productFieldset) {
      productFieldset.remove()
    }
  }
}

/* Example Instantiate the ProductManager class
document.addEventListener("DOMContentLoaded", () => {
  const productManager = new ProductManager();
})
*/

export class FlavourManager {
  private readonly flavourContainer: HTMLElement | null
  private readonly addFlavourButton: HTMLElement | null
  private readonly removeFlavourButtons: NodeListOf<HTMLElement>

  private flavourCount: number

  constructor() {
    this.flavourContainer = document.getElementById("flavour-container")
    this.addFlavourButton = document.getElementById("addFlavour")
    this.removeFlavourButtons = document.querySelectorAll(".remove-flavour")
    this.flavourCount = 1
  }

  public start(): void {
    this.setupEventListeners()
  }

  private setupEventListeners(): void {
    if (this.addFlavourButton) {
      this.addFlavourButton.addEventListener("click", () => this.addFlavour())
    }

    this.removeFlavourButtons.forEach((button) => {
      button.addEventListener("click", () => this.removeFlavour())
    })
  }

  private addFlavour(): void {
    this.flavourCount++

    const flavourGroup = document.createElement("div")
    flavourGroup.classList.add("flavour")

    flavourGroup.innerHTML = `
      <label for="flavourName${this.flavourCount}">Select flavour:</label>
    <select  title="flavourSelect[]" name="flavourSelect${this.flavourCount}" required>
    <option disabled value="" >Select Ice Flavor</option>
    <option value="vanilla" >Vanilla</option>
      <option value="chocolate" >Chocolate</option>
      <option value="strawberry" >Strawberry</option>
      </select>
      <label for="quantity${this.flavourCount}">Portions:</label>
    <input type="number" name="quantity${this.flavourCount}" required min="1" value="1">
    <button type="button" class="remove-flavour" >Remove Flavour</button>
      `

    if (this.flavourContainer) {
      const remove = flavourGroup.querySelector(".remove-flavour")
      remove.addEventListener("click", () => this.removeFlavour())
      this.flavourContainer.appendChild(flavourGroup)
    } else {
      console.error("FlavourContainer not found")
    }
  }

  public removeFlavour(): void {
    const flavourFieldset = (event.target as HTMLElement).closest(".flavour")
    if (flavourFieldset) {
      flavourFieldset.remove()
    }
  }
}

// Usage
