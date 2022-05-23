import React, { useState } from 'react';

import { Group, Button, TextInput, Container } from '@mantine/core';

const InputForm = ({ onSubmit }) => {
	const [input, setInput] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		typeof onSubmit === 'function' && onSubmit(input);
		setInput('');
	};
	return (
		<Container
			component="form"
			onSubmit={handleSubmit}
			sx={(theme) => ({
				width: '100%',
				display: 'flex',
				padding: theme.spacing.sm,
				gap: theme.spacing.xs,
				borderRadius: theme.spacing.sm,
				background: theme.colors.gray[0],
			})}
		>
			<TextInput
				sx={{
					flex: 1,
				}}
				radius="md"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Add New Task"
				required
			/>
			<Button type="submit" radius="md">
				Add
			</Button>
		</Container>
	);
};

export default InputForm;
