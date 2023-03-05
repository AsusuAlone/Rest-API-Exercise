import { PrismaClient } from "@prisma/client"
import express from "express"
const prisma = new PrismaClient()
const app = express()

const makeRoleRoutes = ({ app }) => {
  app.get("/", async (req, res, next) => {
    res.send({ message: "Ok api is working 🚀" })
  })

  app.get("/roles", async (req, res, next) => {
    const roles = await prisma.role
      .findMany({
        include: { User: true },
      })
      .catch((error) => {
        next(error)
      })
    res.send(roles)
  })

  app.get("/role/:id", async (req, res, next) => {
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
      .catch((error) => {
        next(error)
      })
    res.send(role)
  })

  app.post("/role", async (req, res, next) => {
    const { name, User: firstname } = req.body
    const role = await prisma.role
      .create({
        data: {
          name: name,
          User: {
            User: firstname,
          },
        },
      })
      .catch((error) => {
        next(error)
      })
    res.send(role)
  })

  app.delete("/role/:id", async (req, res, next) => {
    const { id } = req.params
    const role = await prisma
      .delete({
        when: {
          id: id,
        },
      })
      .catch((error) => {
        next(error)
      })
    res.send(role)
  })

  app.put("/role/:id", async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body
    const role = await prisma
      .update({
        when: {
          id: id,
        },
        data: {
          name: name,
        },
      })
      .catch((error) => {
        next(error)
      })
    res.send(role)
  })
}

export default makeRoleRoutes
