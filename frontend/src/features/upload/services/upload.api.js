import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api'

export async function uploadDocument(file) {
  const formData = new FormData()
  formData.append('file', file)

  const res = await axios.post(`${BASE_URL}/ingest`, formData)
  return res.data
}