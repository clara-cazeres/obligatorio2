import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementarCuenta } from '../features/contadorSlice'

const Contador = () => {

    const dispatch = useDispatch();
    const cuenta = useSelector(state => state.contador.cuenta)

    const incrementar = () => {
        dispatch(incrementarCuenta());
    }

    return (
        <View>
            <Button title="Contar" onPress={incrementar} />
            <Text>{cuenta}</Text>
        </View>
    )
}

export default Contador

const styles = StyleSheet.create({})