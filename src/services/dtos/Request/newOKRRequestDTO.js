export function toOKRRequest(formData){
    return{
        title:formData.title,
        description:formData.description,
        cycle_id:formData.cycle_id,
        status:"ativo",
        created_at: new Date(Date.now()),
    }
}