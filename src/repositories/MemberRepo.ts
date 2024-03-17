import { Database } from 'bun:sqlite';
import MemberModel from '../models/MemberModel';

export class MemberRepo {
  db : Database

  constructor(database_instance: Database) {
    this.db = database_instance;
  }

  getById(member_id: number): MemberModel {
    const row: any = this.db.query("SELECT * FROM members WHERE members.id=?")
      .get(member_id)

    const mapped_row: MemberModel = {
      "id": row.id,
      "name": row.name,
      "prefix": row.prefix,
      "owner": row.owner,
      "profile_pic_url": row.profile_pic_url
    }

    return mapped_row   
  }
  
  getByName(name: string, user_id: string) {
    if (name == null || user_id == null) {return null}

    const query = this.db.query(`
    SELECT *
    FROM members
    WHERE members.name=?
    AND members.owner=?
    `)

    const row: any = query.get(name, user_id)
    if (row == null) {return null}
    
    const mapped_row: MemberModel = {
      "id": row.id,
      "name": row.name,
      "prefix": row.prefix,
      "owner": row.owner,
      "profile_pic_url": row.profile_pic_url
    }

    return mapped_row
  }

  getAltersByUserId(userId : string) : MemberModel[] {
    const query = this.db.query("SELECT * FROM members WHERE members.owner=?")

    let result: MemberModel[] = query.all(userId).map( (row: any) => {
      const mapped_row: MemberModel = {
	"id": row.id,
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
