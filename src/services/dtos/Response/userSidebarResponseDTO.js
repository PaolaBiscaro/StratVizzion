export function toUserResponse(apiData){
    return{
        name: apiData.nome,
        role: apiData.role,
    }
}