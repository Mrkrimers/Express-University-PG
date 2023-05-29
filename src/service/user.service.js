const { getAllUsersDB, postCreateUserDB } = require(`../repository/user.repository`);


async function getAllUsers() {
    const data = await getAllUsersDB();
    if (!data.length) throw new Error(`your DataBase is empty`)
    return data;
}

async function postCreateUser(birth, city, age, name, surname) {
    const data = await postCreateUserDB(birth, city, age, name, surname);
    if (!data.length) throw new Error(`object does not created`)
    return data;
}

module.exports = { getAllUsers, postCreateUser }