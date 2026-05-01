export function toKRRequest(formData){
    return{
        okr_id:formData.okr_id,
        title:formData.title,
        description:formData.description,
        initial_value:formData.initial_value,
        goal_value:formData.goal_value,
        current_value:formData.current_value,
        unit:formData.unit,
        limit_date:formData.limit_date,
        last_updated:formData.last_updated,//cooca date.now?
    }
}