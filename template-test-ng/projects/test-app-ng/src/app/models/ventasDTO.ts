import { ProductosDTO } from './productoDTO';
export interface VentasDTO {
    id:string
    producto:ProductosDTO[]
    idUsuario:string;
}