import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  List,
  ListItem,
  Divider,
  Alert,
} from '@mui/material'
import {
  CalendarMonth,
  MedicalServices,
  Edit,
  Event,
} from '@mui/icons-material'
import { patientConsultations } from '../../data/mockData'

const PatientConsultations = () => {
  const [consultations] = useState(patientConsultations)

  const specialtyColors = {
    therapy: 'info',
    orthopedics: 'primary',
    surgery: 'warning',
  }

  const specialtyNames = {
    therapy: 'Терапия',
    orthopedics: 'Ортопедия',
    surgery: 'Хирургия',
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CalendarMonth sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4">Мои консультации</Typography>
          <Typography variant="body2" color="text.secondary">
            История посещений и результаты консультаций
          </Typography>
        </Box>
      </Box>

      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            История консультаций
          </Typography>

          <List>
            {consultations.map((consultation, index) => (
              <Box key={consultation.id}>
                <ListItem
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    py: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {consultation.clinicName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Врач: {consultation.doctorName}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Chip
                          label={specialtyNames[consultation.specialty]}
                          size="small"
                          color={specialtyColors[consultation.specialty]}
                        />
                        <Chip
                          icon={<Event />}
                          label={new Date(consultation.date).toLocaleDateString('ru-RU')}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        Результаты приема:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {consultation.results}
                      </Typography>
                    </CardContent>
                  </Card>

                  {consultation.nextAppointment && (
                    <Alert severity="info" icon={<Event />}>
                      Следующая запись: {new Date(consultation.nextAppointment).toLocaleDateString('ru-RU')}
                    </Alert>
                  )}

                  {consultation.canReview && (
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        size="small"
                      >
                        Написать отзыв
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                      >
                        Сообщить о проблеме
                      </Button>
                    </Box>
                  )}
                </ListItem>
                {index < consultations.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>

      {consultations.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <MedicalServices sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              У вас пока нет консультаций
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Запишитесь на прием в клинику через раздел "Предложения клиник"
            </Typography>
            <Button variant="contained">
              Найти клинику
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default PatientConsultations