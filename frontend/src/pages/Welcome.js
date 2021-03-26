import React from "react";
import { Typography, Box, Paper, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Welcome = () => {
    const history = useHistory();

  return (
    <>
      <h1>Bem vindo, Power Dev!</h1>
      <Paper elevation={3}>
        <Box p={2}>
          <Typography variant="body1" paragraph>
            Esta aplicação irá te ajudar a aprender como se faz um sistema em
            React com React Query - e deixar todo aquele boilerplate do Redux de lado!
          </Typography>

          <Typography variant="body2" mt={2} paragraph>
            Ao final da aula, entre para o nosso grupo do Telegram, para ter
            acesso ao repositório Github com os códigos dessa aula.
          </Typography>

          <Button
            onClick={() => history.push("/login")}
            variant="contained"
            color="secondary"
            size="large">
            Começar
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default Welcome;
