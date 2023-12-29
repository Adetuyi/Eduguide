import styled from 'styled-components';
import { maxQuery } from '../../utilities';

export const Container = styled.div`
	display: flex;
	height: 100vh;

	> * {
		overflow: auto;
	}
	main {
		flex: 1;
		padding: 2rem 2rem 1rem;

		${maxQuery('md')} {
			padding: 2rem 1rem;
		}
	}
`;
