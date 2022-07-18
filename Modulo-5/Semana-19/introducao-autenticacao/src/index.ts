import { app } from "./app";
import UserEntity from "./EndPoints/User";

const user = new UserEntity()

app.get('/user/login', user.login)

app.get('/user/search', user.getByEmail)

app.get('/user', user.getById)

app.post('/user', user.create)
