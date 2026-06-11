import AEMStudyTracker from './AEMStudyTracker.jsx'

const navStyle = {
  background: '#C94F2C',
  padding: '10px 20px',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  fontFamily: 'system-ui, sans-serif',
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 500,
}

export default function App() {
  return (
    <>
      <nav style={navStyle}>
        <span style={{ color: 'white', fontWeight: 700, marginRight: 8 }}>AEM Exam Prep</span>
        <a href="/" style={linkStyle}>Study Tracker</a>
        <a href="/aem-exam-prep.html" style={linkStyle}>Practice Quiz</a>
      </nav>
      <AEMStudyTracker />
    </>
  )
}
