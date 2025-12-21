import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tabs,
  Tab,
} from '@mui/material'
import {
  Star,
  Edit,
  ReportProblem,
} from '@mui/icons-material'

const PatientReviews = () => {
  const [activeTab, setActiveTab] = useState('write')
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState('review') // 'review' or 'complaint'
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')

  const handleOpenDialog = (type) => {
    setDialogType(type)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setRating(0)
    setText('')
  }

  const handleSubmit = () => {
    // Handle submission
    handleCloseDialog()
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Star sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4">Отзывы и жалобы</Typography>
          <Typography variant="body2" color="text.secondary">
            Поделитесь опытом лечения или сообщите о проблеме
          </Typography>
        </Box>
      </Box>

      <Card sx={{ mb: 3 }} elevation={2}>
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          variant="fullWidth"
        >
          <Tab label="Написать отзыв / жалобу" value="write" />
          <Tab label="Мои отзывы" value="my_reviews" />
          <Tab label="Мои обращения" value="my_complaints" />
        </Tabs>
      </Card>

      {activeTab === 'write' && (
        <Card elevation={2}>
          <CardContent>
            <Alert severity="info" sx={{ mb: 3 }}>
              Отзывы помогают другим пациентам выбрать клинику, а жалобы направляются 
              напрямую в клинику для решения проблемы
            </Alert>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Edit />}
                onClick={() => handleOpenDialog('review')}
              >
                Написать отзыв о клинике
              </Button>
              <Button
                variant="outlined"
                size="large"
                color="error"
                startIcon={<ReportProblem />}
                onClick={() => handleOpenDialog('complaint')}
              >
                Сообщить о проблеме
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {activeTab === 'my_reviews' && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              У вас пока нет отзывов
            </Typography>
          </CardContent>
        </Card>
      )}

      {activeTab === 'my_complaints' && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              У вас нет активных обращений
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Review/Complaint Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'review' ? 'Написать отзыв' : 'Сообщить о проблеме'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'review' && (
            <Box sx={{ mb: 2, mt: 1 }}>
              <Typography gutterBottom>Оцените клинику:</Typography>
              <Rating
                value={rating}
                onChange={(e, v) => setRating(v)}
                size="large"
              />
            </Box>
          )}

          <TextField
            fullWidth
            multiline
            rows={6}
            label={dialogType === 'review' ? 'Ваш отзыв' : 'Опишите проблему'}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              dialogType === 'review'
                ? 'Расскажите о вашем опыте лечения в клинике...'
                : 'Подробно опишите возникшую проблему...'
            }
          />

          {dialogType === 'complaint' && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Жалоба будет направлена руководителю клиники. Вы получите уведомление 
              о статусе обращения.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={dialogType === 'review' ? (!rating || !text) : !text}
          >
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PatientReviews