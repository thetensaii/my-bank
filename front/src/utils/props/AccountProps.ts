export type AccountProps = {
    id : number,
    user_id : number,
    name:string,
    balance:number,
    created_at:Date|null,
    updated_at?:Date|null,
}