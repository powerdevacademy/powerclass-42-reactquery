import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import TodoForm from "../components/TodoForm";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  link: {
    color: "inherit",
  },
  columnComplete: {
    width: "10%",
  },
  columnItem: {
    width: "10%",
  },
  columnTitle: {
    width: "70%",
  },
  columnDelete: {
    width: "10%",
  },
  rowHeader: {
    backgroundColor: theme.palette.primary.main,
    // backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.white,
  },
}));

const TaskList = () => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  
  const { data } = useQuery('todos', api.todos.list);
  const todos = data || [];

  const deleteTodoMutation = useMutation(id => api.todos.delete(id), {
    onSuccess: (result, variables) => {
      queryClient.setQueryData('todos', 
        old => old.filter(todo => todo.id !== variables));
    }
  });

  const toggleTodoMutation = useMutation(id => api.todos.toggle(id), {
    onSuccess: (result, variables) => {
      queryClient.setQueryData('todos', 
        old => old.map(todo => todo.id === variables ? result.data : todo));
    }
  });

  const _toggleTodo = id => toggleTodoMutation.mutate(id);
  const _deleteTodo = id => deleteTodoMutation.mutate(id);

  return (
    <>
      <h1> Lista de Tarefas </h1>
      <TodoForm />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className={classes.rowHeader}>
              <TableCell className={classes.columnComplete} align="center">
                Done
              </TableCell>
              <TableCell className={classes.columnItem} align="right">
                ID
              </TableCell>
              <TableCell className={classes.columnTitle}>Item</TableCell>
              <TableCell className={classes.columnDelete} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos?.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">
                  <Checkbox
                    checked={!!row.complete}
                    onChange={() => _toggleTodo(row.id)}
                    name="complete"
                    color="secondary"
                  />
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell component="th" scope="row">
                  {row.item}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={() => _deleteTodo(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskList;
