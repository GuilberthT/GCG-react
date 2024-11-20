import { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Button, Select, MenuItem } from '@mui/material';
import { getTotalExpenses } from '../api/expenses'; 
import { getTotalIncomes } from '../api/income';   
import ExpenseDialog from '@/components/ExpenseDialog';
import IncomeDialog from '@/components/IncomeDialog';
import { months } from '@/constants/months';      // Lista de meses


export const HomePage = () => {
    const [greeting, setGreeting] = useState('');
    const [expenseModal, setExpenseModal] = useState(false);
    const [incomeModal, setIncomeModal] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncomes, setTotalIncomes] = useState(0);
    const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);
    const [isLoadingIncomes, setIsLoadingIncomes] = useState(true)
}

const setGreetingMessage = (_p0: string) => {
    const hour = new Date().getHours();
    if (hour < 12) {
        setGreeting('Bom dia');
    } else if (hour < 18) {
        setGreeting('Boa tarde 🌞')
    } else {
        setGreeting('Boa noite 🌛')
    }
};

useEffect(() => {
    setGreetingMessage();
    fetchExpenses();
    fetchIncomes();
}, [selectedMonth]);

const fetchExpenses = async () => {
    setIsLoadingExpenses(true);
    try {
        const result = await getTotalExpenses(selectedMonth);
        setTotalExpenses(result.total);
    } catch (error) {
        console.error('Erro ao buscar despesas', error)
    } finally {
        setIsLoadingExpenses(false)
    }
};

const fetchIncomes = async () => {
    setIsLoadingIncomes(true);
    try {
        const result = await getTotalIncomes(selectedMonth);
        setTotalIncomes(result.total)
    } catch (error) {
        console.error('Erro ao buscar receitas:', error)
    } finally {
        setIsLoadingIncomes(false);
    }
};

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-Br', { style: 'currency', currency: 'BRL' })
};

const balance = totalIncomes - totalExpenses;

return (
    <Container>
        <ExpenseDialog open={expenseModal} onClose={() => setExpenseModal(false)} />
        <IncomeDialog open={incomeModal} onClose={() => setIncomeModal(false)} />

        <Card variant="outlined" style={{ marginTop: 20, padding: 20 }}>
            <Typography variant="h5" align="center">
                {greeting}
            </Typography>

            <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                fullWidth
                style={{ marginTop: 10 }}
            >
                {months.map((month, index) => (
                    <MenuItem key={index} value={index + 1}>
                        {month}
                    </MenuItem>
                ))}
            </Select>

            <CardContent>
                <div>
                    <Typography>Receita Mensal</Typography>
                    <Typography color="green">{!isLoadingIncomes && formatCurrency(totalIncomes)}</Typography>
                </div>
                <div>
                    <Typography>Despesa Mensal</Typography>
                    <Typography color="red">{!isLoadingExpenses && formatCurrency(totalExpenses)}</Typography>
                </div>
            </CardContent>

            <CardContent>
                <Typography>Saldo Total</Typography>
                <Typography color={balance >= 0 ? 'green' : 'red'}>{formatCurrency(balance)}</Typography>
            </CardContent>

            <Button variant="contained" color="primary" onClick={() => setExpenseModal(true)}>
                Adicionar Despesa
            </Button>
            <Button variant="contained" color="success" onClick={() => setIncomeModal(true)} style={{ marginLeft: 10 }}>
                Adicionar Receita
            </Button>
        </Card>
    </Container>
);