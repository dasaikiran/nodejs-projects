const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {customError} = require('../error/customError')

const getAllTasks = asyncWrapper(async (req, res) => {
    const task = await Task.find({})
    res.status(200).json({ task })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskId } = req.params
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
        return next(customError(`The task with id ${taskId} is not not not found`,404))
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        returnDocument: 'after',
        runValidators: true
    })
    if (!task) {
        return res.status(404).json({ message: `The task with id ${taskId} is not found` })
    }
    res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndDelete({ _id: taskId })
    if (!task) {
        return res.status(404).json({ message: `The task with id ${taskId} is not found` })
    }
    res.status(200).json({ task })
})

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}