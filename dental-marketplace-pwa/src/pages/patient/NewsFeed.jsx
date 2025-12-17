import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Tabs,
  Tab,
  Paper,
  Stack,
} from '@mui/material';
import {
  LocalOffer,
  School,
  Event,
  PlayCircle,
  Article,
  TrendingUp,
} from '@mui/icons-material';
import { mockData } from '../../services/mockData';

export default function NewsFeed() {
  const { newsFeed } = mockData;
  const [filterType, setFilterType] = useState('all');

  const filteredNews = filterType === 'all'
    ? newsFeed
    : newsFeed.filter((item) => item.type === filterType);

  const getIcon = (type) => {
    switch (type) {
      case 'promotion':
        return <LocalOffer />;
      case 'educational':
        return <School />;
      case 'event':
        return <Event />;
      default:
        return <Article />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'promotion':
        return 'error';
      case 'educational':
        return 'info';
      case 'event':
        return 'success';
      default:
        return 'default';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'promotion':
        return 'Акция';
      case 'educational':
        return 'Обучение';
      case 'event':
        return 'Мероприятие';
      default:
        return '';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Новости и акции
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Актуальные предложения, обучающие материалы и события от наших партнеров
        </Typography>
      </Box>

      {/* Filter Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={filterType}
          onChange={(e, value) => setFilterType(value)}
          variant="fullWidth"
        >
          <Tab label="Все" value="all" />
          <Tab label="Акции" value="promotion" icon={<LocalOffer />} iconPosition="start" />
          <Tab label="Обучение" value="educational" icon={<School />} iconPosition="start" />
          <Tab label="Мероприятия" value="event" icon={<Event />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Featured News */}
      {filteredNews.length > 0 && (
        <Card sx={{ mb: 4, overflow: 'hidden' }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: 300,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  {getIcon(filteredNews[0].type)}
                  <Typography variant="h1">🎉</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Chip
                  label={getTypeLabel(filteredNews[0].type)}
                  color={getColor(filteredNews[0].type)}
                  sx={{ mb: 2, width: 'fit-content' }}
                />
                <Typography variant="h5" gutterBottom fontWeight={700}>
                  {filteredNews[0].title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                  {filteredNews[0].description}
                </Typography>
                {filteredNews[0].validUntil && (
                  <Typography variant="body2" color="error.main" gutterBottom>
                    Действует до: {filteredNews[0].validUntil}
                  </Typography>
                )}
                <Button variant="contained" size="large" sx={{ mt: 2 }}>
                  Подробнее
                </Button>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* News Grid */}
      <Grid container spacing={3}>
        {filteredNews.slice(1).map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Image/Icon Header */}
              <Box
                sx={{
                  height: 180,
                  bgcolor: `${getColor(item.type)}.main`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  position: 'relative',
                }}
              >
                <Box sx={{ fontSize: 64 }}>{getIcon(item.type)}</Box>
                {item.durationMin && (
                  <Chip
                    icon={<PlayCircle />}
                    label={`${item.durationMin} мин`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      right: 12,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                    }}
                  />
                )}
              </Box>

              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 2 }}>
                  <Chip label={getTypeLabel(item.type)} size="small" color={getColor(item.type)} sx={{ mb: 1 }} />
                  {item.clinicName && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      {item.clinicName}
                    </Typography>
                  )}
                </Box>

                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                  {item.description}
                </Typography>

                {/* Meta Info */}
                <Box sx={{ mb: 2 }}>
                  {item.validUntil && (
                    <Typography variant="caption" color="error.main" display="block">
                      Действует до: {item.validUntil}
                    </Typography>
                  )}
                  {item.eventDate && (
                    <Typography variant="caption" color="success.main" display="block">
                      Дата: {item.eventDate}
                    </Typography>
                  )}
                </Box>

                {/* Actions */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {item.type === 'promotion' && (
                    <Button variant="contained" size="small" fullWidth>
                      Использовать
                    </Button>
                  )}
                  {item.type === 'educational' && (
                    <Button variant="contained" size="small" fullWidth startIcon={<PlayCircle />}>
                      Начать
                    </Button>
                  )}
                  {item.type === 'event' && (
                    <Button variant="contained" size="small" fullWidth>
                      Зарегистрироваться
                    </Button>
                  )}
                  <Button variant="outlined" size="small">
                    Детали
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 6, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Нет доступных материалов в этой категории
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
