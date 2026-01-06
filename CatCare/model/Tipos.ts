export type tarea={
        id:string
        nombre:string
        status:string
}
export type tareas=Array<tarea>
export type refugio={
    nombre:string
    descripcion:string
    id:string
    tareas:tareas
    ubicacion:ubicacion
    observacionDiaria:string
    gatos:gatos

}
export type refugios=Array<refugio>
export type ubicacion={
    latitude:number
    longitude:number
}
export type gato=gatoFormulario&{
    id:string
}
export type gatoFormulario={
    nombre:string
    sexo:Sexo
    estado:Estado
    observaciones:string
    urlFoto:string
}
export type gatos=Array<gato>
export type Sexo="macho"|"hembra" | ""
export type Estado = "normal" | "prioritario" | "urgente" | ""