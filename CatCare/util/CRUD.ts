import { Platform } from "react-native";
import { gatoFormulario, gatos, refugio, refugios, tareas } from "../model/Tipos";
import axios from "axios";
const IP = Platform.OS === "android" ? "10.0.2.2" : "localhost"
export async function consultarRefugios():Promise<refugios>{
    const URL = `http://${IP}:3000/refugios`
    const respuesta = await axios.get(URL)
    return respuesta.data
}
export async function consultarRefugio(idRefugio:string):Promise<refugio>{
    const URL = `http://${IP}:3000/refugios/${idRefugio}`
    const respuesta = await axios.get(URL)
    return respuesta.data
}
export async function actualizarRefugioCompleto(refugio:refugio){
    const URL = `http://${IP}:3000/refugios/${refugio.id}`
    const respuesta = await axios.put(URL,refugio)
    return respuesta.data

}
export async function CRUDGatos(idRefugio:string,listaGatos:gatos){
    const URL = `http://${IP}:3000/refugios/${idRefugio}`
    const respuesta = await axios.patch(URL,{gatos:listaGatos})
    return respuesta.data
}
