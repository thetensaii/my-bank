export type UserConfig = {
    id?: number,
    login: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    created_at?:Date,
    updated_at?:Date
}

export class UserEntity{
    private _id: number|null;

    private _login: string;

    private _firstname: string; 

    private _lastname: string;

    private _email: string;

    private _password: string;

    private _created_at : Date|null;
    private _updated_at : Date|null;

    constructor(user:UserConfig){
        this._id = user.id||null;
        this._login = user.login;
        this._firstname = user.firstname;
        this._lastname = user.lastname;
        this._email = user.email;
        this._password = user.password;
        this._created_at = user.created_at||null;
        this._updated_at = user.updated_at||null;
    }

    get id() : number|null{
        return this._id;
    }

    set id(value: number|null){
        this._id = value;
    }

    get login():string{
        return this._login;
    }

    set login(value:string){
        this._login = value;
    }

    get firstname():string{
        return this._firstname;
    }

    set firstname(value:string){
        this._firstname = value;
    }

    get lastname():string{
        return this._lastname;
    }

    set lastname(value:string){
        this._lastname = value;
    }

    get email():string{
        return this._email;
    }

    set email(value:string){
        this._email = value;
    }

    get password():string{
        return this._password;
    }

    set password(value:string){
        this._password = value;
    }

    get created_at():Date|null{
        return this._created_at;
    }

    get updated_at():Date|null{
        return this._updated_at;
    }
}
