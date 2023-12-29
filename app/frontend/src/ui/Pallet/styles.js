import styled from 'styled-components';

export const PalletCon = styled.div`
	padding: 1.5rem 1.25rem;
	box-shadow: 0 0 0 6px ${({ theme }) => theme.colors.white};
	border-radius: 0.5rem;
	width: 15.5rem;
	max-width: 100%;
	position: relative;
	background-color: ${({ backgroundColor, theme }) => theme.colors[backgroundColor] || backgroundColor};
	color: ${({ theme }) => theme.colors.white};
	flex-shrink: 0;

	span {
		font-size: 0.875rem;
		position: relative;
		z-index: 2;
		display: block;
		margin-bottom: 0.5rem;
	}
	p {
		font-size: 1.75rem;
		position: relative;
		z-index: 2;
		font-weight: 700;
	}
	img {
		position: absolute;
		z-index: 1;
		bottom: 0;
		right: 0;
	}
`;
