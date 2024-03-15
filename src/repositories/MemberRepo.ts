import { Database } from 'sqlite3';
import MemberModel from '../models/MemberModel';

export class MemberRepo {
  db : Database

  constructor(database_instance: Database) {
    this.db = database_instance;
  }

  async getAltersByUserId(userId : string) : Promise<MemberModel[]> {
    const query : string = 'SELECT * FROM members WHERE members.owner = "' + userId + '"'

    let result: MemberModel[] = await new Promise((resolve, reject) => {
      this.db.all(query, (err, row: MemberModel[]) => {
	if (err) { return reject(err)}
	else { return resolve(row) }
      })
    })

    return result
  }

  addAlterForUser(alter: MemberModel){
    this.db.run("INSERT INTO members (owner, prefix, name, profile_pic_url, color) VALUES(?, ?, ?, ?, ?)",
      [alter.owner, alter.prefix, alter.name, alter.profile_pic_url])
  }

  editAlter(alter: MemberModel){
    this.db.run("UPDATE members SET owner=?, prefix=?, name=?, profile_pic_url=?, color=? WHERE members.id=?",
      [alter.owner, alter.prefix, alter.name, alter.profile_pic_url, alter.color, alter.id])
  }

  delete(alterId: number) {
    this.db.run("DELETE FROM members WHERE members.id=?", [alterId])
  }
  
}
