import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  MenuItem,
  IconButton,
  Collapse,
  Alert,
  LinearProgress,
} from '@mui/material'
import {
  Feedback,
  ExpandMore,
  ExpandLess,
  CheckCircle,
  Warning,
  Error,
  Info,
} from '@mui/icons-material'
import {
  customerComplaints,
  filterDataByDateRange,
  getComplaintsStatistics,
} from '../../data/mockData'
import PeriodSelector from '../../components/PeriodSelector'

const CustomerComplaints = () => {
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterSeverity, setFilterSeverity] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDistrict, setFilterDistrict] = useState('all')
  const [expandedRow, setExpandedRow] = useState(null)

  // Filter data based on selected period
  let filteredComplaints = dateRange.startDate
    ? filterDataByDateRange(customerComplaints, dateRange.startDate, dateRange.endDate, 'date')
    : customerComplaints

  // Apply additional filters
  if (filterCategory !== 'all') {
    filteredComplaints = filteredComplaints.filter(c => c.category === filterCategory)
  }
  if (filterSeverity !== 'all') {
    filteredComplaints = filteredComplaints.filter(c => c.severity === filterSeverity)
  }
  if (filterStatus !== 'all') {
    filteredComplaints = filteredComplaints.filter(c => c.status === filterStatus)
  }
  if (filterDistrict !== 'all') {
    filteredComplaints = filteredComplaints.filter(c => c.district === filterDistrict)
  }

  // Get statistics
  const stats = getComplaintsStatistics(filteredComplaints)

  // Pagination
  const paginatedComplaints = filteredComplaints.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  const getCategoryLabel = (category) => {
    const labels = {
      quality: 'Качество услуг',
      service: 'Обслуживание',
      pricing: 'Ценообразование',
      hygiene: 'Санитария и гигиена',
    }
    return labels[category] || category
  }

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'info',
      medium: 'warning',
      high: 'error',
      critical: 'error',
    }
    return colors[severity] || 'default'
  }

  const getSeverityLabel = (severity) => {
    const labels = {
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий',
      critical: 'Критический',
    }
    return labels[severity] || severity
  }

  const getStatusLabel = (status) => {
    const labels = {
      submitted: 'Подана',
      under_review: 'На рассмотрении',
      resolved: 'Решена',
      rejected: 'Отклонена',
    }
    return labels[status] || status
  }

  const getStatusColor = (status) => {
    const colors = {
      submitted: 'default',
      under_review: 'warning',
      resolved: 'success',
      rejected: 'error',
    }
    return colors[status] || 'default'
  }

  const getStatusIcon = (status) => {
    const icons = {
      submitted: <Info fontSize="small" />,
      under_review: <Warning fontSize="small" />,
      resolved: <CheckCircle fontSize="small" />,
      rejected: <Error fontSize="small" />,
    }
    return icons[status]
  }

  const districts = [...new Set(customerComplaints.map(c => c.district))]

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <Feedback sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h4">Жалобы пациентов</Typography>
      </Box>

      {/* Period Selector */}
      <PeriodSelector onPeriodChange={setDateRange} defaultPeriod="last30days" />

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Всего жалоб
              </Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                На рассмотрении
              </Typography>
              <Typography variant="h4" color="warning.main">
                {stats.byStatus.under_review || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Решено
              </Typography>
              <Typography variant="h4" color="success.main">
                {stats.byStatus.resolved || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Процент решения
              </Typography>
              <Typography variant="h4">{stats.resolutionRate}%</Typography>
              <LinearProgress
                variant="determinate"
                value={parseFloat(stats.resolutionRate)}
                color="success"
                sx={{ mt: 1, height: 6, borderRadius: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Фильтры
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Категория"
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value)
                  setPage(0)
                }}
              >
                <MenuItem value="all">Все категории</MenuItem>
                <MenuItem value="quality">Качество услуг</MenuItem>
                <MenuItem value="service">Обслуживание</MenuItem>
                <MenuItem value="pricing">Ценообразование</MenuItem>
                <MenuItem value="hygiene">Санитария и гигиена</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Серьезность"
                value={filterSeverity}
                onChange={(e) => {
                  setFilterSeverity(e.target.value)
                  setPage(0)
                }}
              >
                <MenuItem value="all">Все уровни</MenuItem>
                <MenuItem value="low">Низкий</MenuItem>
                <MenuItem value="medium">Средний</MenuItem>
                <MenuItem value="high">Высокий</MenuItem>
                <MenuItem value="critical">Критический</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Статус"
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value)
                  setPage(0)
                }}
              >
                <MenuItem value="all">Все статусы</MenuItem>
                <MenuItem value="submitted">Подана</MenuItem>
                <MenuItem value="under_review">На рассмотрении</MenuItem>
                <MenuItem value="resolved">Решена</MenuItem>
                <MenuItem value="rejected">Отклонена</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Район"
                value={filterDistrict}
                onChange={(e) => {
                  setFilterDistrict(e.target.value)
                  setPage(0)
                }}
              >
                <MenuItem value="all">Все районы</MenuItem>
                {districts.map(district => (
                  <MenuItem key={district} value={district}>{district}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Complaints Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Список жалоб
          </Typography>
          {filteredComplaints.length > 0 ? (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell width={40}></TableCell>
                      <TableCell>Дата</TableCell>
                      <TableCell>Клиника</TableCell>
                      <TableCell>Район</TableCell>
                      <TableCell>Категория</TableCell>
                      <TableCell>Серьезность</TableCell>
                      <TableCell>Статус</TableCell>
                      <TableCell>Инспектор</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedComplaints.map((complaint) => (
                      <>
                        <TableRow key={complaint.id} hover>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleExpandRow(complaint.id)}
                            >
                              {expandedRow === complaint.id ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            {new Date(complaint.date).toLocaleDateString('ru-RU')}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              {complaint.clinicName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {complaint.patientName}
                            </Typography>
                          </TableCell>
                          <TableCell>{complaint.district}</TableCell>
                          <TableCell>
                            <Chip
                              label={getCategoryLabel(complaint.category)}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={getSeverityLabel(complaint.severity)}
                              size="small"
                              color={getSeverityColor(complaint.severity)}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getStatusIcon(complaint.status)}
                              label={getStatusLabel(complaint.status)}
                              size="small"
                              color={getStatusColor(complaint.status)}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption">
                              {complaint.assignedInspector}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={8}
                          >
                            <Collapse
                              in={expandedRow === complaint.id}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ py: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                  Описание жалобы:
                                </Typography>
                                <Alert severity="info" sx={{ mb: 2 }}>
                                  {complaint.description}
                                </Alert>

                                {complaint.notes && (
                                  <>
                                    <Typography variant="subtitle2" gutterBottom>
                                      Примечания:
                                    </Typography>
                                    <Alert severity="warning" sx={{ mb: 2 }}>
                                      {complaint.notes}
                                    </Alert>
                                  </>
                                )}

                                {complaint.status === 'resolved' && complaint.resolution && (
                                  <>
                                    <Typography variant="subtitle2" gutterBottom>
                                      Решение:
                                    </Typography>
                                    <Alert severity="success">
                                      <Typography variant="body2" gutterBottom>
                                        {complaint.resolution}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        Дата решения:{' '}
                                        {new Date(complaint.resolutionDate).toLocaleDateString('ru-RU')}
                                      </Typography>
                                    </Alert>
                                  </>
                                )}

                                {complaint.status === 'rejected' && complaint.resolution && (
                                  <>
                                    <Typography variant="subtitle2" gutterBottom>
                                      Причина отклонения:
                                    </Typography>
                                    <Alert severity="error">
                                      <Typography variant="body2" gutterBottom>
                                        {complaint.resolution}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        Дата:{' '}
                                        {new Date(complaint.resolutionDate).toLocaleDateString('ru-RU')}
                                      </Typography>
                                    </Alert>
                                  </>
                                )}
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={filteredComplaints.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Строк на странице:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} из ${count}`
                }
              />
            </>
          ) : (
            <Alert severity="info">
              Нет жалоб за выбранный период с указанными фильтрами
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default CustomerComplaints
