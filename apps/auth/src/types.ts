export type RegisterUserPayload = {
    email : string,
    password : string,
    username : string
}

export type LoginUserPayload = {
    password:string,
    email?:string
}

export type ValidateUserPayload = {
    token:string
}


export interface IJwtVerify {
    id: string;
    iat: number;
    exp: number;
  }