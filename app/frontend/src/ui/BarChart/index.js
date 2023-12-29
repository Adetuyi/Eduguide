import Chart from 'react-apexcharts';
import Container from './styles';

const BarChart = ({ title, subTitle, barData, customOptions = {} }) => {
	const options = {
		dataLabels: {
			enabled: true,
		},
		fill: {
			colors: ['#E7EAEE'],
			opacity: 1,
		},
		states: {
			hover: {
				filter: {
					type: 'none',
				},
			},
		},
		tooltip: {
			style: {
				fontSize: '14px',
				fontFamily: undefined,
				color: '#051A26',
			},
			y: {
				formatter: function (val) {
					return val;
				},
			},
		},
		yaxis: {
			labels: {
				formatter: function (val) {
					return val;
				},
			},
		},
		plotOptions: {
			bar: {
				borderRadius: 8,
			},
		},
	};

	return (
		<Container>
			<div className="bar--title">
				<span>{title}</span>
				<h1>{subTitle}</h1>
			</div>
			<Chart options={options} series={barData} type="bar" height={320} />
		</Container>
	);
};

export default BarChart;
