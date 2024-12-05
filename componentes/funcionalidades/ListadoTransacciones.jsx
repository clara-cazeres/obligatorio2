import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransacciones } from "../../features/transaccionesSlice";
import { fetchMonedas } from "../../features/monedasSlice";
import { globalStyles } from "../../styles/styles";

const ListadoTransacciones = () => {
  const dispatch = useDispatch();
  const transacciones = useSelector((state) => state.transacciones.lista);
  const monedas = useSelector((state) => state.monedas.lista);
  const idUsuario = useSelector((state) => state.usuario.idUsuario);
  const apiKey = useSelector((state) => state.usuario.apiKey);

  useEffect(() => {
    if (monedas.length === 0) {
      dispatch(fetchMonedas(apiKey));
    }
    if (monedas.length > 0) {
      dispatch(fetchTransacciones({ idUsuario, apiKey }));
    }
  }, [dispatch, idUsuario, apiKey, monedas]);

  const getNombreMoneda = (idMoneda) => {
    const moneda = monedas.find((m) => m.id === idMoneda);
    return moneda ? moneda.nombre : "Moneda no disponible";
  };

  const transaccionesValidas = transacciones.filter((item) => item.id !== undefined);

  const transaccionesConIndices = transaccionesValidas.map((item, index) => ({
    ...item,
    originalIndex: index + 1,
  }));

  const transaccionesOrdenadas = [...transaccionesConIndices].sort((a, b) => b.id - a.id);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Mis transacciones</Text>
      <Text style={globalStyles.subtitle}>Orden de más a menos reciente</Text>
      {transaccionesOrdenadas.length === 0 ? (
        <Text style={globalStyles.empty}>No hay transacciones registradas.</Text>
      ) : (
        <FlatList
          data={transaccionesOrdenadas}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : `trans-${index}`)}
          renderItem={({ item }) => (
            <View style={globalStyles.card}>
              <Text style={globalStyles.cardtitle}>
                {item.tipoOperacion === 1 ? "Compra de:" : "Venta de:"} {getNombreMoneda(item.moneda)}
              </Text>
              <Text style={globalStyles.text}>Cantidad: {item.cantidad}</Text>
              <Text style={globalStyles.text}>Valor: $ {item.valorActual}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  index: {
    fontSize: 12,
    color: "#a7a7a7",
    textAlign: "right",
    marginTop: 5,
  },
});

export default ListadoTransacciones;
