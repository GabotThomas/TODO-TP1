import React, { useState } from 'react';
import { makeClassName } from '../function';
import useLocalStorage from '../hook/useLocalStorage';
import SelectInput from '../SelectInput';
import Toggle from '../Toggle';
import TodoListLine from './item/TodoListLine';
import uniqid from 'uniqid';

const TodoListComponent = ({ init = false }) => {
	const [newTodo, setNewTodo] = useState({ value: '', category: null });
	const { getStoredItem, setItemToStorage } = useLocalStorage();
	const [todoLists, setTodoLists] = useState(getStoredItem('todoLists') || []);
	const [categories, setCategories] = useState(getStoredItem('categories') || []);
	const [filter, setFilter] = useState({});
	const [darkMode, setDarkMode] = useState(getStoredItem('darkMode') || false);

	const handleAdd = () => {
		const todoTemp = todoLists.slice();
		todoTemp.unshift(newTodo);
		setTodoLists(todoTemp);
		setItemToStorage(todoTemp, 'todoLists');
		setNewTodo({ value: '', category: null });
		handleAddCategory(newTodo.category);
	};

	const handleAddCategory = category => {
		if (category && !categories.find(el => el.name === category.name)) {
			const temp = categories.slice();
			temp.unshift(category);
			setCategories(temp);
			setItemToStorage(temp, 'categories');
		}
	};

	const handleDelete = index => {
		const todoTemp = todoLists.slice();
		todoTemp.splice(index, 1);
		setTodoLists(todoTemp);
		setItemToStorage(todoTemp, 'todoLists');
	};

	const setValue = ({ target }) => {
		setNewTodo({ ...newTodo, value: target.value });
	};

	const setSelect = ({ name }) => {
		if (name) {
			setFilter({ category: name });
		} else {
			setFilter({});
		}
	};

	const setCategory = category => {
		setNewTodo({ ...newTodo, category });
	};

	const handleToggle = (e, checked) => {
		setDarkMode(checked);
		setItemToStorage(checked, 'darkMode');
	};

	const handleModify = (newValue, i) => {
		const todoTemp = todoLists.slice();
		todoTemp[i] = newValue;
		setTodoLists(todoTemp);
		setItemToStorage(todoTemp, 'todoLists');
	};

	const todoFilted = filter.category
		? todoLists.filter(value => value.category?.name == filter.category)
		: todoLists;

	return (
		<div className={makeClassName('maining', darkMode && 'dark-mode')}>
			<div className={'container todolist'}>
				<div className="row justify-content-center">
					<div className="col-md-12">
						<div className="card">
							<div className="card-header">
								<div>Rechercher par category</div>
								<div>
									<SelectInput
										data={categories}
										attribute="name"
										handleCallback={setSelect}
									/>
								</div>
								<div className="dark-toggle">
									<span>DarkMode: </span>
									<Toggle active={darkMode} handleToggle={handleToggle} />
								</div>
							</div>
							<div className="card-body">
								<table className="table">
									<thead>
										<tr>
											<th scope="col" className="text-center">
												Todo
											</th>
											<th scope="col" className="text-center">
												Category
											</th>
											<th scope="col" className="text-center">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<input
													onChange={setValue}
													value={newTodo.value}
													type="text"
													name="message"
													className="form-control"
												/>
											</td>
											<td>
												<SelectInput
													data={categories}
													attribute="name"
													handleCallback={setCategory}
													defaultValue={newTodo.category ? newTodo.category.name : ''}
												/>
											</td>
											<td className="text-end">
												<input
													className="btn btn-primary col-auto"
													onClick={/*prevent*/ handleAdd}
													type="submit"
													value="Ajouter"
												/>
											</td>
										</tr>
										{todoFilted.map((todolist, index) => (
											<TodoListLine
												key={uniqid()}
												todoListGiven={todolist}
												index={index}
												handleDeleteCallBack={handleDelete}
												handleModifyCallback={handleModify}
												categories={categories}
											/>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoListComponent;
