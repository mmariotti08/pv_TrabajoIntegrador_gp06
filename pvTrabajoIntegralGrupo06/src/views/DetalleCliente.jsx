import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { adminData } = useContext(AdminContext);

  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const rolUsuario = adminData?.sector || adminData?.rol || adminData?.role || 'Gerencia';

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);
        
        if (!respuesta.ok) {
          throw new Error('No se pudo obtener la información del cliente');
        }

        const datos = await respuesta.json();
        setCliente(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerCliente();
  }, [id]);

  const elminarCliente = async () => {
    if (window.confirm('¿Estás seguro de que querés eliminar este cliente?')) {
      try {
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`, {
          method: 'DELETE'
        });

        if (respuesta.ok) {
          alert('Cliente eliminado correctamente (Simulado)');
          navigate('/'); 
        } else {
          alert('Error al intentar eliminar el cliente');
        }
      } catch (err) {
        alert('Error en la conexión al eliminar');
      }
    }
  };

  if (cargando) return <div style={{ padding: '20px' }}>Cargando datos del cliente...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  if (!cliente) return <div style={{ padding: '20px' }}>No se encontró el cliente.</div>;

  const { email, username, password, name, phone, address } = cliente;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Ficha Profunda del Cliente (ID: {id})</h2>
      <hr />
      
      <section style={{ marginBottom: '20px' }}>
        <h3>Información Personal</h3>
        <p><strong>Nombre Completo:</strong> {name?.firstname} {name?.lastname}</p>
        <p><strong>Teléfono:</strong> {phone}</p>
        <p><strong>Email:</strong> {email}</p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3>Dirección</h3>
        <p><strong>Calle y Número:</strong> {address?.street} n° {address?.number}</p>
        <p><strong>Ciudad:</strong> {address?.city}</p>
        <p><strong>Código Postal:</strong> {address?.zipcode}</p>
      </section>

      {(rolUsuario === 'Soporte' || rolUsuario === 'Gerencia') && (
        <section style={{ marginBottom: '20px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          <h3>Credenciales de Acceso (Solo Soporte/Gerencia)</h3>
          <p><strong>Usuario:</strong> {username}</p>
          <p><strong>Contraseña:</strong> {password}</p>
        </section>
      )}

      {rolUsuario === 'Gerencia' ? (
        <button 
          onClick={elminarCliente}
          style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Eliminar Cliente
        </button>
      ) : (
        <p style={{ color: 'orange', fontStyle: 'italic' }}>Tu rol ({rolUsuario || 'Invitado'}) no tiene permisos para eliminar clientes.</p>
      )}
    </div>
  );
};

export default DetalleCliente;