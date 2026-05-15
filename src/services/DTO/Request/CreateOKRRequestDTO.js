class CreateOKRRequestDTO{
    constructor({title, description, cycleId, directorId,managerId,statusEnum,createdAt}){
        this.title = title;
        this.description = description;
        this.cycleId = cycleId;
        this.directorId = directorId;
        this.managerId = managerId;
        this.statusEnum = statusEnum;
        this.createdAt = Date.now();
    }
}