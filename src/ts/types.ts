// Most interface use id and Name properties anyway, so reuse this as a base.
// It also reminds you about extends, so, that's nice.
interface IdNameObject {
  id: number
  name: string
}

export interface Task extends IdNameObject {
  name: string
}

export type Role = "worker" | "owner"
export interface JWTResponse {
  accessToken: string
  message: string | null
}

export interface DecodedToken {
  iat: number
  exp: number
  sub: number
  email: string
  roles: string[]
}

export interface Product {
  id: number
  name: string
  flavour: string
  description: string | null
  price: number
  stock: number
  is_cake: boolean
}
