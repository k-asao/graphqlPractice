interface Region {
  region: number[]
  name: string
}

interface Prefecture {
  region: number
  prefecture: number
  name: string
}

export interface City {
  region: number
  prefecture: number
  city: number
  name: string
}

export interface CityOption {
  region: number
  prefecture: number
  city: number
  cityOption: number | null
  name: string
}
