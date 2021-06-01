import {EntityConfig, Entity} from "./Entity"

export interface UserConfig extends EntityConfig{
    login: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    is_admin?:boolean
}

export class UserEntity extends Entity{

    private _login: string;

    private _firstname: string; 

    private _lastname: string;

    private _email: string;

    private _password: string;

    private _is_admin:boolean;
    constructor(user:UserConfig){
        super(user);
        this._login = user.login;
        this._firstname = user.firstname;
        this._lastname = user.lastname;
        this._email = user.email;
        this._password = user.password;
        this._is_admin = Boolean(user.is_admin) || false;
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

    get is_admin():boolean{
        return this._is_admin;
    }

    set is_admin(value:boolean){
        this._is_admin = Boolean(value);
    }
}
