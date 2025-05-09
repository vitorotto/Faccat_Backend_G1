import { encodePassword } from '../../utils/bcrypt.js';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class UserPrismaRepository {
    async create({ name, email, password }) {
        const hashPassword = encodePassword(password)
        return createdUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
            }
        })
    }

    // export function findByEmail(email) {
    //     // todo
    // }
    
    // export function findByName(name) {
    //     // todo
    // }
    
    // export function findById(id) {
    //     // todo
    // }
}

