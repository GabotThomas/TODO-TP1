import React, { useState } from 'react';
import { makeClassName } from './function';

const SelectInput = ({ data, attribute, handleCallback, defaultValue = '' }) => {
	const [value, setValue] = useState(defaultValue);
	const [activeResult, setActiveResult] = useState(false);
	const [valueSelected, setValueSelected] = useState();

	const handleChange = ({ target }) => {
		setValue(target.value);
		const valueExistedIndex = filteredList();
		if (valueExistedIndex >= 0) {
			setValueSelected(valueExistedIndex);
			handleCallback(data[valueExistedIndex]);
			return;
		}
		setValueSelected(null);
		handleCallback({ [attribute]: value });
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
		<div clahss="select-input">
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
								key={property.id}
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
