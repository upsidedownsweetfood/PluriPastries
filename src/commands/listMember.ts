import { MemberRepo } from "../repositories/MemberRepo"
import { tableConstructor } from '../utils/tableConstructor'
import { Database } from "bun:sqlite";
import MemberModel from "../models/MemberModel";

async function listMember(userId: string, database: Database) {
  const memberRepo = new MemberRepo(database);
  let alters: MemberModel[];
  await memberRepo.getAltersByUserId(userId).then(result => { alters = result })
  
  if (alters.length > 0 ) {
    return tableConstructor(alters)
  }
  else {
    return "No Members found for this user"
  }
}

export default listMember
