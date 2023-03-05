import { PrismaClient } from "@prisma/client"
import express, { json, urlencoded } from "express"
import morgan from "morgan"
import makeMenuRoutes from "./routes/navigationMenu.js"
import makePageRoutes from "./routes/page.js"
import makeRoleRoutes from "./routes/role.js"
import makeUserRoutes from "./routes/user.js"
const prisma = new PrismaClient()

const app = express()
app.use(json())
app.use(morgan("dev"))
app.use(urlencoded({ extended: false }))

makeUserRoutes({ app })
makeRoleRoutes({ app })
makePageRoutes({ app })
makeMenuRoutes({ app })

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
