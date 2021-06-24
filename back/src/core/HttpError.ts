// Allow to specify which Http Code we want for the Error
export class HttpError extends Error {

    private _httpCode:number;

    constructor(httpCode:number, message:string){
        super(message);
        this._httpCode = httpCode;
    }

    get httpCode() : number{
        return this._httpCode;
    }
}