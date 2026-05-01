export function toOKRResponse(apiData){
    return{
        id:apiData.id,
        title:apiData.title,
        description:apiData.description,
        cycle_id:apiData.cycle_id,
        director_id:apiData.director_id,
        manager_id:apiData.manager_id,
        status:apiData.status,
        created_at: new Date(apiData.created_at),
    }
}