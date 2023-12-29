import styled from 'styled-components';

export const Bar = styled.div`
	background-color: ${({ theme }) => theme.colors.accent100};
	position: relative;
	height: 0.625rem;
	width: 100%;
	border-radius: 1.5rem;

	::before {
		background-color: ${({ color, theme }) => theme.colors[color] || color};
		width: ${({ fraction }) => `${fraction * 100}%`};
		content: '';
		border-radius: 1.5rem;
		position: absolute;
		height: 100%;
		left: 0;
		top: 0;
	}
`;
