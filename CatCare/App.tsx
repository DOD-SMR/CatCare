import { FlatList, ListRenderItemInfo, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { ReactElement, useEffect, useState } from 'react'
import { consultarRefugios } from './util/CRUD'
import { gato, gatos, refugio, refugios, tarea, tareas } from './model/Tipos'
import Tarea from './components/Tarea'
import { SafeAreaView } from 'react-native-safe-area-context'
import ListaTareas from './components/ListaTareas'
import MapView, { Marker } from 'react-native-maps'
import Refugio from './components/Refugio'
import { LocationPermissionResponse, requestForegroundPermissionsAsync } from 'expo-location'
import * as Location from 'expo-location'
import Gato from './components/Gato'

export default function App() {
  const [listaTareas,setListaTareas] = useState<tareas>([])
  const [listaRefugios,setListaRefugios] = useState<refugios>([])
  const [listaGatos,setListaGatos] = useState<gatos>([])
  const [refugioActivo,setRefugioActivo] = useState<undefined | number>(undefined)
  const [capaActiva,setCapaActiva] = useState<number>(0)
  const [informeDiario,setInformeDiario] = useState<string>("")
  useEffect(rellenarRefugios,[])
 
  async function consultarPermisoUbicacion():Promise<LocationPermissionResponse>{
    return await Location.requestForegroundPermissionsAsync()
  } 
  
  function getCapaActiva():ReactElement{
    return capaActiva===0 ? getCapaPrimera() : capaActiva===1 ? getCapaSegunda() : getCapaTercera()
  }
  function accionSeleccionarRefugio(refugio:refugio){
      console.log("REFUGIO PULSADO")
      setRefugioActivo(parseInt(refugio.id))
      setCapaActiva(1)
      rellenarTareas()
      
  }
  function gestionarGatos(){
    setCapaActiva(3)
  }
  function terminarGestionGatos(){

  }
  function finalizarDia(){

  }
  function getEtiquetaRefugio({item}){
    return <Refugio item={item} accionConsultarPermisoUbicacion={consultarPermisoUbicacion} accionSeleccionarRefugio={accionSeleccionarRefugio}/>
  } 
  function getCapaPrimera():ReactElement{
    
    return <FlatList
            data={listaRefugios}
            keyExtractor={refugio=> refugio.id}
            renderItem={item=> getEtiquetaRefugio(item)}
            />
  }
  function getCapaSegunda():ReactElement{
    return <View  style={styles.container}>
              <View>
                <Text style={styles.titulo}>Refugio {listaRefugios.find(refugio=> parseInt(refugio.id)===refugioActivo)?.nombre}🐈</Text>
                <ListaTareas lista={listaTareas}/>
                <TextInput style={styles.textArea} placeholder='Introduce un resumen del día antes de finalizarlo.' value={informeDiario} onChangeText={setInformeDiario}/>
              </View>
              <View >
                  <Pressable onPress={gestionarGatos} style={styles.boton}>
                    <Text style={styles.textoBoton}>Gestionar Gatos</Text>
                  </Pressable>
                  <Pressable onPress={finalizarDia} style={styles.boton}>
                    <Text style={styles.textoBoton}>Finalizar Día</Text>
                  </Pressable>
              </View>
              
            </View>
  }
  function getCapaTercera():ReactElement{
    return <FlatList
            
            />
  }
  function abrirModalGato(gato?:gato){

  }
  function  getEtiquetaGato({item}){
    return <Gato item={item} />
  }
  function accionPulsarTarea(){
    console.log("TAREA PULSADA")
  }
  function rellenarRefugios(){
    consultarRefugios().then(datos=> {
      const nuevaLista = datos
      setListaRefugios(nuevaLista)
    })
  }
  function rellenarTareas(){
    consultarRefugios().then(datos => {
      const nuevaLista = datos[refugioActivo??0].tareas
      setListaTareas(nuevaLista)
    }).catch(error=> console.log(error.toString()+"esaqui"))
  }
  function rellenarGatos(){
    consultarRefugios().then(datos=>{
      const nuevaLisa = datos[refugioActivo??0].gatos
      setListaGatos(nuevaLisa)
    })
  }
  return (
    <SafeAreaView>
      {
        getCapaActiva()
      }
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"column",
    margin:2,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  titulo: {
    fontSize: 30,           
    fontWeight: 'bold',      
    color: '#000000',
    marginBottom: 12,
    textAlign:"center"
  },
  textArea: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,           
    width:"92%",   
    padding: 16,                     
    fontSize: 16,
    color: '#222',
    minHeight: 150,                  
    textAlignVertical: 'top',        
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#DDD',         
    alignSelf:"center"    
  },
  boton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',           
    width: '92%',
    marginVertical: 8,
    alignSelf:"center",
    
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 18,                     
    fontWeight: '600',
  },
})