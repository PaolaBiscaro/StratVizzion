import { toUserResponse } from "./dtos/Response/userSidebarResponseDTO";

export async function SearchUser(id) {//Deve funcionar apartir do login
    const response = await fetch("iNSERIR API AQUI");
    const data = await response.json();
    return toUserResponse(data);
}