import { Box } from '@mui/material'
import Sidebar from './Sidebar'

const drawerWidth = 280

const Layout = ({ user, onLogout, children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar user={user} onLogout={onLogout} drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // ❌ remove this, it causes the huge gap
          // ml: `${drawerWidth}px`,
          p: 3,
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Layout
