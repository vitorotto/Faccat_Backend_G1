export default function makeEdituser(userRepository) {
    return async function editUser(userId, {name, email, password}) {
        const existingUser = await userRepository.findById(userId);
        
        if (!existingUser) {
            throw new Error("Usuário não encontrado");
        }

        const updatedUser = await userRepository.edit(userId, {
            name,
            email, 
            password
        });

        return updatedUser;
    }
}