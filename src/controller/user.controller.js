const route = require(`express`).Router();
const { buildResponse } = require(`../helper/buildResponce`);
const { getAllUsers, postCreateUser, getUserById, putUserUpdate, deleteUser } = require(`../service/user.service`);
const { isValidUserID, isValidUserBody } = require(`../helper/validation`)

route.get(`/`, async (req, res) => {
    try {
        const data = await getAllUsers();

        buildResponse(res, 200, data);
    } catch (err) {
        buildResponse(res, 404, err.message);
    }
})

route.post(`/`, isValidUserBody, async (req, res) => {
    try {
        const { birth, city, age, name, surname } = req.body;
        const data = await postCreateUser(birth, city, age, name, surname);

        buildResponse(res, 200, data)
    } catch (err) {
        buildResponse(res, 404, err.message)
    }

})

route.get(`/:id`, isValidUserID, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getUserById(id);

        buildResponse(res, 200, data)
    } catch (er) {
        buildResponse(res, 404, er.message);
    }
})

route.put(`/:id`, isValidUserBody, isValidUserID, async (req, res) => {
    try {
        const { id } = req.params;
        const { birth, city, age, name, surname } = req.body;

        const data = await putUserUpdate(id, birth, city, age, name, surname);

        buildResponse(res, 200, data);

    } catch (err) {
        buildResponse(res, 404, err.message);
    }
})

route.delete(`/:id`, isValidUserID, async (req, res) => {
    try {
        const { id } = req.params;

        const data = await deleteUser(id);

        buildResponse(res, 200, data);
    } catch (err) {
        buildResponse(res, 404, err.message);
    }
})





module.exports = route;