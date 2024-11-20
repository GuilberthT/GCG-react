import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

interface InputDateProps {
  value: string | null;
  onChange: (newVaulue: string | null) => void;
}

export const InputDate: React.FC<InputDateProps> = ({ value, onChange }) => {
  const handleRendeInput = (props: any) => (
    <TextField {...props} fullWidth />
  );
  return (
    <div>
      <DatePicker
        value={value}
        onChange={onChange}
        slots={{
          textField: handleRendeInput
        }}
      />
    </div>
  );
};