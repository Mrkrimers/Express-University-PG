const pool = require(`../db`);

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


    const sqlTwo = `INSERT INTO users (name, surname, info_id) VALUES( $1 , $2, $3 ) RETURNING *`;

    const dataTwo = (await client.query(sqlTwo, [name, surname, dataOne[0].id])).rows;

    return [{ ...dataOne[0], ...dataTwo[0] }]
}

module.exports = { getAllUsersDB, postCreateUserDB }