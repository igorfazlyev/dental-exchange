import { Box } from '@mui/material'
import Sidebar from './Sidebar'

const drawerWidth = 280

const Layout = ({ user, onLogout, children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar user={user} onLogout={onLogout} drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0, // IMPORTANT: prevents overflow/extra space in flex layouts
          p: 3,
          bgcolor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Layout
