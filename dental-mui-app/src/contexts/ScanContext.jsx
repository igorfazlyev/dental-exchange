// src/contexts/ScanContext.jsx
import { createContext, useContext, useState } from 'react'

const ScanContext = createContext()

export const useScan = () => {
  const context = useContext(ScanContext)
  if (!context) {
    throw new Error('useScan must be used within a ScanProvider')
  }
  return context
}

export const ScanProvider = ({ children }) => {
  const [activeScanId, setActiveScanId] = useState(null)

  return (
    <ScanContext.Provider value={{ activeScanId, setActiveScanId }}>
      {children}
    </ScanContext.Provider>
  )
}
