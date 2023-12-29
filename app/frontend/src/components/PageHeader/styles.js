import styled from 'styled-components';
import { maxQuery, minQuery } from '../../utilities';

export const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 1rem;
	margin-bottom: 0.75rem;

	${maxQuery('lg')} {
		flex-direction: column;
	}

	> h3 {
		${maxQuery('lg')} {
			width: 100%;
		}
	}

	> .welcome {
		${maxQuery('lg')} {
			display: none;
		}
	}

	.profile {
		:focus,
		:focus-within {
			svg {
				transform: rotate(180deg);
				transition: transform 0.3s ease-in-out;
			}
			.dropdown {
				display: block;
				box-shadow: 2px 5px rgba(0, 0, 0, 0.2);
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
		${maxQuery('lg')} {
			display: none;
		}

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
	.dropdown {
		background: ${({ theme }) => theme.colors.white};
		display: none;
		border-radius: 0.5rem;
		position: absolute;
		top: calc(100% + 0.5rem);
		right: 0;
		width: 100%;
		min-width: fit-content;
		z-index: 10;

		a {
			font-size: 0.875rem;
			line-height: 120%;
			display: flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.5rem 1rem;
		}
	}
`;

export const MobileHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;

	.icon-con {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		color: #126da9;
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 1rem;

		img {
			width: 3rem;
		}
	}
	${minQuery('lg')} {
		display: none;
	}
`;
