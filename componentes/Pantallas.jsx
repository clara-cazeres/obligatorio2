import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Aplicacion from './Aplicacion';
import Pila from './Pila';


const Pantallas = () => {

    const logueado = useSelector((state) => state.usuario.logueado); //state entre parentesis?

    return (
        logueado ? <Aplicacion /> : <Pila />
    )
}

export default Pantallas