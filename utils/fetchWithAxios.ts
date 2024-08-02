import axios from 'axios'
import { SuperHero } from './types'

const url = process.env.NEXT_PUBLIC_BASE_URL
const apiKey = process.env.NEXT_PUBLIC_API_KEY

export const fetchSuperHeroData = async (id: number): Promise<SuperHero | null> => {
  try {
    const response = await axios.get<SuperHero>(`${url}/${apiKey}/${id}`)
    return response.data
  } catch (error) {
    console.error('error fetching data', error)
    return null
  }
}