import UserModel from "models/UserModel";
import { Database } from "bun:sqlite";

class UserRepo {
  db: Database 

  constructor(database: Database) {
    this.db = database
  }
  
  getById(id) {
    const row: any = this.db.query(`
    SELECT *
    FROM users
    WHERE users.id = ?  
    `).get(id)
    if (row != null){
      return row.id
    }
    
    return null
  }
  new(model: UserModel) {
    this.db.query(`
    INSERT INTO users (revolt_id, auto_proxy) values ( ?, ? )
    `)
      .run(model.revolt_id, model.autoProxy)
  }
  delete(id) {
    this.db.query(`
    DELETE *
    FROM users
    WHERE users.id=?
    `).run(id)
  }

  isProxyEnabled(id: number) {
    if (id == null) { return false }
    const row: any = this.db.query(`
    SELECT auto_proxy
    FROM users
    WHERE users.id=?  
    `).get(id)
    
    let is_enabled: boolean

    is_enabled = row.auto_proxy == "TRUE" ? true : false
    return is_enabled
  }

  setProxyStatus(id: number, status: boolean) {
    const string_status = status == true ? "TRUE" : "FALSE"
    this.db.query("UPDATE users SET auto_proxy=? WHERE users.id=?").run(string_status, id)
  }

  getIdByRevoltId(revolt_id: string): number | null {
    const row: any = this.db.query(`
    SELECT id
    FROM users
    WHERE users.revolt_id=?  
    `).get(revolt_id)
    
    if (row != null) {
      const id: number = row.id
      return id
    }
    return null
  }

  setSelectedAutoProxyId(id: number, user_id: number){
    const query = this.db.query(`
    UPDATE users
    SET auto_proxy_member=?
    WHERE users.id=?
    `).run(id, user_id)
  }

  getSelectedAutoProxyIdByUserId(id: number) {
    const row: any = this.db.query(`
    SELECT auto_proxy_member
    FROM users
    WHERE users.id=?
    `).get(id)
    
    return row.auto_proxy_member
  }
}

export default UserRepo
