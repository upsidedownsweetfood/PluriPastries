import UserModel from "models/UserModel";
import { Database } from "bun:sqlite";

class UserRepo {
  db: Database 

  constructor(database: Database) {
    this.db = database
  }
  
  getById(id) {
    const row = this.db.run(`
    SELECT *
    FROM users
    WHERE users.id = ?  
    `, [id])

    return row
  }
  new(model: UserModel) {}
  delete(id) {}

  isProxyEnabled(id: number) {
    const row: any = this.db.query(`
    SELECT auto_proxy
    FROM users
    WHERE users.id=?  
    `).get(id)
    
    let is_enabled: boolean

    is_enabled = row.auto_proxy == "TRUE" ? true : false
    return is_enabled
  }

  getIdByRevoltId(revolt_id: string){
    const row: any = this.db.query(`
    SELECT id
    FROM users
    WHERE users.revolt_id=?  
    `).get(revolt_id)
    
    const id: number = row.id
    return id
  }
}

export default UserRepo
