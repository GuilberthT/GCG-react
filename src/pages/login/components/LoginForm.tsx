import React, { useState } from 'react';
import { TextField, Typography, } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { login } from '../../../api/login';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
    email: string;
    password: string;
}

export const LoginForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            setLoading(true);
            const token = await login(data);
            Cookies.set('token', token);

            navigate('/home');
        } catch (error) {
            setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email', { required: 'Email obrigatório' })}
            />

            <TextField
                label="Senha"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password', { required: 'Senha necessária' })}
            />

            {errorMessage && (
                <Typography color="error" align="center" sx={{ mt: 1 }}>
                    {errorMessage}
                </Typography>
            )}

            <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
                fullWidth
                color="primary"
                sx={{ mt: 2 }}
            >
                Entrar
            </LoadingButton>
        </form>
    );
};