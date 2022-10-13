import React from 'react';
import { makeClassName } from './function';

const Toggle = ({ active, handleToggle }) => {
	const handleToggleController = e => {
		handleToggle(e, !active);
	};
	return (
		<label className="switch" onClick={handleToggleController}>
			<div className={makeClassName('checkbox', active && 'checked')} />
			<span className="slider round"></span>
		</label>
	);
};

export default Toggle;
