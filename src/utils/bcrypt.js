import * as bcrypt from 'bcrypt';

const SALT = bcrypt.genSaltSync(10)

export function encodePassword(rawPassword) {
    return bcrypt.hashSync(rawPassword, SALT)
}

export function decodePassword(hashedPassword, plainPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword)
}