const { Op } = require('sequelize')
const db = require('../../../models')
const { INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../../common/constants')


async function getAllUsers(pageNumber = 1, pageSize = 10, attributes = ['id', 'username']) {
    try {
        const users = await db.user.findAll({
            skip: (pageNumber - 1) * pageSize,
            limit: pageSize,
            attributes: attributes
        })
        if(!users.length) { 
            const error = new Error('Users not found')
            error.status = NOT_FOUND
            throw error
        }
        return users;
    } catch (e) {
        const error = new Error(e.message)
        error.status = INTERNAL_SERVER_ERROR   
        throw error

    }
}

async function getUserBy(param, value, attributes = ['id', 'username']) {
    try {
        const user = await db.user.findOne({ where: { [param]: value }, attributes: attributes })
        return user 
    } catch (e) {
        const error = new Error(e.message)
        error.status = INTERNAL_SERVER_ERROR
        throw error
    }
}

async function addNewUser(id, username, password) {
    try {
        return await db.user.create({ id, username, password })
    } catch (e) {
        const error = new Error(e.message)
        error.status = INTERNAL_SERVER_ERROR
        throw error
    }
}

async function completeUpdateUser(id, username, password) {
    try {
        return await db.user.update({ username: username, password :password }, { where: { id: { [Op.eq]: id } } })
    } catch (e) {
        const error = new Error(e.message)
        error.status = INTERNAL_SERVER_ERROR
        throw error
    }
}

async function editUserPartial(id, properties) {
    try {
        return await db.user.update(properties, { where: { id: { [Op.eq]: id } } })
    } catch (e) {
        const error = new Error(e.message)
        error.status = INTERNAL_SERVER_ERROR
        throw error
    }
}


module.exports = {
    getAllUsers,
    getUserBy,
    addNewUser,
    completeUpdateUser,
    editUserPartial
}