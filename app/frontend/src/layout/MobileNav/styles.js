import styled from 'styled-components';
import { minQuery } from '../../utilities';

export const Container = styled.div`
	${minQuery('lg')} {
		display: none;
	}

	.show {
		background: rgba(9, 54, 84, 0.7);
	}

	.close {
		transform: translateX(-110%);
	}
	> div {
		position: fixed;
		top: 0;
		left: 0;
		display: grid;
		place-items: left;
		transition: transform 0.3s ease-in-out;
		z-index: 20;
		width: 100%;
		height: 100%;

		aside {
			position: relative;
			background: ${({ theme }) => theme.colors.white};
			border-radius: 0px 40px 40px 0px;
			padding: 2rem 0;
			width: 13.75rem;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			overflow: auto;

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

				.profile {
					margin-left: 1.25rem;
					:focus,
					:focus-within {
						svg {
							transform: rotate(180deg);
							transition: transform 0.3s ease-in-out;
						}
						.dropdown {
							display: block;
						}
					}
				}

				.initials {
					${({ theme }) => theme.fonts.crimsonPro};
					background: ${({ theme }) => theme.colors.accent600};
					color: ${({ theme }) => theme.colors.white};

					--size: 35px;
					width: var(--size);
					height: var(--size);
					font-size: 0.625rem;
					line-height: 120%;
					font-weight: 600;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					text-transform: uppercase;
				}
				.dropdown--con {
					display: flex;
					align-items: center;
					gap: 0.5rem;
					position: relative;
					cursor: pointer;

					.name {
						font-size: 1rem;
						line-height: 120%;
						font-weight: 600;
						text-transform: capitalize;
					}
					.role {
						font-size: 0.75rem;
						line-height: 120%;
						color: ${({ theme }) => theme.colors.neutral500};
						text-transform: capitalize;
					}
				}
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
				font-size: 0.875rem;
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
		}
	}
`;
