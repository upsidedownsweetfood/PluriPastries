import { Database } from 'sqlite3';
import { AlterModel } from '../models/alterModel'
import  config from "../../config.json"

export class AlterRepo {
  db : Database
  constructor() {
    this.db = new Database(config.databaseName);
    this.db.run("CREATE TABLE IF NOT EXISTS alters (id INTEGER PRIMARY KEY AUTOINCREMENT, owner TEXT, prefix TEXT, name TEXT, profile_pic_url TEXT, color TEXT)")
  }

  async getAltersByUserId(userId : string) : Promise<AlterModel[]> {
    const query : string = 'SELECT * FROM alters WHERE alters.owner = "' + userId + '"'

    let result: AlterModel[] = await new Promise((resolve, reject) => {
      this.db.all(query, (err, row: AlterModel[]) => {
	if (err) { return reject(err)}
	else { return resolve(row) }
      })
    })

    return result
  }

  addAlterForUser(alter: AlterModel){
    this.db.run("INSERT INTO alters (owner, prefix, name, profile_pic_url, color) VALUES(?, ?, ?, ?, ?)",
      [alter.owner, alter.prefix, alter.name, alter.profile_pic_url])
  }

  editAlter(alter: AlterModel){
    this.db.run("UPDATE alters SET owner=?, prefix=?, name=?, profile_pic_url=?, color=? WHERE alters.id ='" + alter.id + "'",
      [alter.owner, alter.prefix, alter.name, alter.profile_pic_url, alter.color])
  }

  deleteAlter(alterId: number) {
    this.db.run("DELETE FROM alters WHERE alters.id='"+ alterId + "'")
  }
  
}
