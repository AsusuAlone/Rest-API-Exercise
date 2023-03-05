import { PrismaClient } from "@prisma/client"
import express, { json, urlencoded } from "express"
import morgan from "morgan"
import makeMenuRoutes from "./src/routes/navigationMenu.js"
import makePageRoutes from "./src/routes/page.js"
import makeRoleRoutes from "./src/routes/role.js"
import makeUserSignRoutes from "./src/routes/sign.js"
import makeUserRoutes from "./src/routes/user.js"
const prisma = new PrismaClient()

const app = express()
app.use(json())
app.use(morgan("dev"))
app.use(urlencoded({ extended: false }))

makeUserRoutes({ app })
makeRoleRoutes({ app })
makePageRoutes({ app })
makeMenuRoutes({ app })
makeUserSignRoutes({ app })

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" })
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message,
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`))
