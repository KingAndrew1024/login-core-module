interface IStateSuccessBase {
    after: string;
    data?: any;
}

interface IStateErrorBase {
    after: string;
    error: any;
}

export interface ILoginStateError extends IStateErrorBase {
    after: 'LOGIN' | 'LOGOUT' | 'UNKNOWN';
}

export interface ILoginStateSuccess extends IStateSuccessBase {
    after: 'LOGIN' | 'LOGOUT' | 'UNKNOWN';
}
