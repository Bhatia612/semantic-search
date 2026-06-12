import { useUpload } from '../hooks/useUpload'
import '../styles/upload.scss'

function UploadPage() {
  const { uploading, status, handleUpload } = useUpload()

  function handleDrop(e) {
    e.preventDefault()
    handleUpload(e.dataTransfer.files[0])
  }

  function handleChange(e) {
    handleUpload(e.target.files[0])
  }

  return (
    <div className="upload">
      <div
        className={`upload__dropzone`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="upload__hint">
          {uploading ? 'Processing...' : 'Drag and drop a file here'}
        </p>

        <label className={`upload__label ${uploading ? 'upload__label--disabled' : ''}`}>
          {uploading ? 'Uploading...' : 'Choose File'}
          <input
            type="file"
            accept=".txt,.md,.pdf,.docx"
            onChange={handleChange}
            style={{ display: 'none' }}
            disabled={uploading}
          />
        </label>

        <p className="upload__supported">Supports .txt, .md, .pdf, .docx</p>
      </div>

      {status && (
        <p className={`upload__status upload__status--${status.type}`}>
          {status.message}
        </p>
      )}
    </div>
  )
}

export default UploadPage