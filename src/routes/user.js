import { PrismaClient } from "@prisma/client"
import express from "express"
import mw from "../middlewares/mw.js"
const prisma = new PrismaClient()
const app = express()

const makeUserRoutes = ({ app }) => {
  app.get(
    "/users",
    mw(async (req, res, next) => {
      const users = await prisma.user
        .findMany({
          include: { role: true },
        })
        .then((users) => {
          res.status(200).send(users)
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message || `Some error occured when retrieving users`,
          })
          next(error)
        })
    })
  )

  app.get(
    "/user/:id",
    mw(async (req, res, next) => {
      const { id } = req.params
      const user = await prisma.user
        .findFirstOrThrow({
          where: {
            id: id,
          },
          include: {
            role: true,
          },
        })
        .then((user) => {
          res.status(200).send(user)
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occured when retrieving user with id ${id}`,
          })
          next(error)
        })
    })
  )

  app.post(
    "/user",
    mw(async (req, res, next) => {
      const { firstname, lastname, password, email, role: name } = req.body
      const user = await prisma.user.create({
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          role: {
            name: name,
          },
        },
      })
      res
        .status(200)
        .send({
          message: `User have been created successfully`,
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message || `Some error occurred when trying to create user`,
          })
          next(error)
        })
    })
  )

  app.delete(
    "/user/:id",
    mw(async (req, res, next) => {
      const { id } = req.params
      const user = await prisma.delete({
        when: {
          id: id,
        },
      })
      res
        .status(200)
        .send({
          message: `User have been deleted successfully`,
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occurred when trying to delete user with id : ${id}`,
          })
          next(error)
        })
    })
  )

  app.put(
    "/user/:id",
    mw(async (req, res, next) => {
      const { id } = req.params
      const { firstname, lastname, password, email, role: name } = req.body
      const user = await prisma.update({
        when: {
          id: id,
        },
        data: {
          firstname: firstname,
          lastname: lastname,
          password: password,
          email: email,
          role: {
            name: name,
          },
        },
      })
      res
        .status(200)
        .send({
          message: `User have been updated successfully`,
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occurred when trying to update user with id : ${id}`,
          })
          next(error)
        })
    })
  )
}

export default makeUserRoutes
