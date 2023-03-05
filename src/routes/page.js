import { PrismaClient } from "@prisma/client"
import express from "express"
import mw from "../middlewares/mw.js"
const prisma = new PrismaClient()
const app = express()

const makePageRoutes = ({ app }) => {
  app.get("/", async (req, res, next) => {
    res.send({ message: "Ok api is working 🚀" })
  })

  app.get(
    "/pages",
    mw(async (req, res, next) => {
      const pages = await prisma.page
        .findMany({
          include: {
            user: true,
          },
        })
        .then((pages) => {
          res.status(200).send(pages)
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message || "Some error occured when retrieving pages",
          })
          next(error)
        })
    })
  )

  app.get(
    "/page/:id",
    mw(async (req, res, next) => {
      const { id } = req.params
      const page = await prisma.page
        .findFirstOrThrow({
          where: {
            id: id,
          },
          include: {
            user: true,
          },
        })
        .then((page) => {
          res.status(200).send(page)
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occured when retrieving page with id ${id}`,
          })
          next(error)
        })
    })
  )

  app.post(
    "/page",
    mw(async (req, res, next) => {
      const {
        title,
        content,
        urlSlug,
        creator,
        user,
        publicationDateTime,
        status,
      } = req.body
      const page = await prisma.page.create({
        data: {
          title: title,
          content: content,
          urlSlug: urlSlug,
          creator: creator,
          user: user,
          publicationDateTime: publicationDateTime,
          status: status,
        },
      })
      res
        .status(200)
        .send({
          message: `Page has been created successfully`,
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occurred when trying to create page with id : ${id}`,
          })
          next(error)
        })
    })
  )

  app.delete(
    "/page/:id",
    mw(async (req, res, next) => {
      const { id } = req.params
      const page = await prisma.delete({
        when: {
          id: id,
        },
      })
      res
        .status(200)
        .send({
          message: `Page have been deleted successfully`,
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occurred when trying to delete with id : ${id}`,
          })
          next(error)
        })
    })
  )

  app.put(
    "/page/:id",
    mw(async (req, res, next) => {
      const { id } = req.params
      const {
        title,
        content,
        urlSlug,
        creator,
        user,
        publicationDateTime,
        status,
      } = req.body
      const page = await prisma.update({
        when: {
          id: id,
        },
        data: {
          title: title,
          content: content,
          urlSlug: urlSlug,
          creator: creator,
          user: user,
          publicationDateTime: publicationDateTime,
          status: status,
        },
      })
      res
        .status(200)
        .send({
          message: `Page have been updated successfully`,
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occurred when trying to update page with id : ${id}`,
          })
          next(error)
        })
    })
  )
}
export default makePageRoutes
