import jwt = require('jsonwebtoken');

const Secret = "secret";
const Expires = { expiresIn: 60 * 60 };
export class JwtService {
    sign(object: Object) {
        return jwt.sign(object, Secret, Expires);
    }
    verify(token: string) {
        return jwt.verify(token, Secret);
    }
    /** 无期限验证,一般用于校验密码 */
    verifyIgnoreExpiration(token: string) {
        return jwt.verify(token, Secret, { ignoreExpiration: true });
    }
    getUserFromToken(token: string) {
        // let auth = this.ctx.get('Authorization').replace('Bearer ', '');
        return this.verifyIgnoreExpiration(token);

    }

}