import { PalletCon } from './styles';

const Pallet = ({ title, body, color, image }) => {
	return (
		<PalletCon backgroundColor={color}>
			<span>{title}</span>
			<p>{body}</p>

			<img src={image} alt="" />
		</PalletCon>
	);
};

export default Pallet;
