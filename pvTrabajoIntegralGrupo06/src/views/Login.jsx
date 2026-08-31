import { useState, useEffect } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const Login = () => {
  const { admin, loginAdmin } = useAdmin();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      navigate("/dashboard");
    }
  }, [admin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrorLogin("");
      await loginAdmin(usuario, password);
      navigate("/dashboard");
    } catch (error) {
      setErrorLogin(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Ingreso al Sistema
          </Typography>

          {errorLogin && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorLogin}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Ingresar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;