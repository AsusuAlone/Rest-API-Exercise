import { PrismaClient } from "@prisma/client"
import express from "express"
const prisma = new PrismaClient()
const app = express()

const makeMenuRoutes = ({ app }) => {
  app.get("/", async (req, res, next) => {
    res.send({ message: "Ok api is working 🚀" })
  })

  app.get("/menu", async (req, res, next) => {
    const navigationMenu = await prisma.navigationMenu
      .findMany({})
      .catch((error) => {
        next(error)
      })
    res.send(navigationMenu)
  })

  app.get("/menu/:id", async (req, res, next) => {
    const { id } = req.params
    const navigationMenu = await prisma.navigationMenu
      .findFirstOrThrow({
        where: {
          id: id,
        },
      })
      .catch((error) => {
        next(error)
      })
    res.send(navigationMenu)
  })

  app.post("/menu", async (req, res, next) => {
    const { name, list } = req.body
    const user = await prisma.user
      .create({
        data: {
          name: name,
          list: list,
        },
      })
      .catch((error) => {
        next(error)
      })
    res.send(navigationMenu)
  })

  app.delete("/menu/:id", async (req, res, next) => {
    const { id } = req.params
    const navigationMenu = await prisma
      .delete({
        when: {
          id: id,
        },
      })
      .catch((error) => {
        next(error)
      })
    res.send(navigationMenu)
  })

  app.put("/menu/:id", async (req, res, next) => {
    const { id } = req.params
    const { name, list } = req.body
    const user = await prisma
      .update({
        when: {
          id: id,
        },
        data: {
          name: name,
          list: list,
        },
      })
      .catch((error) => {
        next(error)
      })
    res.send(navigationMenu)
  })
}

export default makeMenuRoutes
