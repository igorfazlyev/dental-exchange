import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Grid,
  Tabs,
  Tab,
} from '@mui/material'
import {
  Newspaper,
  Discount,
  School,
  CardGiftcard,
  Share,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material'
import { newsItems } from '../../data/mockData'

const PatientNewsFeed = () => {
  const [news] = useState(newsItems)
  const [activeTab, setActiveTab] = useState('all')
  const [favorites, setFavorites] = useState([])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
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

  const filteredNews = activeTab === 'all' 
    ? news 
    : news.filter(item => item.type === activeTab)

  return (
    <Box>
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
      <Card sx={{ mb: 3 }} elevation={2}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab label="Все" value="all" />
          <Tab label="Акции" value="promotion" icon={<Discount />} iconPosition="start" />
          <Tab label="Обучение" value="education" icon={<School />} iconPosition="start" />
          <Tab label="Бонусы" value="bonus" icon={<CardGiftcard />} iconPosition="start" />
        </Tabs>
      </Card>

      {/* News Grid */}
      <Grid container spacing={3}>
        {filteredNews.map(item => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Chip
                    icon={getTypeIcon(item.type)}
                    label={getTypeLabel(item.type)}
                    color={getTypeColor(item.type)}
                    size="small"
                  />
                  {item.validUntil && (
                    <Chip
                      label={`До ${new Date(item.validUntil).toLocaleDateString('ru-RU')}`}
                      size="small"
                      variant="outlined"
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
                  startIcon={favorites.includes(item.id) ? <Favorite /> : <FavoriteBorder />}
                  onClick={() => toggleFavorite(item.id)}
                  color={favorites.includes(item.id) ? 'error' : 'default'}
                >
                  {favorites.includes(item.id) ? 'Сохранено' : 'Сохранить'}
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Button size="small" variant="contained">
                  Подробнее
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredNews.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              Нет новостей в этой категории
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default PatientNewsFeed