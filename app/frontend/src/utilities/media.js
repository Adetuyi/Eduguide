import { theme } from '../base';

const toPixels = (value = 0) => {
	return typeof value === 'number' || value !== 0 ? `${value}px` : 0;
};

const BREAKPOINTS = theme.breakpoints;

const breakpoints = Object.keys(BREAKPOINTS).reduce((acc, curr) => {
	const currentValue = BREAKPOINTS[curr];

	return Object.assign(acc, {
		[curr]: currentValue,
		[`>${curr}`]: currentValue + 1,
		[`<${curr}`]: currentValue - 1,
	});
}, {});

const getBreakpointsInPx = (breakpoint) => {
	return typeof breakpoint === 'number' ? toPixels(breakpoint) : breakpoint in breakpoints ? toPixels(breakpoints[breakpoint]) : breakpoint;
};

export const minQuery = (breakpoint) => {
	return `@media(min-width: ${getBreakpointsInPx(breakpoint)})`;
};

export const maxQuery = (breakpoint) => {
	return `@media(max-width: ${getBreakpointsInPx(breakpoint)})`;
};

export const minMaxQuery = (min, max) => {
	return `@media(max-width: ${getBreakpointsInPx(max)}) and (min-width: ${getBreakpointsInPx(min)})`;
};
