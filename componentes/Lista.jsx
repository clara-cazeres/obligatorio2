import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const Lista = () => {

    const [usuarios, setUsuarios] = useState([])

    const cargarUsuarios = () => {
        fetch("https://randomuser.me/api/?results=50")
            .then(r => r.json())
            .then(datos => {
                setUsuarios(datos.results);
            })
    }

    return (
        <View style={styles.container}>
            <Button title="Cargar usuarios" onPress={cargarUsuarios} />
            <FlatList data={usuarios} keyExtractor={usuario => usuario.login.uuid} 
            renderItem={({item}) => <Text>{item.name.first} {item.name.last}</Text>}
            contentContainerStyle={styles.contentContainer} />
        </View>
    )
}

export default Lista

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    contentContainer:{
        overflow: 'auto',
        
    }
})