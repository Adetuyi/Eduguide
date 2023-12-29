import styled, { css } from 'styled-components';

export const StyledSelectGroup = styled.div`
	position: relative;
	height: max-content;

	:focus-within {
		.chevron-con svg {
			transform: rotate(180deg);
		}
		ul {
			display: block;
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
	}
	.selected-options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.625rem;

		span {
			display: flex;
			padding: 0.625rem 1rem;
			align-items: center;
			gap: 0.25rem;
			border-radius: 6.25rem;
			background: #f9f9f9;
			font-size: 0.75rem;
			font-weight: 500;
			line-height: 132%;
		}
		svg {
			cursor: pointer;
		}
	}
	.input-icon-group {
		position: relative;

		.chevron-con {
			position: absolute;
			bottom: 0.85rem;
			right: 0.75rem;
			display: grid;
			padding: 0.5rem;
			pointer-events: none;
		}
	}
	ul {
		background: #fff;
		box-shadow: 0 0 4px #e4e7ec;
		overflow: auto;
		border-radius: 0.25rem;
		position: absolute;
		left: 0;
		width: 100%;
		z-index: 3;
		display: none;
		max-height: 270px;
		bottom: calc(100% + 0.5rem);

		${({ $dropdownPosBottom }) =>
			$dropdownPosBottom &&
			css`
				top: calc(100% + 0.5rem);
				bottom: unset;
			`}

		li {
			font-size: 0.875rem;
			cursor: pointer;
			outline: none;
			padding: 0.5rem 1rem;

			:hover,
			:focus {
				background: #f9fafb;
			}
			&.active {
				background: #ecf1fe;
			}
		}
	}
`;
