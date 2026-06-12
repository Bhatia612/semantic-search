import '../../shared/styles/global.scss'

function Navbar() {
  return (
    <nav style={{
      borderBottom: '1px solid #1a1a1a',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
        🔍 Semantic Search
      </span>
      <span style={{ color: '#555', fontSize: '0.85rem' }}>
        powered by pgvector
      </span>
    </nav>
  )
}

export default Navbar