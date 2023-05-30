const pool = require(`../db`);
const ExceptionType = require(`../exeption/exception`);

async function getAllUsersDB() {
    const client = await pool.connect();

    const sql = `SELECT * 
    FROM users_info
    JOIN users 
    ON users.info_id = users_info.id`
    const data = (await client.query(sql)).rows;

    return data;
};

async function postCreateUserDB(birth, city, age, name, surname) {
    const client = await pool.connect();

    const sqlOne = `INSERT INTO users_info (birth, city, age) VALUES( $1 , $2 , $3) RETURNING *`;

    const dataOne = (await client.query(sqlOne, [birth, city, age])).rows;
    
    if (!dataOne.length) throw new Error(ExceptionType.DB_USER_CREATE)
   
    const sqlTwo = `INSERT INTO users (name, surname, info_id) VALUES( $1 , $2, $3 ) RETURNING *`;

    const dataTwo = (await client.query(sqlTwo, [name, surname, dataOne[0].id])).rows;

    return [{ ...dataOne[0], ...dataTwo[0] }]
}

async function getUserByIdDB(id) {
    const client = await pool.connect();

    const sql = `SELECT * 
    FROM users_info
    JOIN users 
    ON users.info_id = users_info.id
    WHERE users.info_id = $1`

    const data = (await client.query(sql, [id])).rows

    if (!data.length) throw new Error(ExceptionType.DB_USER_GET_BY_ID)

    return data;
}

async function putUserUpdateDB(id, birth, city, age, name, surname) {
    const client = await pool.connect();

    const sqlOne = `UPDATE users_info
    SET birth = $1, city = $2, age = $3
    WHERE users_info.id = $4 
    RETURNING *`

    const data = (await client.query(sqlOne, [birth, city, age, id])).rows;

    if (!data.length) throw new Error(ExceptionType.DB_USER_GET_BY_ID);

    const sqlTwo = `UPDATE users
    SET name = $1, surname = $2
    WHERE users.info_id = $3
    RETURNING *`

    const dataTwo = (await client.query(sqlTwo, [name, surname, id])).rows;

    const result = { ...data[0], ...dataTwo[0] }

    return result;
}

async function deleteUserDB(id) {
    const client = await pool.connect();

    const sql = `DELETE FROM users 
    WHERE info_id = $1
    RETURNING *`

    const dataOne = (await client.query(sql, [id])).rows;

    if (!dataOne.length) throw new Error(ExceptionType.DB_USER_GET_BY_ID);

    const sqlTwo = `DELETE FROM users_info 
    WHERE users_info.id = $1
    RETURNING *`

    const dataTwo = (await client.query(sqlTwo, [id])).rows;

    return [{ ...dataOne[0], ...dataTwo[0] }]

}


module.exports = { getAllUsersDB, postCreateUserDB, getUserByIdDB, putUserUpdateDB, deleteUserDB }