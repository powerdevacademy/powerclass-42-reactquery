import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import {TextField} from "formik-material-ui";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import api from '../services/api';

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
  name: "",
  password: "",
  confirm_password: ""
};

const validationSchema = Yup.object({
  username: Yup.string().email("Email inválido").required("Obrigatório"),
  name: Yup.string().required("Obrigatório"),
  password: Yup.string().required("Obrigatório"),
  confirm_password: Yup.string()
                    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
                    .required('As senhas devem ser iguais')
});

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();

  const _onSubmit = async (values, { setSubmitting }) => {
    try{ 
      await api.user.signup(values);
      setSubmitting(false);
      alert('Usuário cadastrado com sucesso');
      history.push('/login');
    } catch(err) {
      alert(err.response?.data?.error || err);
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1>Cadastro</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={_onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name="name"
              label="Nome"
              type="text"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              component={TextField}
            />
            
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
              label="Senha"
              type="password"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              component={TextField}
            />

            <Field
              name="confirm_password"
              label="Confirme a Senha"
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
              Cadastrar
            </Button>

            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link
                  to="/login"
                  variant="body2"
                  margin="normal"
                  className={classes.link}>
                  Já tem uma conta? Entre!
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Signup;
