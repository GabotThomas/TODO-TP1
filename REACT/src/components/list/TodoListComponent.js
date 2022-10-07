import React, { useEffect, useState } from 'react';
import { objectToGETparams } from '../function';
import { POST } from '../function/methods';
import useFetch from '../hook/useFetch';
import Loader from '../Loader';
import SelectInput from '../SelectInput';
import TodoListLine from './item/TodoListLine';

const TodoListComponent = ({ init = false }) => {
	const [result, load, loading] = useFetch();
	const [resultSend, loadSend, loadingSend] = useFetch();
	const [newTodo, setNewTodo] = useState({ value: '', category: null });
	const [todoLists, setTodoLists] = useState([]);
	const [categories, setCategories] = useState([]);
	const [filter, setFilter] = useState({});

	useEffect(() => {
		handleLoad();
	}, [filter]);

	useEffect(() => {
		if (result && result.success) {
			setTodoLists(result.todoLists);
			setCategories(result.categories);
		}
	}, [result]);

	useEffect(() => {
		if (resultSend && resultSend.success) {
			handleAdd(resultSend.todoList);
		}
	}, [resultSend]);

	const handleLoad = () => {
		load({
			url: 'todolist' + objectToGETparams(filter),
		});
	};

	const handleAdd = newTodoGiven => {
		const todoTemp = todoLists.slice();
		todoTemp.unshift(newTodoGiven);
		setTodoLists(todoTemp);

		setNewTodo({ value: '', category: null });
	};

	const handleDelete = index => {
		const todoTemp = todoLists.slice();
		todoTemp.splice(index, 1);
		setTodoLists(todoTemp);
	};

	const handleSubmit = e => {
		e.preventDefault();
		loadSend({
			url: 'todolist',
			method: POST,
			body: newTodo,
		});
	};

	const setValue = ({ target }) => {
		setNewTodo({ ...newTodo, value: target.value });
	};

	const setSelect = ({ id, name }) => {
		if (id) {
			setFilter({ category: id });
		}
		if (!name) {
			setFilter({});
		}
	};

	const setCategory = category => {
		setNewTodo({ ...newTodo, category });
	};

	return (
		<div className="container todolist">
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
						</div>
						<div className="card-body">
							{loading ? (
								<div>
									<Loader />
								</div>
							) : (
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
													default-value={newTodo.category ? newTodo.category.name : ''}
												/>
											</td>
											<td className="text-end">
												{!loadingSend ? (
													<input
														className="btn btn-primary col-auto"
														onClick={/*prevent*/ handleSubmit}
														type="submit"
														value="Ajouter"
													/>
												) : (
													<Loader />
												)}
											</td>
										</tr>
										{todoLists.map((todolist, index) => (
											<TodoListLine
												key={todolist.id}
												todoListGiven={todolist}
												index={index}
												handleDeleteCallBack={handleDelete}
												categories={categories}
											/>
										))}
									</tbody>
								</table>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoListComponent;
