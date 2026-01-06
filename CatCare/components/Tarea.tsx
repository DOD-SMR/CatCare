import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { ReactElement, useState } from 'react'
import { tarea } from '../model/Tipos'
import { MaterialIcons } from '@expo/vector-icons'
type TareaProps={
    item:tarea
    accionPulsarTarea:(tarea:tarea,completada:boolean)=>void
}
export default function Tarea({item,accionPulsarTarea}:TareaProps){
  const [completada,setCompletada] = useState<boolean>(false)
  return (
    <View style={[styles.contenedor,{opacity:completada?0.5 : 1}]}>
      <Text style={styles.texto}>{item.nombre}</Text>
      <Pressable onPress={()=> {
        setCompletada(!completada)
        accionPulsarTarea(item,completada)
        }} style={styles.boton}>
        <MaterialIcons name={"check-circle"} size={32} color={"#51a926ff"}/>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        justifyContent:"space-evenly",
        flexDirection:"row",
         backgroundColor: "#FFFFFF",
        borderRadius: 50,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,

    },
    texto:{
        fontSize:18,
        width:"70%",
        fontWeight:"bold",
        textAlign:"center",
        color:"#000000"
    },
    boton:{

    }
})