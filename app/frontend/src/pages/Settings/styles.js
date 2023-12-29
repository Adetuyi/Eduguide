import styled from 'styled-components';

export const Container = styled.div`
	.settings {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.navigation {
		display: flex;
		align-items: center;
		gap: 2rem;
		border-bottom: 1px solid #e4e7ec;

		.active {
			color: ${({ theme }) => theme.colors.primary700};
			border-bottom: 2px solid ${({ theme }) => theme.colors.primary700};
		}

		li {
			color: ${({ theme }) => theme.colors.neutral500};
			font-size: 0.875rem;
			font-weight: 600;
			cursor: pointer;
		}
	}
`;
