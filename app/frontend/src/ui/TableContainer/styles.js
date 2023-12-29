import styled from 'styled-components';
import { maxQuery } from '../../utilities';

export const Container = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 0.5rem;
	padding: 1rem 1.5rem;

	${maxQuery('md')} {
		padding: 1rem 0.8rem;
	}
	.ant-table-thead > tr > th {
		font-size: 0.75rem;
		color: ${({ theme }) => theme.colors.neutral600};
		font-weight: 600;
	}
	.ant-table-tbody > tr > td {
		font-size: 0.875rem;
		color: #051a26;
		font-weight: 600;
		white-space: nowrap;
	}

	header.table--header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
		padding-top: 0.4rem;
		padding-bottom: 0.8rem;

		h6 {
			font-size: 1.1875rem;
			color: #051a26;
		}
		> a,
		span {
			cursor: pointer;
			color: #126da9;
			font-size: 1rem;
		}
	}

	.form {
		display: flex;
		align-items: center;
		gap: 1rem;

		.button--group {
			display: flex;
			gap: 1rem;

			${maxQuery('md')} {
				display: none;
			}

			.dropdown--con {
				position: relative;
				cursor: pointer;

				:focus,
				:focus-within {
					.dropdown {
						display: block;
					}
				}
				.dropdown {
					background: ${({ theme }) => theme.colors.white};
					display: none;
					border-radius: 0.5rem;
					position: absolute;
					top: calc(100% + 0.5rem);
					right: 0;
					min-width: 100%;
					white-space: nowrap;
					z-index: 5;
					box-shadow: 0px 11.6189px 124.28px rgba(37, 72, 153, 0.17);

					li {
						font-size: 0.875rem;
						color: #051a26;
						align-items: flex-start;
						padding: 0.5rem 1rem;
						cursor: pointer;
					}
				}
			}
		}

		.filter-btn {
			display: none;

			${maxQuery('md')} {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				cursor: pointer;
			}
			.mobile_dropdown--con {
				position: relative;
				> div {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				:focus,
				:focus-within {
					.mobile--dropdown {
						display: block;
					}
				}
				.mobile--dropdown {
					background: ${({ theme }) => theme.colors.white};
					display: none;
					border-radius: 0.5rem;
					position: absolute;
					top: calc(100% + 0.5rem);
					right: 0;
					min-width: 100%;
					white-space: nowrap;
					z-index: 5;
					box-shadow: 0px 11.6189px 124.28px rgba(37, 72, 153, 0.17);

					li {
						font-size: 0.875rem;
						color: #051a26;
						align-items: flex-start;
						padding: 0.5rem 1rem;
						cursor: pointer;
					}
				}
			}
		}
	}
`;
