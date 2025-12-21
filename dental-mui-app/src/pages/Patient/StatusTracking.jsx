import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Alert,
  LinearProgress,
} from '@mui/material'
import {
  CheckBox,
  CheckCircle,
  Schedule,
  RadioButtonUnchecked,
} from '@mui/icons-material'
import { treatmentStages } from '../../data/mockData'

const PatientStatusTracking = () => {
  const [stages] = useState(treatmentStages)

  const getStepIcon = (status) => {
    switch (status) {
      case 'done':
        return <CheckCircle color="success" />
      case 'in_progress':
        return <Schedule color="primary" />
      default:
        return <RadioButtonUnchecked color="disabled" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return 'success'
      case 'in_progress':
        return 'primary'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'done':
        return 'Завершено'
      case 'in_progress':
        return 'В процессе'
      default:
        return 'Не начато'
    }
  }

  const completedStages = stages.filter(s => s.status === 'done').length
  const totalStages = stages.length
  const progress = (completedStages / totalStages) * 100

  const specialtyNames = {
    therapy: 'Терапия',
    orthopedics: 'Ортопедия',
    surgery: 'Хирургия',
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CheckBox sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4">Статус лечения</Typography>
          <Typography variant="body2" color="text.secondary">
            Отслеживайте прогресс выполнения плана лечения
          </Typography>
        </Box>
      </Box>

      {/* Progress Overview */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Общий прогресс
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
            <Typography variant="h6" color="primary">
              {Math.round(progress)}%
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Завершено {completedStages} из {totalStages} этапов
          </Typography>
        </CardContent>
      </Card>

      {/* Treatment Stages */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Этапы лечения
          </Typography>

          <Stepper orientation="vertical" activeStep={stages.findIndex(s => s.status === 'in_progress')}>
            {stages.map((stage, index) => (
              <Step key={stage.id} active={true} completed={stage.status === 'done'}>
                <StepLabel
                  StepIconComponent={() => getStepIcon(stage.status)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {stage.name}
                    </Typography>
                    <Chip
                      label={getStatusLabel(stage.status)}
                      size="small"
                      color={getStatusColor(stage.status)}
                    />
                    {stage.specialty && (
                      <Chip
                        label={specialtyNames[stage.specialty]}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </StepLabel>
                <StepContent>
                  <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                    {stage.status === 'done' && stage.completedAt && (
                      <Typography variant="body2" color="text.secondary">
                        ✅ Завершено: {new Date(stage.completedAt).toLocaleDateString('ru-RU')}
                      </Typography>
                    )}
                    {stage.status === 'in_progress' && (
                      <Alert severity="info" sx={{ mt: 1 }}>
                        Этап в процессе выполнения. Следующий визит запланирован.
                      </Alert>
                    )}
                    {stage.status === 'not_started' && (
                      <Typography variant="body2" color="text.secondary">
                        Этап еще не начат. Будет доступен после завершения предыдущих этапов.
                      </Typography>
                    )}
                  </Paper>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      <Alert severity="success" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Уведомления включены!</strong> Вы будете получать push-уведомления при изменении 
          статуса этапов лечения.
        </Typography>
      </Alert>
    </Box>
  )
}

export default PatientStatusTracking