import { PrismaClient } from "@prisma/client"
import express from "express"
import mw from "../middlewares/mw.js"
const prisma = new PrismaClient()
const app = express()

const makeRoleRoutes = ({ app }) => {
  app.get("/", async (req, res, next) => {
    res.send({ message: "Ok api is working 🚀" })
  })

  app.get(
    "/roles",
    mw(async (req, res, next) => {
      const roles = await prisma.role
        .findMany({
          include: { User: true },
        })
        .then((roles) => {
          res.status(200).send(roles)
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message || `Some error occured when retrieving roles`,
          })
          next(error)
        })
    })
  )

  app.get(
    "/role/:id",
    mw(async (req, res, next) => {
      const { id } = req.params
      const role = await prisma.role
        .findFirstOrThrow({
          where: {
            id: id,
          },
          include: {
            User: true,
          },
        })
        .then((role) => {
          res.status(200).send(role)
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occured when retrieving role with id ${id}`,
          })
          next(error)
        })
    })
  )

  app.post(
    "/role",
    mw(async (req, res, next) => {
      const { name, User: firstname } = req.body
      const role = await prisma.role.create({
        data: {
          name: name,
          User: {
            User: firstname,
          },
        },
      })
      res
        .status(200)
        .send({
          message: `Role have been created successfully`,
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message || `Some error occurred when trying to create role`,
          })
          next(error)
        })
    })
  )

  app.delete(
    "/role/:id",
    mw(async (req, res, next) => {
      const { id } = req.params
      const role = await prisma.delete({
        when: {
          id: id,
        },
      })
      res
        .status(200)
        .send({
          message: `Role have been deleted successfully`,
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occurred when trying to delete role with id : ${id}`,
          })
          next(error)
        })
    })
  )

  app.put(
    "/role/:id",
    mw(async (req, res, next) => {
      const { id } = req.params
      const { name } = req.body
      const role = await prisma.update({
        when: {
          id: id,
        },
        data: {
          name: name,
        },
      })
      res
        .status(200)
        .send({
          message: `Role have been update successfully`,
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occurred when trying to update role with id : ${id}`,
          })
          next(error)
        })
    })
  )
}

export default makeRoleRoutes
