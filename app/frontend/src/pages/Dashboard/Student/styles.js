import styled from 'styled-components';
import { maxQuery } from '../../../utilities';

export const Container = styled.div`
	.page--header {
		h4 {
			font-weight: 700;
			margin-bottom: 0.5rem;
		}
		p {
			color: ${({ theme }) => theme.colors.neutral500};

			span {
				color: ${({ theme }) => theme.colors.black};
				font-weight: 600;
			}
			${maxQuery('lg')} {
				display: none;
			}
		}
	}

	h6 {
		font-weight: 700;
	}

	.statistics--con,
	.table--con {
		flex: 1;
		${maxQuery('lg')} {
			width: 100%;
		}
	}

	.statistics--header {
		display: flex;
		justify-content: space-between;

		div:first-child {
			display: flex;
			align-items: center;
		}
	}

	.category {
		display: flex;
		align-items: center;
		margin-left: 1.5rem;
		border-radius: 8px;
		border: 1px solid ${({ theme }) => theme.colors.neutral500};
		cursor: pointer;

		> span {
			padding: 0.35rem 0.75rem;
			font-size: 0.75rem;
		}

		.active {
			background-color: ${({ theme }) => theme.colors.secondary500};
			color: ${({ theme }) => theme.colors.white} !important;
		}

		span:first-child {
			border-radius: 8px 0 0 8px;
			color: ${({ theme }) => theme.colors.neutral500};
		}

		span:last-child {
			color: ${({ theme }) => theme.colors.neutral500};
			border-radius: 0 8px 8px 0;
		}
		/* .right--section{
			position: relative;
			svg{
				position: absolute;
				
			}
		} */
	}

	.student--con {
		width: 34%;
		${maxQuery('lg')} {
			width: 100%;
		}

		header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 2.5rem;
		}
		> div {
			padding-top: 1.5rem;
		}
	}

	.slots--con {
		width: 34%;
		${maxQuery('lg')} {
			width: 100%;
		}
		> header {
			/* height: 2.5rem; */
			margin-bottom: 1.5rem;

			h6 {
				font-size: 1.1875rem;
				color: #051a26;
			}
		}
	}

	.slots--items--con {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	div.slots--item {
		display: flex;
		width: 100%;
		justify-content: space-between;
		p {
			color: ${({ theme }) => theme.colors.neutral600};
			font-size: 0.875rem;
			width: 35%;
		}

		div.fraction {
			width: 60%;
			display: flex;
			align-items: center;
			gap: 1rem;

			> div {
				flex: 1;
			}
		}
	}
`;

export const FlexBox = styled.div`
	display: flex;
	gap: 2rem;
	margin-bottom: 2rem;

	${maxQuery('lg')} {
		flex-direction: column;
		align-items: center;
	}

	> .statistics--con,
	.slots--con,
	.student--con {
		background-color: ${({ theme }) => theme.colors.white};
		border-radius: 0.5rem;
		padding: 1rem 1.5rem;
		${maxQuery('md')} {
			padding: 1rem 0.8rem;
		}
	}
`;
