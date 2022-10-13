import React, { useEffect, useState } from 'react';
import { makeClassName } from './function';
import uniqid from 'uniqid';

const SelectInput = ({ data, attribute, handleCallback, defaultValue = '' }) => {
	const [value, setValue] = useState(defaultValue);
	const [activeResult, setActiveResult] = useState(false);
	const [valueSelected, setValueSelected] = useState();

	useEffect(() => {
		if (defaultValue != value) {
			setValue(defaultValue);
		}
	}, [defaultValue]);

	const handleChange = ({ target }) => {
		setValue(target.value);
		const valueExistedIndex = filteredList();
		if (valueExistedIndex >= 0) {
			setValueSelected(valueExistedIndex);
			handleCallback(data[valueExistedIndex]);
			return;
		}
		setValueSelected(null);
		handleCallback({ [attribute]: target.value });
	};

	const handleFocus = () => {
		setActiveResult(true);
		const valueExistedIndex = filteredList();
		if (valueExistedIndex >= 0) {
			setValueSelected(valueExistedIndex);
		}
	};

	const handleBlur = () => {
		setActiveResult(false);
	};

	const handleClick = index => {
		setValue(data[index][attribute]);
		handleCallback(data[index]);
	};

	const filteredList = () => {
		return data.findIndex(
			search => search[attribute].toLowerCase() == value.toLowerCase()
		);
	};

	return (
		<div className="select-input">
			<input
				onChange={handleChange}
				value={value}
				type="text"
				name="message"
				className="form-control"
				onFocus={handleFocus}
				autoComplete="off"
				onBlur={handleBlur}
			/>
			<div className="select-list">
				{activeResult && (
					<ul className="list-group">
						{data.map((property, index) => (
							<li
								key={uniqid()}
								value={property.id}
								onMouseDown={e => handleClick(index)}
								className={makeClassName(
									'list-group-item',
									valueSelected == index && 'selected'
								)}
							>
								{property[attribute]}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default SelectInput;
