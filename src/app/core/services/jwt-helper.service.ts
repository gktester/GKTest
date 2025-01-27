import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

// JWT token fields
// exp: 1602390616
// iat: 1602304216
// scopes: "view:iot,control:devices,crud:alerts,view:settings,crud:settings"
// sub: "gk_dev_main"
// token - scope: "ACCESS_TOKEN"
// user - account - id: 232
// user - account - name: "gk_dev_main"
// user - sub - account - id: "234,235,236,233"

@Injectable({
    providedIn: 'root',
})
export class JwtHelperService {
    constructor() {}

    tokenGetter() {
        // Hardcoded the string to fix circular dependency
        return localStorage.getItem('JWT_TOKEN');
    }
    public urlBase64Decode(str: string): string {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw new Error('Illegal base64url string!');
            }
        }
        return this.b64DecodeUnicode(output);
    }

    // credits for decoder goes to https://github.com/atk
    private b64decode(str: string): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';

        str = String(str).replace(/=+$/, '');

        if (str.length % 4 === 1) {
            throw new Error('atob failed: The string to be decoded is not correctly encoded.');
        }

        for (
            // initialize result and counters
            let bc = 0, bs: any, buffer: any, idx = 0;
            // get next character
            // tslint:disable-next-line: no-conditional-assignment
            (buffer = str.charAt(idx++));
            // character found in table? initialize bit storage and add its ascii value;
            // tslint:disable-next-line: no-bitwise
            ~buffer &&
            // tslint:disable-next-line: no-conditional-assignment
            ((bs = bc % 4 ? bs * 64 + buffer : buffer),
            // and if not first of each 4 characters,
            // convert the first 8 bits to one ascii character
            bc++ % 4)
                ? // tslint:disable-next-line: no-bitwise
                  (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
                : 0
        ) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    }

    private b64DecodeUnicode(str: any) {
        return decodeURIComponent(
            Array.prototype.map
                .call(this.b64decode(str), (c: any) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
    }

    public decodeToken(token: string = this.tokenGetter()): any {
        if (!token || token === '') {
            return null;
        }

        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error(
                'The inspected token is not a JWT Token. Check to make sure it has three parts and see https://jwt.io for more.'
            );
        }

        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token.');
        }

        return JSON.parse(decoded);
    }

    public getTokenExpirationDate(token: string = this.tokenGetter()): Date | null {
        let decoded: any;
        decoded = this.decodeToken(token);

        if (!decoded || !decoded.hasOwnProperty('exp')) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);

        return date;
    }

    public isTokenExpired(token: string = this.tokenGetter(), offsetSeconds?: number): boolean {
        if (!token || token === '') {
            return true;
        }
        const date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;

        if (date === null) {
            return false;
        }

        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }

    public getAuthScheme(
        // tslint:disable-next-line: ban-types
        authScheme: Function | string | undefined,
        request: HttpRequest<any>
    ): string {
        if (typeof authScheme === 'function') {
            return authScheme(request);
        }

        return authScheme;
    }

    public getScopes(): string[] {
        const token = this.decodeToken();
        if (token && token.scopes) {
            return token.scopes.split(',');
        }
        return [];
    }

    public getUserId() {
        const token = this.decodeToken();
        if (token) {
            return token;
        }
        return [];
    }

    public hasScope(requiredScope: string): boolean {
        const availableScopes = this.getScopes();
        return availableScopes.indexOf(requiredScope) >= 0;
    }

    public hasScopes(requiredScopes: string[]): boolean {
        if (!requiredScopes || requiredScopes.length === 0) {
            throw new Error('empty scopes list provided');
        }

        requiredScopes.forEach((scope) => {
            const isValidScope = this.hasScope(scope);
            if (!isValidScope) {
                return false;
            }
        });

        return true;
    }
}
