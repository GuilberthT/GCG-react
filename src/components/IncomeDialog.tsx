import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { createIncome, CreateIncomePayload } from '../api/income';
import { fetchIncomeTypes, IncomeType } from '../api/IncomeTypes';
import { useForm, Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface IncomeDialogProps {
  open: boolean;
  closeModal: () => void;
}

interface IncomeForm {
  description: string
  amount: number
  date: Dayjs
  category: string | null
}

export const IncomeDialog: React.FC<IncomeDialogProps> = ({ open, closeModal }) => {
  // const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<IncomeForm>();

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

  function onSubmit(data: IncomeForm) {
    mutate({
      value: data.amount,
      incomeType: data.category,
      date: data.date.format('DD/MM/YYYY'),
      description: data.description
    });
  };

  return (
    <Dialog open={open} onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Receita</DialogTitle>
        <DialogContent>
          <TextField
            label="Descrição"
            fullWidth
            margin="normal"
            {...register('description', { required: true })}
          />
          <span style={{ color: '#fe340c' }}>{errors.description && "A descrição é obrigatória"}</span>
          <TextField
            label="Valor"
            type="number"
            fullWidth
            margin="normal"
            {...register('amount')}
          />
          <span style={{ color: '#fe340c' }}>{errors.amount && "O valor é obrigatório"}</span>
          <Controller
            name="category"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <>
                <Select
                  label="Tipo da receita"
                  fullWidth
                  {...field}
                >
                  {
                    isPending ? 'carregando...' : incomeTypes?.map((type) => (
                      <MenuItem key={type._id} value={type._id}>
                        {type.description}
                      </MenuItem>
                    ))
                  }
                </Select>
              </>
            )
            }
          />
          <Controller
            name="date"
            control={control}
            defaultValue={dayjs()}
            render={(
              { field,
                fieldState: { error }
              }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <DatePicker
                  format="DD/MM/YYYY"
                  {...field}
                  slotProps={{ textField: { error: !!error, helperText: error?.message } }}
                />
              </LocalizationProvider>
            )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Cancelar
          </Button>
          <LoadingButton type="submit" loading={mutationPending} color="primary" variant="contained">
            Criar
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog >
  );
};