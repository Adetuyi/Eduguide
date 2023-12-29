import styled, { keyframes } from 'styled-components';

const animate = keyframes`
from{
    transform: rotate(0deg);
}
to{
    transform: rotate(3600deg);
}
`;

export const Container = styled.div`
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	border: 0.4rem solid #fff;
	border-top-color: #4060ea;
	animation: ${animate} 7s infinite linear;
	box-shadow: 0 0px 4px rgba(18, 18, 18, 0.15);
`;
