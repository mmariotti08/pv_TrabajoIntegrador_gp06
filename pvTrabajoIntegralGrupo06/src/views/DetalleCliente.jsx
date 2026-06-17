import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert
} from "@mui/material";

const DetalleCliente = () => {

  const { id } = useParams();

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const cargarCliente = async () => {

      try {

        const respuesta = await fetch(
          `https://fakestoreapi.com/users/${id}`
        );

        if (!respuesta.ok) {
          throw new Error("Error al obtener cliente");
        }

        const datos = await respuesta.json();

        setCliente(datos);

      } catch (error) {

        setError("No se pudo cargar el cliente.");

      } finally {

        setLoading(false);

      }
    };

    cargarCliente();

  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          {error}
        </Alert>
      </Container>
    );
  }

  return (

    <Container sx={{ mt: 4 }}>

      <Card>

        <CardContent>

          <Typography
            variant="h4"
            gutterBottom
          >
            Detalle del Cliente
          </Typography>

          <Typography>
            <strong>ID:</strong> {cliente.id}
          </Typography>

          <Typography>
            <strong>Nombre:</strong> {cliente.name.firstname} {cliente.name.lastname}
          </Typography>

          <Typography>
            <strong>Email:</strong> {cliente.email}
          </Typography>

          <Typography>
            <strong>Teléfono:</strong> {cliente.phone}
          </Typography>

          <Typography>
            <strong>Ciudad:</strong> {cliente.address.city}
          </Typography>

          <Typography>
            <strong>Usuario:</strong> {cliente.username}
          </Typography>

        </CardContent>

      </Card>

    </Container>

  );
};

export default DetalleCliente;