import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { InputBase } from "formik-material-ui";
import {
  makeStyles,
  Paper,
  IconButton,
  Divider,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import api from "../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0",
    display: "flex",
    alignItems: "center",
    flex: 1,
    marginBottom: theme.spacing(1),
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const initialValues = {
  item: "",
};

const validationSchema = Yup.object({
  item: Yup.string().required("Obrigatório"),
});

const TodoForm = () => {
  const classes = useStyles();
  // const queryClient = new QueryClient();
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation(item => api.todos.add(item), {
    onError: (error) => {
      console.log("ERRO ADD TODO", error);
      alert(error?.response?.data?.error || error);
    }, 
    onSuccess: (result) => {
      // queryClient.invalidateQueries('todos');
      queryClient.setQueryData('todos', old => [...old, result.data])
    }
  });
  
  const _onSubmit = async ({ item }, { resetForm, setSubmitting }) => {
    await addTodoMutation.mutate(item);
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={_onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Paper  className={classes.root}>
            <Field
              name="item"
              placeholder="O que você precisa fazer?"
              type="text"
              required
              className={classes.input}
              component={InputBase}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              color="secondary"
              type="submit"
              className={classes.iconButton}
              aria-label="adicionar"
            >
              <AddCircleIcon />
            </IconButton>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;
