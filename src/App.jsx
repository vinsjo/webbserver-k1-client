import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import TodoList from './components/TodoList';
import { MantineProvider, Container, Title } from '@mantine/core';
import api from './api';

const App = () => {
	const [todos, setTodos] = useState([]);

	const handleSubmit = async (input) => {
		const data = await api.POST({ text: input });
		if (!data) return;
		setTodos([...todos, data]);
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
		<MantineProvider
			theme={{
				fontFamily: 'Arial, Helvetica, sans-serif',
				spacing: { xs: 6, sm: 12, md: 18, lg: 24, xl: 32 },
				primaryColor: 'gray',
			}}
		>
			<Container
				sx={(theme) => ({
					display: 'flex',
					flexDirection: 'column',
					gap: theme.spacing.xl,
					width: '100%',
					maxWidth: '60ch',
					minHeight: '75vh',
				})}
			>
				<Title order={1}>To-Do List</Title>
				<InputForm onSubmit={handleSubmit} />
				<TodoList
					todos={todos}
					onComplete={handleComplete}
					onDelete={handleDelete}
				/>
			</Container>
		</MantineProvider>
	);
};

export default App;
