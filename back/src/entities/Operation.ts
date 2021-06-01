import {EntityConfig, Entity} from "./Entity"
export interface OperatingConfig extends EntityConfig {
    account_id:number, 
    amount:number
}
 
export class OperationEntity extends Entity {

    private _account_id:number;

    private _amount:number;

    constructor(operation:OperatingConfig){
        super(operation);
        this._account_id = operation.account_id;
        this._amount = operation.amount;
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
    
}