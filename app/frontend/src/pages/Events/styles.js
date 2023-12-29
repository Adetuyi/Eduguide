import styled from 'styled-components';
import { maxQuery } from '../../utilities';

export const Container = styled.div`
	.modal--content {
		.row--content {
			.row--items > div {
				display: flex;
				justify-content: space-between;
				margin-bottom: 1rem;

				p:first-child {
					color: ${({ theme }) => theme.colors.neutral600};
					font-size: 0.75rem;
					font-weight: 600;
				}

				p:last-child {
					font-size: 0.875rem;
					color: #051a26;
					font-weight: 600;
				}
			}

			.button--group {
				padding-bottom: 1rem;
			}
		}
		form {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			${maxQuery('md')} {
				gap: 0.5rem;
			}

			> input {
				flex: 1 !important;
			}

			.input--con {
				display: flex;
				gap: 1rem;
				${maxQuery('md')} {
					flex-direction: column;
					gap: 0.5rem;
				}

				> div {
					flex: 1;
				}
			}
		}

		.button--group {
			display: flex;
			justify-content: space-between;

			div:first-child {
				${maxQuery('md')} {
					display: none;
				}
			}

			div:last-child {
				display: flex;
				gap: 1.5rem;
				${maxQuery('md')} {
					width: 100%;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}

	.create--mobile {
		position: fixed;
		bottom: 0;
		right: 2rem;
		cursor: pointer;
		display: none;

		${maxQuery('md')} {
			display: block;
		}
	}
`;
