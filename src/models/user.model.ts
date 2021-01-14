export class UserModel implements IUserProps{
    id: number;
    clientId: number;
    name: string;
    email: string;
    roleId: number;
    authedAt: string;
    deviceId: string;

    constructor(data: IUserProps){
        this.id = data.id;
        this.clientId = data.clientId;
        this.name = data.name;
        this.email = data.email;
        this.roleId = data.roleId;
        this.authedAt = data.authedAt;
        this.deviceId = data.deviceId;
    }

    static fromTokenData(data){
        return new UserModel({
            id: data.id,
            clientId: data.client_id,
            name: data.name,
            email: data.email,
            roleId: data.role_id,
            authedAt: data.authed_at,
            deviceId: data.device_id,
        });
    }

    static empty(): UserModel{
        return new UserModel({
            id: null,
            clientId: null,
            name: null,
            email: null,
            roleId: null,
            authedAt: null,
            deviceId: null,
        });
    }

}

export interface IUserProps{
    id: number;
    clientId: number;
    name: string;
    email: string;
    roleId: number;
    authedAt: string;
    deviceId: string;
}
