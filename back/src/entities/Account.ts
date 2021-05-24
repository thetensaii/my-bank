export type AccountConfig = {
    id?: number,
    user_id:number,
    name:string,
    balance:number,
    created_at?:Date,
    updated_at?:Date
}

export class AccountEntity {

    private _id: number|null;
    private _user_id: number;

    private _name: string;

    private _balance: number;

    private _created_at : Date|null;

    private _updated_at : Date|null;

    constructor(account:AccountConfig){
        this._id = account.id||null;
        this._user_id = account.user_id;
        this._name = account.name;
        this._balance = account.balance;
        this._created_at = account.created_at||null;
        this._updated_at = account.updated_at||null;
    }

    get id() : number|null{
        return this._id;
    }

    set id(value: number|null){
        this._id = value;
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

    get created_at():Date|null{
        return this._created_at;
    }

    get updated_at():Date|null{
        return this._updated_at;
    }
}