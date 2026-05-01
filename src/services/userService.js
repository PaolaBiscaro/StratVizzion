import { toUserResponse } from "./dtos/userDTO";

export async function buscarUsuario(id) {
    const response = await fetch("iNSERIR API AQUI");
    const data = await response.json();
    return toUserResponse(data);
}