import Navbar from './features/shared/components/Navbar'
import AppRoutes from './app.routes'
import './features/shared/styles/global.scss'

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Search your documents
        </h1>
        <p style={{ color: '#888', marginBottom: '2rem' }}>
          Upload a file then search by meaning, not just keywords
        </p>
        <AppRoutes />
      </div>
    </>
  )
}

export default App