export type OperatingConfig = {
    id?: number,
    account_id:number, 
    amount:number,
    created_at?:Date,
    updated_at?:Date
}
export class OperationEntity {
    private _id:number|null;

    private _account_id:number;

    private _amount:number;
    private _created_at:Date|null;
    private _updated_at:Date|null;


    constructor(operation:OperatingConfig){
        this._id = operation.id||null;
        this._account_id = operation.account_id;
        this._amount = operation.amount;
        this._created_at = operation.created_at||null;
        this._updated_at = operation.updated_at||null;
    }

    get id() : number|null{
        return this._id;
    }

    set id(value: number|null){
        this._id = value;
    }

    get account_id() : number{
        return this._account_id;
    }

    set account_id(value: number){
        this._account_id = value;
    }

    get amount() : number{
        return this._amount;
    }

    set amount(value: number){
        this._amount = value;
    }
    
    get created_at():Date|null{
        return this._created_at;
    }

    get updated_at():Date|null{
        return this._updated_at;
    }
}