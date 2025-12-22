import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
} from '@mui/material'
import {
  Campaign,
  School,
  CardGiftcard,
  Close,
  CalendarToday,
  Business,
} from '@mui/icons-material'
import { newsItems } from '../../data/mockData'

const NewsFeed = () => {
  const [selectedNews, setSelectedNews] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenNews = (news) => {
    setSelectedNews(news)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedNews(null)
  }

  const getNewsIcon = (type) => {
    switch (type) {
      case 'promotion':
        return <Campaign />
      case 'education':
        return <School />
      case 'bonus':
        return <CardGiftcard />
      default:
        return <Campaign />
    }
  }

  const getNewsColor = (type) => {
    switch (type) {
      case 'promotion':
        return 'error'
      case 'education':
        return 'info'
      case 'bonus':
        return 'success'
      default:
        return 'primary'
    }
  }

  const getNewsLabel = (type) => {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const isPromotionActive = (news) => {
    if (!news.validUntil) return true
    return new Date(news.validUntil) >= new Date()
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Новости и акции
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {newsItems.map((news) => (
          <Card
            key={news.id}
            elevation={2}
            sx={{
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  mb: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                      icon={getNewsIcon(news.type)}
                      label={getNewsLabel(news.type)}
                      color={getNewsColor(news.type)}
                      size="small"
                    />
                    {news.clinic && (
                      <Chip
                        icon={<Business />}
                        label={news.clinic}
                        size="small"
                        variant="outlined"
                      />
                    )}
                    {news.validUntil && (
                      <Chip
                        icon={<CalendarToday />}
                        label={`До ${formatDate(news.validUntil)}`}
                        size="small"
                        color={isPromotionActive(news) ? 'success' : 'default'}
                        variant="outlined"
                      />
                    )}
                  </Box>

                  <Typography variant="h5" gutterBottom>
                    {news.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {news.content}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Опубликовано: {formatDate(news.publishedAt)}
                    </Typography>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenNews(news)}
                    >
                      Подробнее
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

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
                  justifyContent: 'space-between',
                  alignItems: 'start',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                    <Chip
                      icon={getNewsIcon(selectedNews.type)}
                      label={getNewsLabel(selectedNews.type)}
                      color={getNewsColor(selectedNews.type)}
                      size="small"
                    />
                    {selectedNews.clinic && (
                      <Chip
                        icon={<Business />}
                        label={selectedNews.clinic}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Typography variant="h5">{selectedNews.title}</Typography>
                </Box>
                <IconButton onClick={handleCloseDialog}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent dividers>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Опубликовано: {formatDate(selectedNews.publishedAt)}
                </Typography>
                {selectedNews.validUntil && (
                  <>
                    {' • '}
                    <Typography
                      variant="caption"
                      color={
                        isPromotionActive(selectedNews) ? 'success.main' : 'text.secondary'
                      }
                      fontWeight="medium"
                    >
                      Действует до {formatDate(selectedNews.validUntil)}
                    </Typography>
                  </>
                )}
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box
                sx={{
                  '& h3': {
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    mt: 3,
                    mb: 2,
                    color: 'text.primary',
                  },
                  '& h4': {
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    mt: 2.5,
                    mb: 1.5,
                    color: 'text.primary',
                  },
                  '& p': {
                    mb: 2,
                    lineHeight: 1.7,
                  },
                  '& ul': {
                    mb: 2,
                    pl: 3,
                  },
                  '& li': {
                    mb: 1,
                    lineHeight: 1.6,
                  },
                  '& strong': {
                    fontWeight: 600,
                    color: 'text.primary',
                  },
                }}
                dangerouslySetInnerHTML={{ __html: selectedNews.detailedContent }}
              />

              {selectedNews.clinic && (
                <Box
                  sx={{
                    mt: 4,
                    p: 2,
                    bgcolor: 'primary.light',
                    borderRadius: 1,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Предложение от клиники
                  </Typography>
                  <Typography variant="h6" color="primary.dark">
                    {selectedNews.clinic}
                  </Typography>
                </Box>
              )}
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseDialog} variant="outlined">
                Закрыть
              </Button>
              {selectedNews.clinic && (
                <Button variant="contained" onClick={handleCloseDialog}>
                  Записаться на консультацию
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default NewsFeed
