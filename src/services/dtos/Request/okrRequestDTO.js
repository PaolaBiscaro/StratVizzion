export function toOKRRequest(formData){
    return{
        title:formData.title,
        description:formData.description,
        cycle_id:formData.cycle_id,
        director_id:formData.director_id,
        manager_id:formData.manager_id,
        status:formData.status,
        created_at:new Date(Date.now()),
    }
}