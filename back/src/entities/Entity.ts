export type EntityConfig = {
    id?: number,
    created_at?:Date,
    updated_at?:Date
}

export class Entity {
    
    private _id: number|null;

    private _created_at : Date|null;
    
    private _updated_at : Date|null;

    constructor(entity:EntityConfig){
        if (this.constructor == Entity) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this._id = entity.id || null;
        this._created_at = entity.created_at || null;
        this._updated_at = entity.updated_at || null;
    }

    get id() : number|null{
        return this._id;
    }

    set id(value: number|null){
        this._id = value;
    }
    get created_at():Date|null{
        return this._created_at;
    }

    get updated_at():Date|null{
        return this._updated_at;
    }

}