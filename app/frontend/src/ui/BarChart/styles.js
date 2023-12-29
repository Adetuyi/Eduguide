import styled from 'styled-components';

export default styled.div`
	.bar--title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 1rem auto;

		span {
			color: ${({ theme }) => theme.colors.neutral500};
			font-size: 0.75rem;
		}

		h1 {
			font-size: 2.0625rem;
			color: #051a26;
		}
	}
`;
