import styled from 'styled-components';
import { maxQuery } from '../../utilities';

export default styled.div`
	${maxQuery('md')} {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	> div {
		min-height: fit-content !important;
	}
	.apexcharts-legend {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		place-content: center;
		gap: 0.3rem;
		width: 100%;
	}
`;
