import { PrismaClient } from "@prisma/client"
import express from "express"
const prisma = new PrismaClient()
const app = express()

const makeUserRoutes = ({ app }) => {
  app.get("/users", async (req, res, next) => {
    const users = await prisma.user
      .findMany({
        include: { role: true },
      })
      .catch((error) => {
        next(error)
      })
    res.send(users)
  })

  app.get("/user/:id", async (req, res, next) => {
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
      .catch((error) => {
        next(error)
      })
    res.send(user)
  })

  app.post("/user", async (req, res, next) => {
    const { firstname, lastname, password, email, role } = req.body
    const user = await prisma.user
      .create({
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          role: role,
        },
      })
      .catch((error) => {
        next(error)
      })
    res.send(user)
  })

  app.delete("/user/:id", async (req, res, next) => {
    const { id } = req.params
    const user = await prisma
      .delete({
        when: {
          id: id,
        },
      })
      .catch((error) => {
        next(error)
      })
    res.send(user)
  })

  app.put("/user/:id", async (req, res, next) => {
    const { id } = req.params
    const { firstname, lastname, password, email, role } = req.body
    const user = await prisma
      .update({
        when: {
          id: id,
        },
        data: {
          firstname: firstname,
          lastname: lastname,
          password: password,
          email: email,
          role: role,
        },
      })
      .catch((error) => {
        next(error)
      })
    res.send(user)
  })
}

export default makeUserRoutes
