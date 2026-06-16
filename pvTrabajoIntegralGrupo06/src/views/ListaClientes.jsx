import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    Button,
    Box
} from "@mui/material";
const ListaClientes = () => {

    const [clientes, setClientes] = useState([]);
    const [clientesFiltrados, setClientesFiltrados] = useState([]);

    const [busqueda, setBusqueda] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [ultimaActualizacion, setUltimaActualizacion] = useState("");

    const cargarClientes = async () => {

        try {

            setLoading(true);

            setError(null);

            const respuesta = await fetch(
                "https://fakestoreapi.com/users"
            );

            if (!respuesta.ok) {
                throw new Error("Error al obtener clientes");
            }

            const datos = await respuesta.json();

            setClientes(datos);

            setClientesFiltrados(datos);

            setUltimaActualizacion(
                new Date().toLocaleString("es-AR")
            );

        } catch (error) {

            setError(
                "No se pudieron cargar los clientes."
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        cargarClientes();

    }, []);

    useEffect(() => {
        const resultado = clientes.filter((cliente) =>

            cliente.name.lastname
                .toLowerCase()
                .includes(busqueda.toLowerCase())

            ||

            cliente.address.city
                .toLowerCase()
                .includes(busqueda.toLowerCase())
        );

        setClientesFiltrados(resultado);

    }, [busqueda, clientes]);

    if (loading) {

        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="70vh"
            >
                <CircularProgress />
            </Box>

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

            <Typography
                variant="h4"
                gutterBottom
            >
                Lista de Clientes
            </Typography>

            <Typography
                variant="body2"
                sx={{ mb: 2 }}
            >
                Última actualización:
                {" "}
                {ultimaActualizacion}
            </Typography>

            <TextField
                fullWidth
                label="Buscar por apellido o ciudad"
                variant="outlined"
                value={busqueda}
                onChange={(e) =>
                    setBusqueda(e.target.value)
                }
                sx={{ mb: 3 }}
            />
            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>ID</TableCell>

                            <TableCell>
                                Nombre Completo
                            </TableCell>

                            <TableCell>
                                Email
                            </TableCell>

                            <TableCell>
                                Teléfono
                            </TableCell>

                            <TableCell>
                                Ciudad
                            </TableCell>

                            <TableCell>
                                Acción
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {clientesFiltrados.map(
                            (cliente) => (

                                <TableRow
                                    key={cliente.id}
                                >

                                    <TableCell>
                                        {cliente.id}
                                    </TableCell>

                                    <TableCell>

                                        {cliente.name.firstname}
                                        {" "}
                                        {cliente.name.lastname}

                                    </TableCell>

                                    <TableCell>
                                        {cliente.email}
                                    </TableCell>

                                    <TableCell>
                                        {cliente.phone}
                                    </TableCell>

                                    <TableCell>
                                        {cliente.address.city}
                                    </TableCell>

                                    <TableCell>
                                          <Button
                                           component={Link}
                                           to={`/clientes/${cliente.id}`}
                                           variant="contained"
                                          >
                                            Ver Detalle
                                         </Button>
                                    </TableCell>

                                </TableRow>
                            )
                        )}

                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};
export default ListaClientes;