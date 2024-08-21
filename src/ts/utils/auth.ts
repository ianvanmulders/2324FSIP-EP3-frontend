// Filename: auth.ts

import { DecodedToken, JWTResponse, Role } from "../types"
import { jwtDecode } from "jwt-decode"

//import { ImportMetaEnv } from "../vite-env"
//declare const importMeta: {
//  readonly env: ImportMetaEnv
//}
// Verify the validity of the stored access token.
export const verifyAccessToken = (): DecodedToken | null => {
  try {
    const { accessToken } = getAccessToken()

    if (!accessToken) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    return jwtDecode<DecodedToken>(accessToken) || null
  } catch (error) {
    console.error("Error decoding access token:", error)
    return null
  }
}

// Retrieve the access token from local storage.
export const getAccessToken = (): JWTResponse => {
  return { accessToken: localStorage.getItem("accessToken"), message: "" }
}

export const refreshAccessToken = async (): Promise<void> => {
  try {
    // 1. Make a POST request to the server's refresh token endpoint.
    const response = await fetch("http://localhost:8080/api/refresh-token", {
      method: "POST",
      credentials: "include",
    })

    // 2. Don't forget credentials: 'include' for the request!
    if (!response.ok) {
      // 3. Check if the response is okay; otherwise, throw an error.
      throw new Error(`Failed to refresh access token: ${response.statusText}`)
    }

    // 4. Store the new access token in the application state or local storage.
    const data: JWTResponse = (await response.json()) as JWTResponse
    setAccessToken(data)
  } catch (error) {
    console.error("Error refreshing access token:", error)
    // Handle the error as needed, e.g., redirect to login or display an error message.
  }
}

// Check if the user has a specific role based on the decoded token.
export const hasRole = (role: Role): boolean => {
  console.log("testRoles")
  const decoded = verifyAccessToken()
  const { roles } = decoded || {}
  return Boolean(roles?.includes(role))
}

// Save the received access token to local storage.
const setAccessToken = (data: JWTResponse): void => {
  console.log("data")
  localStorage.setItem("accessToken", data.accessToken)
}

// Handle the user login process.
export const login = async (formData: FormData): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:8080/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`)
    }

    const data: JWTResponse = (await response.json()) as JWTResponse
    setAccessToken(data)
    console.log("data: ", getAccessToken())
  } catch (error) {
    console.error("Login error:", error)
  }
}

// export const login = async (formData: FormData): Promise<void> => {
//   const data = {
//     email: formData.get("email"),
//     password: formData.get("password"),
//   }
//   console.log(data)
//   await fetch("http://localhost:8080/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (response.status === 201) {
//         console.log("Popup was made successfully")
//       } else {
//         console.log("Popup was not made successfully")
//       }
//       console.log("Contact made: ", response)
//     })
//     .catch((err) => console.log(err))
// }

// Clear the access token from local storage, effectively logging out the user.
export const logout = (): void => {
  localStorage.removeItem("accessToken")
}
