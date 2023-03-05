import { PrismaClient } from "@prisma/client"
import express from "express"
const prisma = new PrismaClient()
const app = express()

const makePageRoutes = ({ app }) => {
  app.get("/", async (req, res, next) => {
    res.send({ message: "Ok api is working 🚀" })
  })

  app.get("/pages", async (req, res, next) => {
    const pages = await prisma.page
      .findMany({
        include: {
          user: true,
        },
      })
      .catch((error) => {
        next(error)
      })
    res.send(pages)
  })

  app.get("/page/:id", async (req, res, next) => {
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
      .catch((error) => {
        next(error)
      })
    res.send(page)
  })

  app.post("/page", async (req, res, next) => {
    const {
      title,
      content,
      urlSlug,
      creator,
      user,
      publicationDateTime,
      status,
    } = req.body
    const page = await prisma.page
      .create({
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
      .catch((error) => {
        next(error)
      })
    res.send(page)
  })

  app.delete("/page/:id", async (req, res, next) => {
    const { id } = req.params
    const page = await prisma
      .delete({
        when: {
          id: id,
        },
      })
      .catch((error) => {
        next(error)
      })
    res.send(page)
  })

  app.put("/page/:id", async (req, res, next) => {
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
    const page = await prisma
      .update({
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
      .catch((error) => {
        next(error)
      })
    res.send(page)
  })
}
export default makePageRoutes
