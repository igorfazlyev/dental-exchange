import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material'
import {
  Newspaper,
  Discount,
  School,
  CardGiftcard,
  Share,
  Favorite,
  FavoriteBorder,
  Close,
} from '@mui/icons-material'
import { newsItems } from '../../data/mockData'

const PatientNewsFeed = () => {
  const [news] = useState(newsItems)
  const [activeTab, setActiveTab] = useState('all')
  const [favorites, setFavorites] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedNews, setSelectedNews] = useState(null)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleOpenDialog = (newsItem) => {
    setSelectedNews(newsItem)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedNews(null)
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'promotion':
        return <Discount />
      case 'education':
        return <School />
      case 'bonus':
        return <CardGiftcard />
      default:
        return <Newspaper />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'promotion':
        return 'error'
      case 'education':
        return 'info'
      case 'bonus':
        return 'success'
      default:
        return 'default'
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'promotion':
        return 'Акция'
      case 'education':
        return 'Обучение'
      case 'bonus':
        return 'Бонус'
      default:
        return 'Новость'
    }
  }

  // Filter and sort by date (most recent first)
  const filteredNews = (
    activeTab === 'all' ? news : news.filter((item) => item.type === activeTab)
  ).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Newspaper sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4">Новости и акции</Typography>
          <Typography variant="body2" color="text.secondary">
            Актуальные предложения и полезная информация
          </Typography>
        </Box>
      </Box>

      {/* Filter Tabs */}
      <Card sx={{ mb: 3, width: '100%' }} elevation={2}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Все" value="all" />
          <Tab
            label="Акции"
            value="promotion"
            icon={<Discount />}
            iconPosition="start"
          />
          <Tab
            label="Обучение"
            value="education"
            icon={<School />}
            iconPosition="start"
          />
          <Tab
            label="Бонусы"
            value="bonus"
            icon={<CardGiftcard />}
            iconPosition="start"
          />
        </Tabs>
      </Card>

      {/* News List - Full Width */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '100%',
        }}
      >
        {filteredNews.map((item) => (
          <Card
            key={item.id}
            elevation={2}
            sx={{
              width: '100%',
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  mb: 2,
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip
                    icon={getTypeIcon(item.type)}
                    label={getTypeLabel(item.type)}
                    color={getTypeColor(item.type)}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(item.publishedAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Typography>
                </Box>
                {item.validUntil && (
                  <Chip
                    label={`До ${new Date(item.validUntil).toLocaleDateString(
                      'ru-RU'
                    )}`}
                    size="small"
                    variant="outlined"
                    color="warning"
                  />
                )}
              </Box>

              {item.clinic && (
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  {item.clinic}
                </Typography>
              )}

              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {item.content}
              </Typography>
            </CardContent>

            <CardActions>
              <Button size="small" startIcon={<Share />}>
                Поделиться
              </Button>
              <Button
                size="small"
                startIcon={
                  favorites.includes(item.id) ? <Favorite /> : <FavoriteBorder />
                }
                onClick={() => toggleFavorite(item.id)}
                color={favorites.includes(item.id) ? 'error' : 'default'}
              >
                {favorites.includes(item.id) ? 'Сохранено' : 'Сохранить'}
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                size="small"
                variant="contained"
                onClick={() => handleOpenDialog(item)}
              >
                Подробнее
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {filteredNews.length === 0 && (
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              Нет новостей в этой категории
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* News Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        {selectedNews && (
          <>
            <DialogTitle>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                    <Chip
                      icon={getTypeIcon(selectedNews.type)}
                      label={getTypeLabel(selectedNews.type)}
                      color={getTypeColor(selectedNews.type)}
                      size="small"
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      {new Date(selectedNews.publishedAt).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Typography>
                    {selectedNews.validUntil && (
                      <Chip
                        label={`До ${new Date(selectedNews.validUntil).toLocaleDateString('ru-RU')}`}
                        size="small"
                        variant="outlined"
                        color="warning"
                      />
                    )}
                  </Box>
                  {selectedNews.clinic && (
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      {selectedNews.clinic}
                    </Typography>
                  )}
                  <Typography variant="h6">{selectedNews.title}</Typography>
                </Box>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseDialog}
                  sx={{ mt: -1, mr: -1 }}
                >
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box
                sx={{
                  '& h3': { mt: 2, mb: 1, fontSize: '1.25rem', fontWeight: 600 },
                  '& h4': { mt: 2, mb: 1, fontSize: '1.1rem', fontWeight: 600 },
                  '& p': { mb: 2, lineHeight: 1.7 },
                  '& ul': { mb: 2, pl: 3 },
                  '& li': { mb: 1, lineHeight: 1.6 },
                  '& strong': { fontWeight: 600 },
                }}
                dangerouslySetInnerHTML={{ __html: selectedNews.detailedContent }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Закрыть</Button>
              <Button
                startIcon={
                  favorites.includes(selectedNews.id) ? <Favorite /> : <FavoriteBorder />
                }
                onClick={() => toggleFavorite(selectedNews.id)}
                color={favorites.includes(selectedNews.id) ? 'error' : 'default'}
              >
                {favorites.includes(selectedNews.id) ? 'Сохранено' : 'Сохранить'}
              </Button>
              <Button variant="contained" startIcon={<Share />}>
                Поделиться
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default PatientNewsFeed
