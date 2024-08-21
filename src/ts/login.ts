import { login } from "./utils/auth"

const loginForm = document.querySelector("#login")
const handleLogin = function (e: SubmitEvent) {
  e.preventDefault()
  const email = (document.getElementById("email") as HTMLInputElement).value
  const password = (document.getElementById("password") as HTMLInputElement)
    .value
  const formData = new FormData(this as HTMLFormElement)
  formData.set("email", email)
  formData.set("password", password)
  login(formData)
    .then(() => {
      location.assign("../")
      console.log(`data: `, formData.get("email"))
    })
    .catch((e) => console.error(e))
}

if (loginForm) {
  loginForm.addEventListener("submit", handleLogin)
}
