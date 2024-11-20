import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { createIncome, CreateIncomePayload } from '../api/income';
import { fetchIncomeTypes, IncomeType } from '../api/IncomeTypes';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

interface IncomeDialogProps {
  open: boolean;
  closeModal: () => void;
}


export const IncomeDialog: React.FC<IncomeDialogProps> = ({ open, closeModal }) => {
  const [incomeType, setIncomeType] = useState<string>('')

  // const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
  } = useForm<CreateIncomePayload>();

  const {
    data: incomeTypes,
    isPending
  } = useQuery<IncomeType[]>({
    queryKey: ['income-types'],
    queryFn: fetchIncomeTypes
  });


  const { mutate, isPending: mutationPending } = useMutation({
    mutationFn: (data: CreateIncomePayload) => createIncome(data),
    onSuccess: () => {
      closeModal();
      enqueueSnackbar('Receita registrada com sucesso!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Erro ao registrar a receita.', { variant: 'error' });
    }
  })

  function onSubmit(data: CreateIncomePayload) {
    mutate({
      value: data.amount,
      incomeType: incomeType,
      date: new Date,
      description: 'ih rapaz'
    });
  };

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle>Receita</DialogTitle>
      <DialogContent>
        <TextField
          label="Valor"
          type="number"
          fullWidth
          margin="normal"
          {...register('amount')}
        />
        <Select
          label="Tipo da receita"
          name="typeId"
          fullWidth
          value={incomeType}
          onChange={(e: SelectChangeEvent) => setIncomeType(e.target.value)}
        >
          {
            isPending ? 'carregando...' : incomeTypes?.map((type) => (
              <MenuItem key={type._id} value={type._id}>
                {type.description}
              </MenuItem>
            ))
          }
        </Select>

      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="secondary">
          Cancelar
        </Button>
        <LoadingButton onClick={handleSubmit(onSubmit)} loading={mutationPending} color="primary" variant="contained">
          Criar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};