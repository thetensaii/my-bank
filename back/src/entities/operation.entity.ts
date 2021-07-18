import {EntityJSON, Entity} from "./entity"
export interface OperationJSON extends EntityJSON {
    account_id:number, 
    amount:number,
    comment:string
}
 
export class OperationEntity extends Entity {

    private _account_id:number;

    private _amount:number;

    private _comment:string;

    constructor(operation:OperationJSON){
        super(operation);
        this._account_id = operation.account_id;
        this._amount = operation.amount;
        this._comment = operation.comment;
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

    get comment() : string{
        return this._comment;
    }

    set comment(value: string){
        this._comment = value;
    }

    toJSON() : OperationJSON {
        return {
            id : super.id,
            account_id : this._account_id,
            amount : this._amount,
            comment : this._comment,
            created_at : super.created_at,
            updated_at : super.updated_at
        }
    }
    
}