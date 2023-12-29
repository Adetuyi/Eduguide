import styled from 'styled-components';

export const Container = styled.div`
	.row--items {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;

		&.column {
			flex-direction: column;
		}

		span {
			color: ${({ theme }) => theme.colors.neutral600};
			font-size: 0.875rem;
			font-weight: 600;
		}

		p {
			font-size: 0.875rem;
			color: #051a26;
			font-weight: 600;
		}
	}
`;
