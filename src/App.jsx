import React, { useState, useEffect } from 'react';
import api from './api';

const App = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await api.POST({ text: input });
		if (!data) return;
		setTodos([...todos, data]);
		setInput('');
	};

	const handleDelete = async (id) => {
		const i = todos.findIndex((todo) => todo.id === id);
		if (i < 0) return;
		const deleted = await api.DELETE(id);
		if (!deleted) return;
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const handleComplete = async (id) => {
		const todo = todos.find((todo) => todo.id === id);
		if (!todo) return;
		const updated = await api.PATCH({ completed: !todo.completed }, id);
		if (!updated) return;
		setTodos(
			todos.map((todo) => (todo.id === updated.id ? updated : todo))
		);
	};

	useEffect(() => {
		const controller = new AbortController();
		api.GET(controller)
			.then((data) => {
				if (!Array.isArray(data)) return;
				setTodos(data);
			})
			.catch((e) => {
				console.error(e.message || e);
			});
		return () => controller.abort();
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
				justifyContent: 'center',
				width: '100%',
				maxWidth: '40ch',
			}}
		>
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					gap: '1rem',
					justifyContent: 'space-between',
					width: '100%',
				}}
			>
				<input
					style={{ width: '100%' }}
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button>Add</button>
			</form>
			<ul>
				{todos.map(({ id, text, completed }) => (
					<li
						key={id}
						style={{
							textDecoration: completed ? 'line-through' : 'none',
						}}
					>
						{text}
						<button onClick={() => handleComplete(id)}>✓</button>
						<button onClick={() => handleDelete(id)}>✕</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
