import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { commonStyles } from '../../styles/styles';

const InversionTotal = () => {
  const transacciones = useSelector((state) => state.transacciones.lista);

  let totalCompra = 0;
  let totalVenta = 0;

  transacciones.forEach((transaccion) => {
    if (transaccion.tipoOperacion === 1) {
      totalCompra += transaccion.cantidad * transaccion.valorActual;
    } else if (transaccion.tipoOperacion === 2) {
      totalVenta += transaccion.cantidad * transaccion.valorActual;
    }
  });

  const totalInversion = totalCompra - totalVenta;

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Monto Total de Inversiones</Text>
      <Text
        style={[
          commonStyles.text,
          { color: totalInversion >= 0 ? '#28a745' : '#dc3545', fontSize: 24 },
        ]}
      >
        ${totalInversion.toLocaleString('es-UY')}
      </Text>
    </View>
  );
};

export default InversionTotal;
