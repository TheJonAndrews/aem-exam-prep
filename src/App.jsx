import AEMStudyTracker from './AEMStudyTracker.jsx'

const navStyle = {
  background: '#C94F2C',
  fontFamily: 'system-ui, sans-serif',
}

const navInnerStyle = {
  maxWidth: 1100,
  margin: '0 auto',
  padding: '10px 28px',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
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
        <div style={navInnerStyle}>
          <span style={{ color: 'white', fontWeight: 700, marginRight: 8 }}>AEM Exam Prep</span>
          <a href="/" style={linkStyle}>Study Tracker</a>
          <a href="/aem-exam-prep.html" style={linkStyle}>Practice Quiz</a>
        </div>
      </nav>
      <AEMStudyTracker />
    </>
  )
}
