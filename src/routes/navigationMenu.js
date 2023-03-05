import { PrismaClient } from "@prisma/client"
import express from "express"
import mw from "../middlewares/mw.js"
const prisma = new PrismaClient()
const app = express()

const makeMenuRoutes = ({ app }) => {
  app.get("/", async (req, res, next) => {
    res.send({ message: "Ok api is working 🚀" })
  })

  app.get(
    "/menu",
    mw(async (req, res, next) => {
      const navigationMenu = await prisma.navigationMenu
        .findMany({})
        .then((navigationMenu) => {
          res.status(200).send(navigationMenu)
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message || `Some error occured when retrieving menu items`,
          })
          next(error)
        })
    })
  )

  app.get(
    "/menu/:id",
    mw(async (req, res, next) => {
      const { id } = req.params
      const menuItem = await prisma.navigationMenu
        .findFirstOrThrow({
          where: {
            id: id,
          },
        })
        .then((menuItem) => {
          res.status(200).send(menuItem)
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occured when retrieving menu item with id ${id}`,
          })
          next(error)
        })
    })
  )

  app.post(
    "/menu",
    mw(async (req, res, next) => {
      const { name, list } = req.body
      const menuItem = await prisma.navigationMenu
        .create({
          data: {
            name: name,
            list: list,
          },
        })
        .then((menuItem) => {
          res.status(200).send(menuItem)
        })
        .catch((error) => {
          res.status(500).send({
            message: error.message || `Some error occured when creating menu`,
          })
          next(error)
        })
    })
  )

  app.delete(
    "/menu/:id",
    mw(async (req, res, next) => {
      const { id } = req.params
      const navigationMenu = await prisma
        .delete({
          when: {
            id: id,
          },
        })
        .then((navigationMenu) => {
          res.status(200).send(navigationMenu)
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occured when trying to delete menu with id ${id}`,
          })
          next(error)
        })
    })
  )

  app.put(
    "/menu/:id",
    mw(async (req, res, next) => {
      const { id } = req.params
      const { name, list } = req.body
      const navigationMenu = await prisma
        .update({
          when: {
            id: id,
          },
          data: {
            name: name,
            list: list,
          },
        })
        .then((navigationMenu) => {
          res.status(200).send(navigationMenu)
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occured when trying to update menu with id ${id}`,
          })
          next(error)
        })
    })
  )
}

export default makeMenuRoutes
