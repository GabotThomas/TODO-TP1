import React, { useCallback, useEffect, useState } from 'react';
import { makeClassName } from '../../function';
import { DELETE, PUT } from '../../function/methods';
import useFetch from '../../hook/useFetch';
import Loader from '../../Loader';
import LoadingButton from '../../LoadingButton';
import SelectInput from '../../SelectInput';

const TodoListLine = ({
	todoListGiven = {},
	index,
	handleDeleteCallBack,
	categories,
}) => {
	const [todoList, setTodoList] = useState(todoListGiven);
	const [newValue, setNewValue] = useState(todoListGiven);
	const [resultDelete, loadDelete, loadingDelete] = useFetch();
	const [resultEdit, loadEdit, loadingEdit] = useFetch();

	useEffect(() => {
		if (resultDelete && resultDelete.success) {
			handleDeleteCallBack(index);
		}
	}, [resultDelete]);

	useEffect(() => {
		if (resultEdit && resultEdit.success) {
			setTodoList({
				...resultEdit.todoList,
				modify: false,
			});
		}
	}, [resultEdit]);

	const handleDelete = () => {
		loadDelete({
			url: 'todolist',
			method: DELETE,
			body: {
				id: todoList.id,
			},
		});
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
		loadEdit({
			url: `todolist/${todoList.id}`,
			method: PUT,
			body: justCompleted ? { completed: true } : newValue,
		});
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
						disabled={loadingEdit}
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
							disabled={loadingEdit}
						>
							<LoadingButton loading={loadingEdit} />
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
							{loadingEdit ? <Loader /> : <span className="material-icons">done</span>}
						</button>
					)}

					<button
						onClick={handleModify}
						className="btn btn-warning col-auto m-1 icon-btn"
					>
						<span className="material-icons">mode_edit</span>
					</button>
					<button
						onClick={handleDelete}
						className="btn btn-danger col-auto m-1 icon-btn"
						disabled={loadingDelete}
					>
						{loadingDelete ? <Loader /> : <span className="material-icons">delete</span>}
					</button>
				</div>
			</td>
		</tr>
	);
};

export default TodoListLine;
