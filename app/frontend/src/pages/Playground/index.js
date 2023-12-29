import { Button, InputGroup } from '../../ui';
import { Container, Flex } from './styles';

const Playground = () => {
	return (
		<Container>
			<h1>App components</h1>
			<h3>Buttons</h3>
			<Flex>
				<Flex direction="column" align="center">
					<Button size="big">Button</Button>

					<ul>
						<li>Props</li>
						<li>Variant: Primary (default)</li>
						<li>Size: Big</li>
					</ul>
				</Flex>

				<Flex direction="column" align="center">
					<Button variant="secondary">Button</Button>

					<ul>
						<li>Props</li>
						<li>Variant: Secondary</li>
						<li>Size: Medium (default)</li>
					</ul>
				</Flex>

				<Flex direction="column" align="center">
					<Button variant="subtle" size="small">
						Button
					</Button>

					<ul>
						<li>Props</li>
						<li>Variant: Subtle</li>
						<li>Size: Small</li>
					</ul>
				</Flex>

				<Flex direction="column" align="center">
					<Button variant="text">Button</Button>

					<ul>
						<li>Props</li>
						<li>Variant: Text</li>
						<li>Size: Medium (default)</li>
					</ul>
				</Flex>

				<Flex direction="column" align="center">
					<Button loading size="big">
						Button
					</Button>

					<ul>
						<li>Props</li>
						<li>Variant: Primary (default)</li>
						<li>Size: Big</li>
						<li>Loading</li>
					</ul>
				</Flex>

				<Flex direction="column" align="center">
					<Button variant="text" loading>
						Button
					</Button>

					<ul>
						<li>Props</li>
						<li>Variant: Text</li>
						<li>Size: Medium (default)</li>
						<li>Loading</li>
					</ul>
				</Flex>
			</Flex>
			<br />
			<br />

			<h3>InputGroup</h3>
			<Flex>
				<div>
					<InputGroup />
					<ul>
						<li>Props of InputGroup</li>
						<li>Size: Large (default)</li>
					</ul>
				</div>

				<div>
					<InputGroup size="medium" disabled />
					<ul>
						<li>Props of InputGroup</li>
						<li>Size: medium</li>
						<li>Disabled</li>
					</ul>
				</div>
			</Flex>
			<br />
			<br />
		</Container>
	);
};

export default Playground;
