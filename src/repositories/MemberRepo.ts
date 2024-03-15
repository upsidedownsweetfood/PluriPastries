import { Database } from 'bun:sqlite';
import MemberModel from '../models/MemberModel';

export class MemberRepo {
  db : Database

  constructor(database_instance: Database) {
    this.db = database_instance;
  }

  async getAltersByUserId(userId : string) : Promise<MemberModel[]> {
    const query = this.db.query("SELECT * FROM members WHERE members.owner=?")

    let result: MemberModel[] = query.all(userId).map( (row: any) => {
      const mapped_row: MemberModel = {
	id: row.id,
	"name": row.name,
      	"prefix": row.prefix,
	"owner": row.owner,
	"profile_pic_url": row.profile_pic_url
      }
      return mapped_row
    })
    return result
  }

  addAlterForUser(alter: MemberModel){
    this.db.query("INSERT INTO members (owner, prefix, name, profile_pic_url) VALUES(?, ?, ?, ?)")
      .run(alter.owner, alter.prefix, alter.name, alter.profile_pic_url)
  }

  editAlter(alter: MemberModel){
    this.db.query("UPDATE members SET owner=?, prefix=?, name=?, profile_pic_url=?, color=? WHERE members.id=?")
      .run(alter.owner, alter.prefix, alter.name, alter.profile_pic_url, alter.color, alter.id)
  }

  delete(alterId: number) {
    this.db.query("DELETE FROM members WHERE members.id=?").run(alterId)
  }
  
}
