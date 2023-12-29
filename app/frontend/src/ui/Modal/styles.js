import styled from 'styled-components';
import { maxQuery } from '../../utilities';

export const ModalCon = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 5;
	background: rgba(9, 54, 84, 0.7);
	display: grid;
	place-items: center;
	${maxQuery('md')} {
		place-items: end;
	}

	.modal--content {
		position: relative;
		width: 65%;
		height: fit-content;
		background: #fff;
		border-radius: 16px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		${maxQuery('md')} {
			height: fit-content;
			width: 100%;
			gap: 1rem;
			padding: 1rem;
		}

		header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			svg {
				position: absolute;
				right: 0;
				top: -40px;
				cursor: pointer;
			}

			h1 {
				color: #051a26;
				font-size: 1.75rem;
			}

			p {
				color: ${({ theme }) => theme.colors.neutral500};
				font-size: 0.75rem;

				span {
					color: #051a26;
					font-weight: 600;
				}
			}
		}

		> center {
			min-height: 300px;
			display: grid;
			place-items: center;
		}
	}
`;
