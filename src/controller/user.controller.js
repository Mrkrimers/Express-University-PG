const route = require(`express`).Router();
const { buildResponse } = require(`../helper/buildResponce`);
const { getAllUsers, postCreateUser } = require(`../service/user.service`);

route.get(`/`, async (req, res) => {
    try {
        const data = await getAllUsers();

        buildResponse(res, 200, data);
    } catch (err) {
        buildResponse(res, 404, err.message);
    }
})

route.post(`/`, async (req, res) => {
    try {
        const { birth, city, age, name, surname } = req.body;
        const data = await postCreateUser(birth, city, age, name, surname);

        buildResponse(res, 200, data)
    } catch (err) {
        buildResponse(res, 404, err.message)
    }

})

module.exports = route;