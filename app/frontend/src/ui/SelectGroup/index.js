import { StyledSelectGroup } from './styles';
import { ChevronDown, SelectClose } from '../../assets/svgs';
import { useState, useEffect } from 'react';

const SelectGroup = ({
	label,
	value = '',
	onChange,
	placeholder,
	variant = 'single',
	name,
	dropdownPosBottom = false,
	options = [],
	emptyOptionsMessage = 'No option to display',
	required = false,
	max = Infinity,
	loading = false,
	shouldFilterByDefault = true,
	...rest
}) => {
	const [inputVal, setInputVal] = useState(variant === 'single' ? value || '' : '');
	const [shouldFilter, setShouldFilter] = useState(shouldFilterByDefault);

	const handleBlur = (event) => {
		if (event.relatedTarget?.tagName === 'LI') return;

		let eventValue = event.target.value;
		let selectedOption = options.find((option) => option?.toLowerCase() === eventValue.toLowerCase()) || '';

		setShouldFilter(false);

		if (variant === 'single') {
			setInputVal(selectedOption);
			onChange(undefined, name, selectedOption);
		} else {
			let newValue = value.length > 0 ? (value.indexOf(selectedOption) >= 0 ? value : [...value, selectedOption]) : [selectedOption];

			setInputVal('');
			selectedOption && value.length < max && onChange(undefined, name, newValue);
		}
	};
	const handleRemove = (selectedOption) => {
		let newValue = value?.filter((option) => option !== selectedOption);

		onChange(undefined, name, newValue);
	};

	useEffect(() => {
		if (variant === 'single') setInputVal(value || '');
	}, [variant, value]);

	return (
		<StyledSelectGroup $dropdownPosBottom={dropdownPosBottom}>
			{label ? <label htmlFor={name}>{label}</label> : null}

			<div className="input-icon-group">
				<input
					type="text"
					placeholder={placeholder}
					name={name}
					value={inputVal}
					required={variant === 'multiple' ? (required ? (value.length > 0 ? false : true) : required) : required}
					onBlur={handleBlur}
					onChange={(event) => {
						setShouldFilter(true);
						setInputVal(event.target.value);
					}}
					autoComplete="off"
					{...rest}
				/>
				<div className="chevron-con">
					<ChevronDown />
				</div>
			</div>

			{variant === 'multiple' && value.length > 0 ? (
				<div className="selected-options">
					{value?.map((value, index) => (
						<span key={index}>
							{value} <SelectClose onClick={() => handleRemove(value)} />
						</span>
					))}
				</div>
			) : null}

			<ul>
				{loading ? (
					<li>Loading...</li>
				) : options?.length === 0 ? (
					<li>{emptyOptionsMessage}</li>
				) : (
					options
						.filter((option) => (shouldFilter ? option?.toLowerCase().indexOf(inputVal.toLowerCase()) >= 0 : option))
						.map((option, index) => (
							<li
								key={index}
								onClick={(event) => {
									event.currentTarget.blur();

									setShouldFilter(false);

									if (variant === 'multiple') {
										let newValue = value.length > 0 ? (value.indexOf(option) >= 0 ? value : [...value, option]) : [option];

										setInputVal('');
										value.length < max && onChange(undefined, name, newValue);
									} else {
										setInputVal(option);
										onChange(undefined, name, option);
									}
								}}
								tabIndex={0}
							>
								{option}
							</li>
						))
				)}
			</ul>
		</StyledSelectGroup>
	);
};

export default SelectGroup;
