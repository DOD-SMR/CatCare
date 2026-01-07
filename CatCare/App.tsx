import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { ReactElement, useEffect, useState } from 'react'
import { actualizarGatos, actualizarRefugioCompleto, consultarRefugio, consultarRefugios, CRUDGatos } from './util/CRUD'
import { gato, gatoFormulario, gatos, refugio, refugios, tarea, tareas } from './model/Tipos'
import { SafeAreaView } from 'react-native-safe-area-context'
import ListaTareas from './components/ListaTareas'
import Refugio from './components/Refugio'
import { LocationPermissionResponse } from 'expo-location'
import * as Location from 'expo-location'
import Gato from './components/Gato'
import { MaterialIcons } from '@expo/vector-icons'
import DetalleGato from './components/DetalleGato'
import PantallaDespedida from './components/PantallaDespedida'

export default function App() {
  const [listaTareas,setListaTareas] = useState<tareas>([])
  const [tareasCompletadas,setListaTareasCompletadas] = useState<tareas>([])
  const [listaRefugios,setListaRefugios] = useState<refugios>([])
  const [listaGatos,setListaGatos] = useState<gatos>([])
  const [refugioActivo,setRefugioActivo] = useState<undefined | number>(undefined)
  const [capaActiva,setCapaActiva] = useState<number>(0)
  const [informeDiario,setInformeDiario] = useState<string>("")
  const [modalVisible,setModalVisible] = useState<boolean>(false)
  const [gatoSeleccionado,setGatoSeleccionado] = useState<gato|undefined>(undefined)
  useEffect(rellenarRefugios,[])
 
  async function consultarPermisoUbicacion():Promise<LocationPermissionResponse>{
    return await Location.requestForegroundPermissionsAsync()
  } 
  
  function getCapaActiva():ReactElement{
    return capaActiva===0 ? getCapaPrimera() : capaActiva===1 ? getCapaSegunda() : capaActiva===2 ? getCapaTercera() : getCapaCuarta()
  }
  function accionSeleccionarRefugio(refugio:refugio){
      console.log("REFUGIO PULSADO")
      setRefugioActivo(parseInt(refugio.id))
      setCapaActiva(1)
      rellenarTareas()
      
  }
  function accionCrearGato(gato:gato){
      let listaActual = listaGatos
      listaActual.push(gato)
      CRUDGatos(refugioActivo+"",listaActual).then((datos:refugio)=>{
        const listaNueva = datos.gatos
        setListaGatos(listaNueva)
        accionCerrarModal()
      }).catch(error=>console.log(error.toString()))
  }
  function accionModificarGato(gato:gato){
    let listaActual = listaGatos.map(gatoMap => gatoMap.id===gato.id? gato : gatoMap)
    CRUDGatos(refugioActivo+"",listaActual).then((refugio:refugio)=>{
      const nuevaLista = refugio.gatos
      setListaGatos(nuevaLista)
      accionCerrarModal()
    })

  }
  function accionEliminarGato(id:string){
    let listaActual = listaGatos.filter(gato=> gato.id!==id)
    CRUDGatos(refugioActivo+"",listaActual).then(
      (datos:refugio)=>{
        const listaNueva = datos.gatos
        setListaGatos(listaNueva)
        accionCerrarModal()
      }
    ).catch(error=>console.log(error.toString()))
  }
  function accionAbrirModal(){
    setModalVisible(true)
  }
  function accionCerrarModal(){
    setModalVisible(false)
    setGatoSeleccionado(undefined)
  }
  function gestionarGatos(){
    setCapaActiva(2)
    rellenarGatos()
  }
  
  function finalizarDia(){
    let listaNoCompletadas = listaTareas.filter(tareaFiltrada => !tareasCompletadas.includes(tareaFiltrada))

    Alert.alert(
    "Resumen del día",
    `Se han completado las tareas:
    ${tareasCompletadas.map(tarea=> tarea.nombre).join(",")}
    y no se han terminado las tareas
    ${listaNoCompletadas.map(tarea=>tarea.nombre).join(",")}
    como observaciones se han aportado:
    ${informeDiario}`,
    [
      { text: "Cerrar", style: "cancel" },
      { text: "Aceptar", onPress: () => navegarAPantallaResumen() }
    ],
    { cancelable: true }
  );
  }
  function navegarAPantallaResumen(){
    setCapaActiva(3)
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
                <ListaTareas lista={listaTareas} accionPulsarTarea={accionPulsarTarea}/>
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
    return <View style={[{flex:1}]}>
            <View>
              <FlatList
              data={listaGatos}
              keyExtractor={gato=> gato.id}
              renderItem={item=> getEtiquetaGato(item)}
              />
            </View>
            <View style={{flex:1}}>
              <Pressable onPress={accionAbrirModal} style={styles.botonFab}>
                <MaterialIcons name='add' size={24} color={"white"}/>
              </Pressable>
            </View>
            <Pressable style={styles.boton} onPress={()=> setCapaActiva(1)}>
              <Text style={styles.textoBoton}>Salir</Text>
            </Pressable>
            
            {
              modalVisible && (<Modal transparent={false} animationType='slide'>
                  <DetalleGato gatoSeleccionado={gatoSeleccionado} accionCerrarDetalleGato={accionCerrarModal} accionCrearGato={accionCrearGato} accionEliminarGato={accionEliminarGato} accionModificarGato={accionModificarGato}/>
              </Modal>
              )
            }
    </View>
  }
  function getCapaCuarta():ReactElement{
    return <PantallaDespedida/>
  }


  function  getEtiquetaGato({item}){
    return <Gato item={item} EditarGato={accionSeleccionarGato}/>
  }
  function accionSeleccionarGato(gato:gato){
      setGatoSeleccionado(gato)
      setModalVisible(true)
  }
  function accionPulsarTarea(tarea:tarea,completada:boolean){
    if(completada){
      const nuevaLista = tareasCompletadas.filter(tareaFiltrada=> tareaFiltrada.id===tarea.id)
      setListaTareasCompletadas(nuevaLista)
    }else{
      const nuevaLista = [tarea,...tareasCompletadas]
      setListaTareasCompletadas(nuevaLista)
    }
      
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
    }).catch(error=> console.log(error.toString()))
  }
  function rellenarGatos(){
    consultarRefugios().then(datos=>{
      const nuevaLisa = datos[refugioActivo??0].gatos
      setListaGatos(nuevaLisa)
    })
  }
  return (
    <SafeAreaView style={{flex:1}}>
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
  botonFab:{
    position:"absolute",
    right:16,
    bottom:16,
    height:60,
    width:60,
    borderRadius:50,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#007AFF"
  }
})