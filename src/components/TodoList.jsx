import React, { useMemo } from 'react';
import {
	List,
	ThemeIcon,
	Group,
	Checkbox,
	Container,
	Box,
	Text,
} from '@mantine/core';
import { Trash } from 'tabler-icons-react';

const TodoList = ({ todos, onComplete, onDelete }) => {
	const sortedTodos = useMemo(
		() => todos.sort((a, b) => a.created_at - b.created_at || 0),
		[todos]
	);
	return (
		<Container
			sx={(theme) => ({
				width: '100%',
				padding: 0,
				display: 'flex',
				flexDirection: 'column',
				gap: theme.spacing.sm,
			})}
		>
			{sortedTodos.map(({ id, text, completed }) => {
				return (
					<Box
						key={id}
						sx={(theme) => ({
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							background: theme.colors.gray[0],
							padding: theme.spacing.sm,
							borderRadius: theme.spacing.sm,
						})}
					>
						<Text
							sx={
								!completed
									? {}
									: {
											opacity: 0.5,
											textDecoration: 'line-through',
									  }
							}
						>
							{text}
						</Text>
						<Group spacing="xs">
							<Checkbox
								size="md"
								checked={completed}
								sx={{
									'&:hover': {
										opacity: 0.75,
									},
								}}
								onChange={() => onComplete(id)}
							/>
							<ThemeIcon
								size="md"
								sx={(theme) => ({
									'&:hover': {
										opacity: 0.75,
										background: theme.colors.red[8],
									},
								})}
								onClick={() => onDelete(id)}
							>
								<Trash size={16} />
							</ThemeIcon>
						</Group>
					</Box>
				);
			})}
		</Container>
	);
};

export default TodoList;
