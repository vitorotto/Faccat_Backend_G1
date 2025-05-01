import userRepository from '../../domain/ports/UserRepository'

export const user = (userRepository) => {
    return async ({ name, email, password }) => {
        const existingUser = userRepository.findByEmail(email)
        if (existingUser) {
            throw new Error('Usuário já registrado')
        }

        const newUser = await userRepository.create({ name, email, password })
        return newUser
    }
}
