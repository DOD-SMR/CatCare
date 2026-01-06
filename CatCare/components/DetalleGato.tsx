import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { Estado, gato, gatoFormulario, Sexo } from '../model/Tipos'
import { RadioButton } from 'react-native-paper'
import 'react-native-get-random-values';
import { v4 } from 'react-native-uuid/dist/v4'

type detalleGatoProps={
    gatoSeleccionado:gato | undefined
    accionCerrarDetalleGato:()=>void
    accionCrearGato:(gato:gato)=>void
    accionModificarGato:(gato:gato)=>void
    accionEliminarGato:(id:string)=>void
}
export default function DetalleGato({gatoSeleccionado,accionCerrarDetalleGato,accionEliminarGato,accionCrearGato,accionModificarGato}:detalleGatoProps) {
    const [nombre,setNombre]=useState(gatoSeleccionado?.nombre ?? "")
    const [sexo,setSexo] = useState<Sexo>(gatoSeleccionado?.sexo ?? "")
    const [estado,setEstado] = useState<Estado>(gatoSeleccionado?.estado ?? "")
    const [observaciones,setObservaciones] = useState(gatoSeleccionado?.observaciones?? "")
    const [urlFoto,setUrlFoto] = useState(gatoSeleccionado?.urlFoto ?? "")

  return (
    
    <View style={styles.container}>
        <Image source={urlFoto} contentFit='cover' style={styles.foto}/>
        <View style={styles.fila}>
            <Text>Nombre</Text>
            <TextInput value={nombre} onChangeText={setNombre} placeholder='Introduce un nombre' style={styles.cuadroTexto}></TextInput>
        </View>
        <View style={styles.fila}>
            <Text>URL FOTO</Text>
        <TextInput value={urlFoto} onChangeText={setUrlFoto} placeholder='Introduce la url de una foto' style={styles.cuadroTexto}></TextInput>

        </View>
        <View style={styles.fila}>
            <Text>Sexo</Text>
            <RadioButton.Group
                onValueChange={(valor) => setSexo(valor as Sexo)}
                value={sexo}
                >
                <View style={{flexDirection:"row"}}>
                <RadioButton.Item label="Macho" value='macho' />
                <RadioButton.Item label="Hembra" value='hembra' />
                </View>
               
            </RadioButton.Group>
        </View>
        
        <View style={styles.fila}>
            <Text>Estado</Text>
            <RadioButton.Group
            onValueChange={valor => setEstado(valor as Estado)}
            value={estado}
            >
            <View style={{flexDirection:"row"}}>
            <RadioButton.Item label="Normal" value="normal" />
            <RadioButton.Item label="Prioritario" value="prioritario" />
            <RadioButton.Item label="Urgente" value="urgente" />
            </View>
           
            </RadioButton.Group>
        </View>
        <View style={styles.fila}>
            <Text>Observaciones</Text>
            <TextInput value={observaciones} onChangeText={setObservaciones} placeholder='Observaciones sobre el gato' style={styles.areaTexto}></TextInput>
        </View>
        <View style={{width:"100%"}}>
            {
                gatoSeleccionado !== undefined && (
                    <View style={styles.filaBotones}>

                    <Pressable style={styles.boton} onPress={() => accionModificarGato({id:gatoSeleccionado.id,nombre,sexo,estado,observaciones,urlFoto})}>
                        <Text style={styles.textoBoton}>Modificar Gato</Text>
                    </Pressable>
                    <Pressable style={styles.boton} onPress={() =>accionEliminarGato(gatoSeleccionado.id)}>
                        <Text style={styles.textoBoton}>Eliminar Gato</Text>
                    </Pressable>
                    <Pressable style={styles.boton} onPress={accionCerrarDetalleGato}>
                        <Text style={styles.textoBoton}>Salir</Text>
                    </Pressable>
                    </View>
                    
                )
            }
            {
                gatoSeleccionado === undefined && (
                    <View style={styles.filaBotones}>
                        <Pressable style={styles.boton} onPress={()=> accionCrearGato({id:v4(),nombre,sexo,estado,observaciones,urlFoto})}>
                            <Text style={styles.textoBoton}>Crear Gato</Text>
                        </Pressable>
                        <Pressable style={styles.boton} onPress={accionCerrarDetalleGato}>
                            <Text style={styles.textoBoton}>Salir</Text>
                        </Pressable>
                    </View>
                )
            }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    foto: {
        width: 200,
        aspectRatio: 1,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#6366f1",
        backgroundColor: "#e0e7ff",
    },
    cuadroTexto: {
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#d1d5db",
        width:"100%"
    },
    areaTexto: {
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#d1d5db",
        height: 100,
        textAlignVertical: "top",
        width:"100%"
    },
    container:{
            paddingVertical: 10,
            paddingHorizontal: 16,
            backgroundColor: "#F0F1FF",
            rowGap: 8,
            justifyContent:"flex-start",
            alignItems:"center"
    },
    fila:{
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign:"left"
    },
    filaBotones: {
        flexDirection: "column",
        columnGap: 2,
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
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    textAlign: 'center',
  },

})