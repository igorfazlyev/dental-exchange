import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Info, FilterList, ShoppingCart } from '@mui/icons-material';
import { mockData, specializationNames, priorityNames } from '../../services/mockData';

export default function TreatmentPlan() {
  const navigate = useNavigate();
  const { treatmentPlan, costBreakdown } = mockData;
  const [selectedItems, setSelectedItems] = useState(treatmentPlan.items.map(i => i.id));
  const [filterSpec, setFilterSpec] = useState('all');

  const handleToggleItem = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const filteredItems = filterSpec === 'all'
    ? treatmentPlan.items
    : treatmentPlan.items.filter(item => item.specialization === filterSpec);

  const calculateSelectedCost = () => {
    const selected = treatmentPlan.items.filter(item => selectedItems.includes(item.id));
    const min = selected.reduce((sum, item) => sum + item.estimatedCostMin, 0);
    const max = selected.reduce((sum, item) => sum + item.estimatedCostMax, 0);
    return { min, max };
  };

  const selectedCost = calculateSelectedCost();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          План лечения
        </Typography>
        <Typography variant="body1" color="text.secondary">
          План №{treatmentPlan.planId} • Создан {treatmentPlan.createdDate}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          {/* Recommendation Alert */}
          <Alert severity="info" icon={<Info />} sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Рекомендация по последовательности лечения
            </Typography>
            <Typography variant="body2">
              {treatmentPlan.recommendations.reason}. Рекомендуемая последовательность:{' '}
              <strong>{treatmentPlan.recommendations.sequence.map(s => specializationNames[s]).join(' → ')}</strong>
            </Typography>
          </Alert>

          {/* Filters */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FilterList />
                  <Typography variant="subtitle1">Фильтр по специализации:</Typography>
                </Box>
                <ToggleButtonGroup
                  value={filterSpec}
                  exclusive
                  onChange={(e, value) => value && setFilterSpec(value)}
                  size="small"
                >
                  <ToggleButton value="all">Все ({treatmentPlan.items.length})</ToggleButton>
                  <ToggleButton value="therapy">Терапия ({costBreakdown.therapy.items})</ToggleButton>
                  <ToggleButton value="orthopedics">Ортопедия ({costBreakdown.orthopedics.items})</ToggleButton>
                  <ToggleButton value="surgery">Хирургия ({costBreakdown.surgery.items})</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </CardContent>
          </Card>

          {/* Treatment Items Table */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Процедуры ({filteredItems.length})
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={filteredItems.every(item => selectedItems.includes(item.id))}
                          onChange={() => {
                            const allSelected = filteredItems.every(item => selectedItems.includes(item.id));
                            if (allSelected) {
                              setSelectedItems(prev => prev.filter(id => !filteredItems.find(i => i.id === id)));
                            } else {
                              setSelectedItems(prev => [...new Set([...prev, ...filteredItems.map(i => i.id)])]);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell><strong>Номер зуба</strong></TableCell>
                      <TableCell><strong>Диагноз</strong></TableCell>
                      <TableCell><strong>Процедура</strong></TableCell>
                      <TableCell><strong>Специализация</strong></TableCell>
                      <TableCell><strong>Приоритет</strong></TableCell>
                      <TableCell align="right"><strong>Стоимость (₽)</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow
                        key={item.id}
                        hover
                        sx={{ opacity: selectedItems.includes(item.id) ? 1 : 0.5 }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleToggleItem(item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body1" fontWeight={700}>
                              №{item.toothNumber}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.toothNumberDisplay.split('(')[1]?.replace(')', '')}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{item.diagnosis}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{item.procedure}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={specializationNames[item.specialization]}
                            size="small"
                            color={
                              item.specialization === 'therapy' ? 'primary' :
                              item.specialization === 'orthopedics' ? 'secondary' : 'warning'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={priorityNames[item.priority]}
                            size="small"
                            color={item.priority === 'high' ? 'error' : 'default'}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={500}>
                            {item.estimatedCostMin.toLocaleString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            до {item.estimatedCostMax.toLocaleString()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar - Cost Summary */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ position: 'sticky', top: 80 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShoppingCart /> Смета
              </Typography>
              <Divider sx={{ my: 2 }} />

              {/* Selected Items Summary */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Выбрано процедур: {selectedItems.length} из {treatmentPlan.items.length}
                </Typography>

                {/* By Specialization */}
                {Object.entries(costBreakdown).map(([key, value]) => {
                  if (key === 'total') return null;
                  const selectedCount = treatmentPlan.items.filter(
                    item => item.specialization === key && selectedItems.includes(item.id)
                  ).length;

                  if (selectedCount === 0) return null;

                  return (
                    <Paper key={key} sx={{ p: 2, mb: 1.5, bgcolor: 'grey.50' }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {specializationNames[key]}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {selectedCount} {selectedCount === 1 ? 'процедура' : 'процедуры'}
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                        {value.minCost.toLocaleString()} - {value.maxCost.toLocaleString()} ₽
                      </Typography>
                    </Paper>
                  );
                })}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Total */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Ориентировочная стоимость
                </Typography>
                <Typography variant="h4" color="primary" fontWeight={700}>
                  {selectedCost.min.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  до {selectedCost.max.toLocaleString()} ₽
                </Typography>
              </Box>

              {/* Actions */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={selectedItems.length === 0}
                onClick={() => navigate('/patient/offers')}
                sx={{ mb: 1 }}
              >
                Получить предложения ({selectedItems.length})
              </Button>
              <Button variant="outlined" size="large" fullWidth>
                Скачать план (PDF)
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
