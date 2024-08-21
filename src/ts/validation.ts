export interface ValidationRule {
  name: string
  method: (field: HTMLInputElement) => boolean
  message: string
  field: HTMLInputElement | NodeList
}

export class FormValidator {
  private validators: ValidationRule[] = []
  private errors: ValidationRule[] = []
  private form: HTMLFormElement

  constructor(form: HTMLFormElement) {
    this.form = form
    this.form.addEventListener("submit", (e) => this.onSubmit(e, false))
  }

  addValidator(rule: ValidationRule): void {
    const field = this.form.elements[rule.name] as HTMLInputElement
    if (field) {
      this.validators.push({ ...rule, field })
    }
  }

  validate(): boolean {
    this.errors = []
    this.validators.forEach((value) => {
      if (
        value.field instanceof HTMLInputElement &&
        !value.method(value.field) &&
        this.errors.filter((err) => err.name === value.name).length === 0
      ) {
        this.errors.push(value)
      }
    })

    return this.errors.length === 0
  }

  onSubmit(event: Event, showInline: boolean): void {
    this.resetSummary()
    this.removeInlineErrors()

    if (!this.validate()) {
      event.preventDefault()
      event.stopImmediatePropagation()
      this.showSummary()
      if (showInline) this.showInlineErrors()
    }
  }

  createInlineError(error: ValidationRule): HTMLSpanElement {
    const span = document.createElement("span")
    span.className = "field-error"
    span.innerText = error.message
    span.id = `${error.name}-error`
    return span
  }

  showInlineErrors(): void {
    this.errors.forEach((err) => {
      const span = this.createInlineError(err)
      if (err.field instanceof HTMLInputElement) {
        this.handleInputElementError(err.field, span)
      } else if (err.field instanceof NodeList) {
        this.handleNodeListError(err.field, span)
      }
    })
  }

  handleInputElementError(
    field: HTMLInputElement,
    span: HTMLSpanElement,
  ): void {
    field.classList.add("invalid")
    field.setAttribute("aria-invalid", "true")
    const label = field.labels?.[0]
    if (label) {
      label.appendChild(span)
    }
  }

  handleNodeListError(field: NodeList, span: HTMLSpanElement): void {
    field.forEach((el: HTMLInputElement) => {
      el.classList.add("invalid")
      el.setAttribute("aria-describedby", span.id)
      el.setAttribute("aria-invalid", "true")
    })
    const fieldset = (field[0] as HTMLElement)?.closest("fieldset")
    if (fieldset) {
      const legend = fieldset.querySelector("legend")
      if (legend) {
        legend.appendChild(span)
      }
    }
  }

  removeInlineErrors(): void {
    this.form
      .querySelectorAll(".field-error")
      .forEach((element) => element.remove())
    this.form.querySelectorAll(".invalid").forEach((element) => {
      element.removeAttribute("aria-invalid")
      element.removeAttribute("aria-describedby")
      element.classList.remove("invalid")
    })
  }

  showSummary(): void {
    const errorSummary = document.querySelector(".error-summary")
    errorSummary.classList.add("show")

    const list = this.form.querySelector(".error-summary ul")
    this.errors.forEach((err) => {
      this.createInlineError(err)
      const listItem = document.createElement("li")
      const link = document.createElement("a")
      link.innerText = err.message
      if (err.field instanceof HTMLInputElement) {
        link.href = `#${err.field.name}`
      } else if (err.field instanceof NodeList) {
        const firstElement = err.field[0] as HTMLElement
        link.href = `#${firstElement
          ?.closest("fieldset")
          ?.querySelector("#male")?.id}`
      }
      listItem.appendChild(link)
      list.appendChild(listItem)
    })
  }

  resetSummary(): void {
    this.form
      .querySelectorAll(".error-summary ul li")
      .forEach((element) => element.remove())
    const errorSummary = document.querySelector(".error-summary")
    errorSummary.classList.remove("show")
  }

  protected validateField(fieldName: string): boolean {
    const validator = this.validators.find((v) => v.name === fieldName)

    if (validator) {
      this.errors = []

      if (
        validator.field instanceof HTMLInputElement &&
        !validator.method(validator.field)
      ) {
        this.errors.push(validator)
        return false
      }
    }

    return true
  }
}

// Example usage:
/*
const form = document.querySelector("form")
const validator = new FormValidator(form)
validator.addValidator({
  name: "username",
  method: (field) => field.value.length >= 3,
  message: "Username must be at least 3 characters long.",
  field: form.elements["username"] as HTMLInputElement,
})

validator.addValidator({
  name: "password",
  method: (field) => field.value.length >= 6,
  message: "Password must be at least 6 characters long.",
  field: form.elements["password"] as HTMLInputElement,
})


// example
const isUsernameValid = validator.validateField("username");

if (isUsernameValid) {
  // Continue with further actions for a valid username.
} else {
  // Handle errors or display messages for the "username" field.
}
*/
