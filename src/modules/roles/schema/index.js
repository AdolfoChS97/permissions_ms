const Joi = require('joi')

const createRoleSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(null, ''),
})

const getRoleSchema = Joi.object({
    id: Joi.number().required()
})

const updateRoleSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(null, '')
})

const updaterRolePartiallySchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().allow(null, ''),
    description: Joi.string().allow(null, '')
})

module.exports = {
    createRoleSchema,
    getRoleSchema,
    updateRoleSchema,
    updaterRolePartiallySchema
}