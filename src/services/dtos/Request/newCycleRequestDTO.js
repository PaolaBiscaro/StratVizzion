export function toCycleRequest(formData){
    return{
        name:formData.name,//Como eu lido com nome?
        quarterEnum:formData.quarterEnum,
        year:Number(formData.year)
    }
}