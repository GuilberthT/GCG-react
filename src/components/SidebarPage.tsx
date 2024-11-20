import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const SidebarPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" style={{ backgroundColor: '#00C853' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Controle de Gastos
        </Typography>
        <Button color="inherit" onClick={() => navigate('/home')}>Visão Geral</Button>
        <Button color="inherit" onClick={() => navigate('/expenses')}>Despesas</Button>
        <Button color="inherit" onClick={() => navigate('/comparativo')}>Comparativo</Button>
        <Button color="inherit" onClick={() => navigate('/incomes')}>Receitas</Button>
        <IconButton color="inherit" onClick={() => navigate('/configuracoes')}>
          <SettingsIcon />
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate('/notificacoes')}>
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate('/perfil')}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default SidebarPage;