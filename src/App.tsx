import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Atoms from './pages/Atoms'
import TransferMap from './pages/TransferMap'
import Learn from './pages/Learn'
import Audit from './pages/Audit'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/atoms" element={<Atoms />} />
        <Route path="/map" element={<TransferMap />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/audit" element={<Audit />} />
      </Routes>
    </Layout>
  )
}
