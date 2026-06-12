import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api'

export async function searchDocuments(query, limit = 5) {
  const res = await axios.get(`${BASE_URL}/search`, {
    params: { query, limit }
  })
  return res.data.results
}