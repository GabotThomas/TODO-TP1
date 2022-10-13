import React, { useState } from 'react';
import { makeClassName } from '../../function';
import SelectInput from '../../SelectInput';

const TodoListLine = ({
	todoListGiven = {},
	index,
	handleDeleteCallBack,
	handleModifyCallback,
	categories,
}) => {
	const [todoList, setTodoList] = useState(todoListGiven);
	const [newValue, setNewValue] = useState(todoListGiven);

	const handleDelete = () => {
		handleDeleteCallBack(index);
	};

	const handleModify = (modify = true) => {
		setTodoList({ ...todoList, modify });
	};

	const setValue = ({ target }) => {
		setNewValue({ ...newValue, value: target.value });
	};

	const setSelect = category => {
		setNewValue({
			...newValue,
			category,
		});
	};

	const handleCheck = ({ target }) => {
		setNewValue({ ...newValue, completed: target.checked });
	};

	const handleEdit = (justCompleted = false) => {
		const temp = justCompleted ? { ...todoListGiven, completed: true } : newValue;
		setTodoList({
			...temp,
			modify: false,
		});
		setNewValue(temp);
		handleModifyCallback(temp, index);
	};

	if (todoList.modify) {
		return (
			<tr>
				<td>
					<input
						onChange={setValue}
						value={newValue.value}
						type="text"
						name="message"
						className="form-control"
					/>
				</td>
				<td>
					<SelectInput
						data={categories}
						attribute="name"
						handleCallback={setSelect}
						defaultValue={newValue.category ? newValue.category.name : ''}
					/>
				</td>
				<td className="text-end">
					<div>
						<div className="form-checking">
							<input
								onChange={handleCheck}
								checked={newValue.completed}
								type="checkbox"
								className="form-check-input"
							/>
						</div>
						<button
							onClick={e => handleEdit()}
							type="submit"
							className="btn btn-success m-1"
							value="Modifier"
						>
							Modifier
						</button>
						<button
							onClick={e => handleModify(false)}
							className="btn btn-danger m-1 icon-btn"
						>
							<span className="material-icons">close</span>
						</button>
					</div>
				</td>
			</tr>
		);
	}

	return (
		<tr className={makeClassName('todo_list_line', todoList.completed && 'completed')}>
			<td className="align-middle">{todoList.value}</td>
			<td className="text-center align-middle">
				<div>{todoList.category?.name}</div>
			</td>
			<td className="text-end">
				<div>
					{!todoList.completed && (
						<button
							onClick={e => handleEdit(true)}
							className="btn btn-success col-auto m-1 icon-btn"
						>
							<span className="material-icons">done</span>
						</button>
					)}

					<button
						onClick={handleModify}
						className="btn btn-warning col-auto m-1 icon-btn"
					>
						<span className="material-icons">mode_edit</span>
					</button>
					<button onClick={handleDelete} className="btn btn-danger col-auto m-1 icon-btn">
						<span className="material-icons">delete</span>
					</button>
				</div>
			</td>
		</tr>
	);
};

export default TodoListLine;
