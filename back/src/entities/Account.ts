import {EntityConfig, Entity} from "./Entity"

export interface AccountConfig  extends EntityConfig{
    user_id:number,
    name:string,
    balance:number
}

export class AccountEntity extends Entity{

    private _user_id: number;

    private _name: string;

    private _balance: number;


    constructor(account:AccountConfig){
        super(account);
        this._user_id = account.user_id;
        this._name = account.name;
        this._balance = account.balance;
    }

    get user_id() : number{
        return this._user_id;
    }

    set user_id(value: number){
        this._user_id = value;
    }

    get name() : string{
        return this._name;
    }

    set name(value: string){
        this._name = value;
    }

    get balance() : number{
        return this._balance;
    }

    set balance(value: number){
        this._balance = value;
    }

}