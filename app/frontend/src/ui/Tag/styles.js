import styled from 'styled-components';

export const Tag = styled.div`
	background: ${({ color, theme }) => (color === '#161331' ? theme.colors.secondary100 : theme.colors.accent100)};
	padding: 4px 10px;
	width: fit-content;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;

	.tag {
		font-size: 0.75rem;
		font-weight: 400;
		color: ${({ color }) => color};
	}
`;
