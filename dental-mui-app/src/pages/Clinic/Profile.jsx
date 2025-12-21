import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Avatar,
  Chip,
  Alert,
} from '@mui/material'
import { Business, Save, Edit, CheckCircle } from '@mui/icons-material'

const ClinicProfile = () => {
  const [editMode, setEditMode] = useState(false)
  const [clinicData, setClinicData] = useState({
    name: 'Стоматологическая клиника "ДентаПлюс"',
    shortName: 'ДентаПлюс',
    legalName: 'ООО "Стоматологическая клиника ДентаПлюс"',
    inn: '7701234567',
    kpp: '770101001',
    ogrn: '1127746123456',
    license: '№ ЛО-77-01-012345 от 15.03.2020',
    licenseIssuer: 'Департамент здравоохранения г. Москвы',
    licenseValidUntil: '2030-03-15',
    address: 'г. Москва, ул. Тверская, д. 15, стр. 2',
    postalCode: '125009',
    phone: '+7 (495) 123-45-67',
    email: 'info@dentaplus.ru',
    website: 'www.dentaplus.ru',
    director: 'Иванов Иван Иванович',
    chiefDoctor: 'Петрова Марина Сергеевна',
    established: '2015',
    employeesCount: 12,
    chairsCount: 5,
    workingHours: 'Пн-Пт: 09:00-21:00, Сб: 10:00-18:00',
    description:
      'Современная стоматологическая клиника с опытными врачами и новейшим оборудованием. Специализируемся на терапии, ортопедии и хирургии.',
  })

  const handleChange = (field, value) => {
    setClinicData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setEditMode(false)
    alert('Данные клиники сохранены!')
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Business sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4">Профиль клиники</Typography>
            <Typography variant="body2" color="text.secondary">
              Основная информация и реквизиты
            </Typography>
          </Box>
        </Box>
        <Button
          variant={editMode ? 'contained' : 'outlined'}
          startIcon={editMode ? <Save /> : <Edit />}
          onClick={() => (editMode ? handleSave() : setEditMode(true))}
        >
          {editMode ? 'Сохранить' : 'Редактировать'}
        </Button>
      </Box>

      {/* Clinic Header */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'start', gap: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: 32,
              }}
            >
              {clinicData.shortName.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" gutterBottom>
                {clinicData.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                <Chip
                  icon={<CheckCircle />}
                  label="Лицензия действительна"
                  color="success"
                  size="small"
                />
                <Chip label={`С ${clinicData.established} года`} size="small" />
                <Chip
                  label={`${clinicData.employeesCount} сотрудников`}
                  size="small"
                />
                <Chip label={`${clinicData.chairsCount} кресел`} size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {clinicData.description}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Основная информация
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Название клиники"
                value={clinicData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Краткое название"
                value={clinicData.shortName}
                onChange={(e) => handleChange('shortName', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Юридическое название"
                value={clinicData.legalName}
                onChange={(e) => handleChange('legalName', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Адрес"
                value={clinicData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Индекс"
                value={clinicData.postalCode}
                onChange={(e) => handleChange('postalCode', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Телефон"
                value={clinicData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={clinicData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Веб-сайт"
                value={clinicData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Часы работы"
                value={clinicData.workingHours}
                onChange={(e) => handleChange('workingHours', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Описание клиники"
                value={clinicData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Legal Information */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Реквизиты и лицензия
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="ИНН"
                value={clinicData.inn}
                onChange={(e) => handleChange('inn', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="КПП"
                value={clinicData.kpp}
                onChange={(e) => handleChange('kpp', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="ОГРН"
                value={clinicData.ogrn}
                onChange={(e) => handleChange('ogrn', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Лицензия"
                value={clinicData.license}
                onChange={(e) => handleChange('license', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Выдана"
                value={clinicData.licenseIssuer}
                onChange={(e) => handleChange('licenseIssuer', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Действительна до"
                value={clinicData.licenseValidUntil}
                onChange={(e) =>
                  handleChange('licenseValidUntil', e.target.value)
                }
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
          </Grid>

          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Статус лицензии:</strong> Действующая
            </Typography>
            <Typography variant="body2">
              Лицензия действительна до{' '}
              {new Date(clinicData.licenseValidUntil).toLocaleDateString(
                'ru-RU'
              )}
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      {/* Management */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Руководство
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Директор"
                value={clinicData.director}
                onChange={(e) => handleChange('director', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Главный врач"
                value={clinicData.chiefDoctor}
                onChange={(e) => handleChange('chiefDoctor', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Год основания"
                value={clinicData.established}
                onChange={(e) => handleChange('established', e.target.value)}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Количество сотрудников"
                value={clinicData.employeesCount}
                onChange={(e) =>
                  handleChange('employeesCount', Number(e.target.value))
                }
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Количество кресел"
                value={clinicData.chairsCount}
                onChange={(e) =>
                  handleChange('chairsCount', Number(e.target.value))
                }
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {editMode && (
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            Нажмите "Сохранить" чтобы применить изменения
          </Typography>
        </Alert>
      )}
    </Box>
  )
}

export default ClinicProfile
