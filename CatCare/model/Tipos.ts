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
export type gato={
    id:string
    nombre:string
    sexo:"macho" | "hembra"
    estado:"normal" | "prioritario" | "urgente"
    observaciones:string
    urlFoto:string
}
export type gatos=Array<gato>
