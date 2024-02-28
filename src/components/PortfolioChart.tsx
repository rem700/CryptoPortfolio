import { Flex, Grid } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import CryptoContext from '../contex/crypto-contex';

const { useBreakpoint } = Grid;

ChartJS.register(ArcElement, Tooltip, Legend);

export function PortfolioChart() {
    const { assets } = useContext(CryptoContext);

    const screens = useBreakpoint();
    const isMobile = screens.xs && !screens.sm;

    const pieWrapperStyle: React.CSSProperties = {
        marginBottom: '1rem',
        height: !isMobile ? 600 : ( assets.length === 0) ? 32 : 300,
    };

    const data = {
        labels: assets.map.length !== 0 ? assets.map(asset => asset.name): undefined,
        datasets: [
            {
                label: '$',
                data: assets.map.length !== 0 ? assets.map(asset => asset.totalAmount) : null,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(255, 255, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Flex justify='center' style={pieWrapperStyle}>
            <Doughnut key={assets.length} data={data} />
        </Flex>
    )
}