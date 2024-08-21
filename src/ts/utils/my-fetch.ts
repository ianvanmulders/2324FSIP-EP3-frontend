// Filename: my-fetch.ts

import {
  getAccessToken,
  refreshAccessToken,
  verifyAccessToken,
  logout,
} from "./auth.ts"

export const myPostFetch = async (
  url: RequestInfo | string,
  init: RequestInit = {},
): Promise<Response> => {
  const decodedToken = verifyAccessToken()
  const currentTimeInSeconds = Math.floor(Date.now() / 1000)

  // add a little margin, 60 seconds, just in case
  if (decodedToken?.exp - 60 < currentTimeInSeconds) {
    await refreshAccessToken().catch(() => {
      // todo: "log out" and redirect?
      logout()
      location.assign("../../")
    })
  }

  init.headers = {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Bearer ${getAccessToken().accessToken}`,
  }
  init.credentials = "include"
  init.method = "POST"

  return fetch(url, init)
}

export const myFetch = async (
  url: RequestInfo | string,
  init: RequestInit = {},
): Promise<Response> => {
  const decodedToken = verifyAccessToken()
  const currentTimeInSeconds = Math.floor(Date.now() / 1000)

  // add a little margin, 60 seconds, just in case
  if (decodedToken?.exp - 60 < currentTimeInSeconds) {
    await refreshAccessToken().catch(() => {
      // todo: "log out" and redirect?
      logout()
      location.assign("../../")
    })
  }

  init.headers = {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Bearer ${getAccessToken().accessToken}`,
  }
  init.credentials = "include"

  return fetch(url, init)
}
