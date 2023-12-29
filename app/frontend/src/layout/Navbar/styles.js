import styled from 'styled-components';
import { maxQuery } from '../../utilities/media';

export const Aside = styled.aside`
	background: ${({ theme }) => theme.colors.white};
	border-radius: 0px 40px 40px 0px;
	padding: 2rem 0;
	width: 13.75rem;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	${maxQuery('lg')} {
		display: none;
	}

	.logo {
		margin-bottom: 1.75rem;
		display: grid;
		justify-content: center;

		img {
			max-width: 100%;
			width: 7rem;
		}
	}

	nav {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-grow: 1;
	}
	a.active li {
		color: ${({ theme }) => theme.colors.primary700};
		background: ${({ theme }) => theme.colors.primary100};
		border-right: 4px solid ${({ theme }) => theme.colors.primary700};

		font-weight: 600;

		span {
			display: none;
		}
		span.active {
			display: flex;
		}
	}
	li {
		font-size: 0.75rem;
		line-height: 120%;
		padding: 1rem 2rem 1rem 1.25rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;

		&.isDrop {
			display: block;
			padding: 0;

			&.hasActiveChild,
			:focus,
			:focus-within,
			:hover {
				ul {
					display: block;
				}
				.caret {
					transform: rotate(180deg);
					transition: transform 0.3s ease-in-out;
				}
			}

			> div {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding: 1rem 2rem 1rem 1.25rem;
				cursor: pointer;

				svg:last-child {
					margin-left: auto;
				}
			}
			ul {
				display: none;
			}
			/* .caret {
				margin-left: auto;
			} */
			li {
				padding: 1rem 2rem 1rem 3.4375rem;
			}
		}

		span {
			display: flex;
			align-items: center;
		}
		span.active {
			display: none;
		}
	}
`;
