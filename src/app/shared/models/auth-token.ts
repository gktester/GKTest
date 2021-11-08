export interface AuthToken {
    id: number;
    userId: number;
    userRoles: string;
    accessToken: string;
    refreshToken: string;
}
export interface DecodedAuthToken {
    auth: string;
    exp: number;
    iat: number;
    sub: string;
    tid: string;
    uid: number;
}
