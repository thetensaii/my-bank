export type UserProps = {
    id : number,
    login : string,
    firstname: string,
    lastname: string,
    email: string,
    created_at:Date,
    updated_at?:Date|null,
    is_admin?:boolean
}