import { useState } from 'react'
import { uploadDocument } from '../services/upload.api'

export function useUpload() {
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState(null)

  async function handleUpload(file) {
    if (!file) return

    setUploading(true)
    setStatus(null)

    try {
      const data = await uploadDocument(file)

      if (data.skipped) {
        setStatus({ type: 'info', message: `${data.source} was already ingested` })
      } else {
        setStatus({ type: 'success', message: `Ingested ${data.chunks} chunks from ${data.source}` })
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.error || 'Upload failed' })
    } finally {
      setUploading(false)
    }
  }

  return { uploading, status, handleUpload }
}