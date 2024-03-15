import { Database } from "sqlite3";

class UserRepo {
  db: Database 

  constructor(database: Database) {
    this.db = database
  }
  
  getById() {}
  new() {}
  delete() {}

}
