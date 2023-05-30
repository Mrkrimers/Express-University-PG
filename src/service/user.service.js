const { getAllUsersDB, postCreateUserDB, getUserByIdDB, putUserUpdateDB, deleteUserDB } = require(`../repository/user.repository`);
const ExceptionType = require(`../exeption/exception`);

async function getAllUsers() {
    const data = await getAllUsersDB();
    if (!data.length) throw new Error(ExceptionType.DB_USER_GET)
    return data;
}

async function postCreateUser(birth, city, age, name, surname) {
    const data = await postCreateUserDB(birth, city, age, name, surname);
    return data;
}

async function getUserById(id) {
    const data = await getUserByIdDB(id);
    return data;
}

async function putUserUpdate(id, birth, city, age, name, surname) {
    const data = await putUserUpdateDB(id, birth, city, age, name, surname);

    return data;
}

async function deleteUser(id) {
    const data = await deleteUserDB(id);

    return data;
}










module.exports = { getAllUsers, postCreateUser, getUserById, putUserUpdate, deleteUser }