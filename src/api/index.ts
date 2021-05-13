import Auth from '../api/middleware/auth'
import express from 'express'
import Login from './routes/login'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use('/api/login', Login)

app.use(Auth)

app.listen(3000, () => {
  console.log('The application is listening on port 3000!')
})
