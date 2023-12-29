import styled, { css } from 'styled-components';

export const StyledInputGroup = styled.div`
	position: relative;

	${({ $isSearching }) =>
		$isSearching &&
		css`
			input {
				padding: 0.75rem 1rem 0.75rem 2.5rem !important;
			}

			> svg {
				position: absolute;
				bottom: 50%;
				transform: translateY(50%);
				left: 0.75rem;
				width: 1rem;
			}
		`}

	/* label {
		color: #494848;
		font-weight: 500;
		font-size: 0.875rem;
		line-height: 120%;
		margin-bottom: 0.5rem;
		display: block;
	}

	input,
	textarea {
		display: block;
		width: 100%;
		padding: 1rem 1.5rem;
		font-family: inherit;
		font-size: 0.875rem;
		line-height: 130%;
		border-radius: 0.125rem;
		border: 1px solid rgba(229, 229, 229, 0.7);
		background: rgba(229, 229, 229, 0.1);
	} */
	textarea {
		resize: vertical;
	}
	.action-con {
		position: absolute;
		bottom: 1rem;
		right: 0.75rem;
		display: grid;
		cursor: pointer;

		svg:not(.active) {
			display: none;
		}
	}

	label {
		position: absolute;
		top: 0.375rem;
		left: 1rem;
		line-height: 120%;
		font-size: 0.75rem;
		color: ${({ theme }) => theme.colors.neutral500};

		span {
			color: ${({ theme }) => theme.colors.accent800};
		}
	}

	input {
		border: 1px solid ${({ theme }) => theme.colors.neutral100};
		padding: 1.5rem 1rem 0.5rem;
		font-size: 0.875rem;
		line-height: 140%;
		outline: none;
		width: 100%;
		background: transparent;
		border-radius: 0.25rem;

		:focus {
			border: 1px solid ${({ theme }) => theme.colors.primary700};
		}
		:blank ~ label {
			color: ${({ theme }) => theme.colors.neutral500};
		}
		:disabled {
			color: ${({ theme }) => theme.colors.neutral400};
			background: ${({ theme }) => theme.colors.neutral50};

			~ label {
				&,
				span {
					color: ${({ theme }) => theme.colors.neutral400};
				}
			}
		}
		&[type='password']:valid {
			letter-spacing: 0.175rem;
		}
	}
`;
