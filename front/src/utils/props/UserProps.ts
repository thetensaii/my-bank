export type UserProps = {
    id : number,
    login : string,
    firstname: string,
    lastname: string,
    email: string,
    created_at:Date|null,
    updated_at?:Date|null,
    is_admin?:boolean
}