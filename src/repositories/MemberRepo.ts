import { Database } from 'sqlite3';
import MemberModel from '../models/MemberModel';

export class MemberRepo {
  db : Database

  constructor(database_instance: Database) {
    this.db = database_instance;
    this.db.run("CREATE TABLE IF NOT EXISTS alters (id INTEGER PRIMARY KEY AUTOINCREMENT, owner TEXT, prefix TEXT, name TEXT, profile_pic_url TEXT, color TEXT)");
  }

  async getAltersByUserId(userId : string) : Promise<MemberModel[]> {
    const query : string = 'SELECT * FROM alters WHERE alters.owner = "' + userId + '"'

    let result: MemberModel[] = await new Promise((resolve, reject) => {
      this.db.all(query, (err, row: MemberModel[]) => {
	if (err) { return reject(err)}
	else { return resolve(row) }
      })
    })

    return result
  }

  addAlterForUser(alter: MemberModel){
    this.db.run("INSERT INTO alters (owner, prefix, name, profile_pic_url, color) VALUES(?, ?, ?, ?, ?)",
      [alter.owner, alter.prefix, alter.name, alter.profile_pic_url])
  }

  editAlter(alter: MemberModel){
    this.db.run("UPDATE alters SET owner=?, prefix=?, name=?, profile_pic_url=?, color=? WHERE alters.id ='" + alter.id + "'",
      [alter.owner, alter.prefix, alter.name, alter.profile_pic_url, alter.color])
  }

  delete(alterId: number) {
    this.db.run("DELETE FROM alters WHERE alters.id='"+ alterId + "'")
  }
  
}
