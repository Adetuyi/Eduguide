import { Spinner } from '../../assets/svgs';
import { StyledButton } from './styles';

const Button = ({ variant = 'primary', loading, children, ...rest }) => {
	return (
		<StyledButton $variant={variant} {...rest}>
			{loading ? variant === 'text' ? 'Loading...' : <Spinner className="spinner" /> : children}
		</StyledButton>
	);
};

export default Button;
