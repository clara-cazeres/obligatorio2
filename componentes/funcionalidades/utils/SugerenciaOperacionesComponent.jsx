export const obtenerSugerencias = (transacciones, monedas) => {
    const ultimaTransaccionPorMoneda = {};
  
    transacciones.forEach((transaccion) => {
      const monedaId = transaccion.moneda;
  
      if (
        !ultimaTransaccionPorMoneda[monedaId] ||
        transaccion.id > ultimaTransaccionPorMoneda[monedaId].id
      ) {
        ultimaTransaccionPorMoneda[monedaId] = transaccion;
      }
    });
  
    const sugerencias = [];
  
    Object.keys(ultimaTransaccionPorMoneda).forEach((monedaId) => {
      const transaccion = ultimaTransaccionPorMoneda[monedaId];
      const monedaActual = monedas.find((mon) => mon.id === parseInt(monedaId));
  
      if (monedaActual) {
        const valorActual = monedaActual.cotizacion;
        const valorTransaccion = transaccion.valorActual;
  
        if (transaccion.tipoOperacion === 1 && valorActual > valorTransaccion) {
          sugerencias.push(`Vender ${monedaActual.nombre}`);
        }
  
        if (transaccion.tipoOperacion === 2 && valorActual < valorTransaccion) {
          sugerencias.push(`Comprar ${monedaActual.nombre}`);
        }
      }
    });
  
    return sugerencias;
  };
  