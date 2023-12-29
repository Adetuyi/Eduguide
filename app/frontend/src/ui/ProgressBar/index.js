import { Bar } from './styles';

const ProgressBar = ({ color = 'accent800', fraction, ...rest }) => {
	return <Bar color={color} fraction={fraction} {...rest} />;
};

export default ProgressBar;
