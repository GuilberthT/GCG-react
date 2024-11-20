import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { createIncome } from '../api/income';
import { IncomeType } from '../api/IncomeTypes';
import { fetchIncomeTypes } from '../api/IncomeTypes';

interface IncomeDialogProps {
  open: boolean;
  onClose: () => void;
}

export const IncomeDialog: React.FC<IncomeDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({ amount: '', typeId: '', description: '', date: '', category: '' });
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  // Fetch income types
  const { data: incomeTypes = [] } = useQuery<IncomeType[]>(['income-types'], async () => {
    const response = await fetchIncomeTypes();
    return response;
  });

  // Mutation to create income
  const mutation = useMutation(
    async (data) => {
      await createIncome(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-total-incomes']);
        onClose();
        enqueueSnackbar('Receita registrada com sucesso!', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('Erro ao registrar a receita.', { variant: 'error' });
      },
    }
  );

  const handleSubmit = () => {
    mutation.mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Receita</DialogTitle>
      <DialogContent>
        <TextField
          label="Valor"
          name="amount"
          type="number"
          fullWidth
          margin="normal"
          value={formData.amount}
          onChange={handleChange}
        />
        <Select
          label="Tipo"
          name="typeId"
          fullWidth
          value={formData.typeId}
          onChange={handleChange}
        >
          {incomeTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
};