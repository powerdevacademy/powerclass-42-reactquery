import React, { useEffect } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import {TextField} from "formik-material-ui";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import {QueryClient, useMutation, useQuery, useQueryClient} from 'react-query';
import api from "../services/api";

import { Formik, Form, Field } from "formik";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: "inherit",
  },
}));

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().email("Email inválido").required("Obrigatório"),
  password: Yup.string().required("Obrigatório"),
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data } = useQuery('session', api.user.me);
  const userIsLogged = !!data;

  const loginMutation = useMutation(data => api.user.login(data), {
    onError: (error, variables, context) => {
      console.log("ERRO LOGIN", error);
      alert(error?.response?.data?.error || error);
    },
    onSuccess: (result, variables, context) => {
      // console.log("RES", result.data);
      localStorage.setItem('USER_TOKEN', result.data.user_token);
      queryClient.invalidateQueries('session');
      queryClient.setQueryData('session', result.data);
    },
  });

  useEffect(() => {
    if (userIsLogged) {
      history.push("/list");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIsLogged]);

  const _onSubmit = async (values, { setSubmitting }) => {
    await loginMutation.mutate(values);
    setSubmitting(false);
  };

  return (
    <>
      <h1>Login</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={_onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name="username"
              label="Email"
              type="text"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              component={TextField}
            />

            <Field
              name="password"
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              component={TextField}
            />

            <Button
              href=''
              className={classes.submit}
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              disabled={isSubmitting}
            >
              Entrar
            </Button>

            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link
                  to="/cadastro"
                  variant="body2"
                  margin="normal"
                  className={classes.link}>
                  Não tem uma conta? Se cadastre!
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
