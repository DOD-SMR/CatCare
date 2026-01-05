import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { gato } from '../model/Tipos'
import { Image } from 'expo-image'
export type gatoProps={
    item:gato
    crearEditarGato:()=>void
}
export default function Gato({item,crearEditarGato}:gatoProps) {
  return (
    <Pressable onPress={crearEditarGato} style={[styles.gatoCard,{borderColor:item.estado ==="normal" ? "#2966ffff" 
                                                                    : item.estado === "prioritario" ? "#e8ff4fff" : "#FF0000"}]}>
      <View style={styles.container}>
        <Image
            source={item.urlFoto}
            style={styles.foto}
            contentFit='cover'
            />

            <View style={styles.contenido}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.info}>Estado: {item.estado}</Text>
            <Text style={styles.info}>Sexo: {item.sexo}</Text>
            </View>
        </View>

    </Pressable>
  )
}

const styles = StyleSheet.create({
    gatoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  foto: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#DDD',
    marginRight: 12,
  },

  contenido: {
    flex: 1,
  },

  nombre: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },

  info: {
    fontSize: 14,
    color: '#555555',
  },

})