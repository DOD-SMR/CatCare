import { Platform } from "react-native";
import { refugio, refugios, tareas } from "../model/Tipos";
import axios from "axios";
const IP = Platform.OS === "android" ? "10.0.2.2" : "localhost"
export async function consultarRefugios():Promise<refugios>{
    const URL = `http://${IP}:3000/refugios`
    const respuesta = await axios.get(URL)
    return respuesta.data
}
