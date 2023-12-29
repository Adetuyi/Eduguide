import styled, { css } from 'styled-components';
import { maxQuery } from '../../utilities';

export const MajorContainer = styled.div`
	background-color: ${({ theme }) => theme.colors.primary500};

	${({ $status, theme }) =>
		$status === 'success' &&
		css`
			background-color: ${theme.colors.success500};
		`}
	${({ $status, theme }) =>
		$status === 'error' &&
		css`
			background-color: ${theme.colors.error500};
		`}

	width: max-content;
	max-width: 80vw;
	padding: 1.25rem 4rem 1.25rem 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	border-radius: 8px;

	${maxQuery('md')} {
		padding: 1rem 3rem 1rem 2rem;
	}
	${maxQuery('xs')} {
		padding: 1rem 1.5rem 1rem 1rem;
	}
	svg {
		flex-shrink: 0;

		${maxQuery('md')} {
			width: 1rem;
			height: 1rem;
		}
	}

	p {
		color: ${({ theme }) => theme.colors.white};

		font-weight: 600;
		line-height: 140%;

		${maxQuery('md')} {
			font-size: 0.875rem;
			line-height: 140%;
		}
	}
`;
export const MinorContainer = styled.p`
	color: ${({ theme }) => theme.colors.white};
	background-color: ${({ theme }) => theme.colors.black};

	padding: 0.75rem 2rem;
`;
