import { login } from "./utils/auth"

const loginForm = document.querySelector("#login")
const handleLogin = function (e: SubmitEvent) {
  e.preventDefault()
  const email = (document.getElementById("email") as HTMLInputElement).value
  const password = (document.getElementById("password") as HTMLInputElement)
    .value
  const formData = new FormData()
  formData.set("email", email)
  formData.set("password", password)
  console.log(formData.entries())
  login(formData)
    .then(() => {
      console.log(`data: `, formData.get("email"))
    })
    .catch((e) => console.error(e))
}

if (loginForm) {
  loginForm.addEventListener("submit", handleLogin)
}
