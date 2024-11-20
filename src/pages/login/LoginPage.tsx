import React from 'react';
import { LoginForm } from './components/LoginForm';
import { Container, Paper, Typography } from '@mui/material';

export const LoginPage: React.FC = () => {
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Login
                </Typography>
                <Typography variant="body1" align="center" color="textSecondary">
                    Faça login abaixo para acessar sua conta
                </Typography>
                <LoginForm />
            </Paper>
        </Container>
    );
};