import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const FinanceChart = () => {
    const [transactions, setTransactions] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/txactions');
                console.log(response.data);
                setTransactions(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (transactions.length > 0) {
            const dailyTotal = transactions.reduce((acc, { attributes }) => {
                const date = new Date(attributes.action_datetime).toLocaleDateString();
                if (!acc[date]) {
                    acc[date] = { income: 0, expense: 0 };
                }

                if (attributes.type === 'income') {
                    acc[date].income += attributes.amount;
                } else if (attributes.type === 'expense') {
                    acc[date].expense += attributes.amount;
                }

                return acc;
            }, {});
            const labels = Object.keys(dailyTotal);
            const incomeData = labels.map(date => dailyTotal[date].income);
            const expenseData = labels.map(date => dailyTotal[date].expense);


            if (chartInstance) {
                chartInstance.destroy();
            }

            const ctx = document.getElementById('financeChart').getContext('2d');
            const newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'รายรับ',
                            data: incomeData,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'รายจ่าย',
                            data: expenseData,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    animation: {
                        duration: 2000,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                }
            });

            setChartInstance(newChartInstance);
        }
    }, [transactions]);

    return (
        <div className='App'>
            <header>
                <h1>สรุปเงินในเเต่ละวัน</h1>
            </header>

            <body>
                <canvas id="financeChart" width="80" height="30"></canvas>
            </body>
        </div>
    );
};

export default FinanceChart;
