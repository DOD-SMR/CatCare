import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { ReactElement } from 'react'
import { tarea, tareas } from '../model/Tipos'
import Tarea from './Tarea'
type listaTareasProps={
    lista:tareas
}
export default function ListaTareas({lista}:listaTareasProps) {
    function getEtiquetaTarea({item}){
    return <Tarea item={item}/>
  }
  return (
    <FlatList data={lista}
              keyExtractor={tarea => tarea.nombre}
              renderItem={item => getEtiquetaTarea(item)}/>
  )
}

const styles = StyleSheet.create({})