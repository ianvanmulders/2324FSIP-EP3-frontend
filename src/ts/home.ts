import { contact } from "./api/requestsAPI"

const hamburgerIcon = document.querySelector(".hamburger")

if (hamburgerIcon) {
  hamburgerIcon.addEventListener("click", toggleMenu)
}

function toggleMenu(): void {
  const navLinks = document.querySelector(".nav-menu")
  ;(navLinks as HTMLElement).classList.toggle("open")
  hamburgerIcon.classList.toggle("open")
}

const contactForm = document.querySelector("#contact")
const handleContact = function (e: SubmitEvent) {
  e.preventDefault()
  const formData = new FormData(this as HTMLFormElement)
  const fname = (document.getElementById("fname") as HTMLInputElement).value
  const lname = (document.getElementById("lname") as HTMLInputElement).value
  const email = (document.getElementById("email") as HTMLInputElement).value
  const address = (document.getElementById("address") as HTMLInputElement).value
  const message = (document.getElementById("message") as HTMLInputElement).value
  formData.set("fname", fname)
  formData.set("lname", lname)
  formData.set("email", email)
  formData.set("address", address)
  formData.set("message", message)
  console.log("do i get here")
  contact(formData)
    .then(() => {
      console.log(`email: `, formData.get("email"))
    })
    .catch((e) => console.error(e))
}

if (contactForm) {
  contactForm.addEventListener("submit", handleContact)
}
