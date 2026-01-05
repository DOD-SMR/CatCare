import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { refugio, ubicacion } from '../model/Tipos'
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios'
import * as Location from 'expo-location'
import { getCurrentPositionAsync, LocationPermissionResponse, requestForegroundPermissionsAsync } from 'expo-location'
type refugioProps={
    item:refugio
    accionConsultarPermisoUbicacion:() => Promise<LocationPermissionResponse>
    accionSeleccionarRefugio:(refugio:refugio)=> void
}
export default function Refugio({item,accionConsultarPermisoUbicacion,accionSeleccionarRefugio}:refugioProps) {
    const [distanciaAprox,setDistanciaAprox] = useState("")
    useEffect(()=> {getDistanciaAprox()},[])
    function getDistanciaAprox(){
      comprobarDistancia().then(distancia => setDistanciaAprox(distancia)).catch(error=> console.log(error.toString()))
    }
    async function comprobarDistancia(){

        let distancia = "Distancia desconocida"
        const permiso = await accionConsultarPermisoUbicacion()
          if (permiso.status === "granted"){
            const coordenada = await obtenerCoordenadas()
            console.log(coordenada)
            distancia =consultarDistancia(item.ubicacion,coordenada)
          }
        
        return distancia
      }
      async function obtenerCoordenadas():Promise<ubicacion>{
        let coordenadas = {longitude:0,latitude:0}
        const respuesta = await Location.getLastKnownPositionAsync()
        console.log(respuesta?.coords.latitude)
        console.log(respuesta?.coords.longitude)
        const coordenadasA = respuesta?.coords
        if(coordenadasA!==undefined){
          coordenadas = {latitude:coordenadasA?.latitude,longitude:coordenadasA.longitude}
        }
        return coordenadas
    }
    function consultarDistancia(ubicacion1:ubicacion,ubicacion2:ubicacion):string{
        const R = 6371 // Radio de la Tierra en kilómetros

        // Convertir grados a radianes
        const lat1Rad = gradosARadianes(ubicacion1.latitude)
        const lat2Rad = gradosARadianes(ubicacion2.latitude)
        const deltaLatRad = gradosARadianes(ubicacion2.latitude - ubicacion1.latitude)
        const deltaLonRad = gradosARadianes(
            ubicacion2.longitude - ubicacion1.longitude
        )

        // Fórmula de Haversine
        const a = Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) + Math.cos(
            lat1Rad
        ) * Math.cos(lat2Rad) * Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        const distanciaKm = Math.round(R * c)
        
        return `${distanciaKm} km`
    }

    function gradosARadianes(grados : number): number {
    return grados * (Math.PI / 180)
    } 
  return (
    <Pressable style={styles.container} onPress={()=> accionSeleccionarRefugio(item)}>
    <View style={styles.card}>
      <Text style={styles.title}>Refugio {item.nombre}</Text>
      <Text style={styles.subtitle}>A {distanciaAprox}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item.ubicacion.latitude,
          longitude: item.ubicacion.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        <Marker
          coordinate={{
            latitude: item.ubicacion.latitude,
            longitude: item.ubicacion.longitude,
          }}
          title={item.nombre}
        />
      </MapView>
    </View>
</Pressable>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9', // fondo suave
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, 
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
})