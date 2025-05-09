import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword) {
    const SALT = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(rawPassword, SALT)
}