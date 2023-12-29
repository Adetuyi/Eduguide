import { NotificationInfo } from '../../assets/svgs';
import { MajorContainer, MinorContainer } from './styles';

const Notification = ({ status = 'info', variant = 'major', message }) => {
	return variant === 'major' ? (
		<MajorContainer $status={status}>
			<NotificationInfo />
			<p>{message}</p>
		</MajorContainer>
	) : (
		<MinorContainer>{message}</MinorContainer>
	);
};

export default Notification;
