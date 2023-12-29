import styled from 'styled-components';
import { maxQuery } from '../../utilities';
import { StyledButton, StyledInputGroup } from '../../ui';

export const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	min-height: 100vh;

	${maxQuery('md')} {
		grid-template-columns: 1fr;
	}

	> div {
		:nth-child(1) {
			display: grid;
			place-items: center;
			background: linear-gradient(134.88deg, #0396ff 0%, #abdcff 137.15%);
			color: #fff;

			${maxQuery('md')} {
				display: none;
			}

			h1 {
				font-size: 3rem;
				font-size: clamp(2rem, 0.6667rem + 2.6667vw, 3rem);
			}
		}
		:nth-child(2) {
			display: grid;
			place-items: center;

			form {
				width: 100%;
				max-width: 670px;
				padding: 2rem 3rem;

				${maxQuery('xs')} {
					padding: 2rem 1.5rem;
				}
			}

			h2 {
				font-weight: 600;
				font-size: 2rem;
				line-height: 120%;
			}
			h2 + p {
				font-size: 0.875rem;
				line-height: 200%;
				color: #64748b;
				margin-bottom: 2rem;
			}
			.password-group {
				position: relative;
			}
			${StyledInputGroup}:first-child {
				margin-bottom: 1rem;
			}
			a {
				font-weight: 600;
				font-size: 0.75rem;
				line-height: 120%;
				color: #4060ea;
				display: block;
				margin: 0.5rem 0 0 0.5rem;
				width: max-content;
			}
			${StyledButton} {
				margin-top: 2rem;
				width: 100%;
			}
		}
	}
`;
