export function htmlToElement(html: string): HTMLElement {
  const template = document.createElement("template")
  html = html.trim() // Never return a text node of whitespace as the result
  template.innerHTML = html
  return template.content.firstChild as HTMLElement
}

export function selectOption(option: string): void {
  const hiddenField = document.getElementById("option") as HTMLInputElement
  hideOptions()
  const selectedOptions = document.getElementById(`${option}-options`)
  selectedOptions.classList.remove("hidden")
  hiddenField.value = option
  hideOptionButtons()
}

export function hideOptions(): void {
  const iceCreamOptions = document.getElementById("icecream-options")
  const iceCakeOptions = document.getElementById("icecake-options")
  const quoteOptions = document.getElementById("quote-options")

  iceCreamOptions.classList.add("hidden")
  iceCakeOptions.classList.add("hidden")
  quoteOptions.classList.add("hidden")
}

export function addOptions(): void {
  const iceCream: HTMLElement = document.getElementById("icecream")
  const iceCake: HTMLElement = document.getElementById("icecake")
  const quote: HTMLElement = document.getElementById("quote")
  const hiddenField = document.getElementById("option") as HTMLInputElement
  hiddenField.value = ""

  iceCream.classList.remove("hidden")
  iceCake.classList.remove("hidden")
  quote.classList.remove("hidden")
  iceCream.addEventListener("click", () => selectOption("icecream"))
  iceCake.addEventListener("click", () => selectOption("icecake"))
  quote.addEventListener("click", () => selectOption("quote"))
  const prev: HTMLElement = document.getElementById("prevOptions")
  prev.addEventListener("click", () => addOptions())

  hideOptions()
}

export function hideOptionButtons(): void {
  const iceCream: HTMLElement = document.getElementById("icecream")
  const iceCake: HTMLElement = document.getElementById("icecake")
  const quote: HTMLElement = document.getElementById("quote")
  iceCream.classList.add("hidden")
  iceCake.classList.add("hidden")
  quote.classList.add("hidden")
}
