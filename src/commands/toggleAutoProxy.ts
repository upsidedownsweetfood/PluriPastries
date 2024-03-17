import Database from "bun:sqlite"
import UserModel from "models/UserModel"
import UserRepo from "repositories/UserRepo"

function toggleAutoProxy(revolt_id: string, database: Database) {
  const userRepo = new UserRepo(database)
  
  if (userRepo.getById(
    userRepo.getIdByRevoltId(revolt_id)
  ) == null){
    const model: UserModel = {
      "revolt_id": revolt_id,
      "autoProxy": false,
    }
    userRepo.new(model)
  }
  const user_id = userRepo.getIdByRevoltId(revolt_id)
  const is_enabled = userRepo.isProxyEnabled(
    userRepo.getIdByRevoltId(revolt_id)
  )
  
  userRepo.setProxyStatus(user_id, !is_enabled)  
}

export default toggleAutoProxy
