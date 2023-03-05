import { PrismaClient } from "@prisma/client"
import express from "express"
import jsonwebtoken from "jsonwebtoken"
import { InvalidCredentialsError } from "../errors.js"
import mw from "../middlewares/mw"
const prisma = new PrismaClient()
const app = express()

const makeUserSignRoutes = ({ app }) => {
  app.post(
    "/sign-in",
    mw(async (req, res, next) => {
      const { email, password } = req.body
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email: email,
        },
      })
      if (!user) {
        throw new InvalidCredentialsError()
      }
      const jwt = jsonwebtoken.sign(
        {
          payload: {
            User: {
              id: user.id,
              fullName: `${user.firstname} ${user.lastname}`,
            },
          },
        },
        config.security.session.jwt.secret,
        { expiresIn: config.security.session.jwt.expiresIn }
      )

      res.send({ result: jwt })
    })
  )
}

export default makeUserSignRoutes
