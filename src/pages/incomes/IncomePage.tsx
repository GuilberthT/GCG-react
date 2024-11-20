import React, { useState } from 'react';
import { IncomeDialog } from '../../components/IncomeDialog';

export const IncomePage: React.FC = () => {

  const [openDialog, setOpenDialog] = useState(false)


  return <div>
    Página de receitas

    <button onClick={() => setOpenDialog(true)}>Abrir modal</button>
    <IncomeDialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}

    />
  </div>;
};

