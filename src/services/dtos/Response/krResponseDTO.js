export function toKRResponse(apiData){
    return{
        id:apiData.id,
        okr_id:apiData.okr_id,
        title:apiData.title,
        description:apiData.description,
        initial_value:apiData.initial_value,
        goal_value:apiData.goal_value,
        current_value:apiData.current_value,
        unit:apiData.unit,
        limit_date:apiData.limit_date,
        last_updated:apiData.last_updated,
    }
}