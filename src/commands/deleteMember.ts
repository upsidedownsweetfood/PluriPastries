import { MemberRepo } from "../repositories/MemberRepo"
import MemberModel from "../models/MemberModel" 
import { Database } from "sqlite3";

export async function deleteMember(userId: string, args: string[], database: Database) {
  const memberRepo = new MemberRepo(database);
  let success: boolean = false;
  
  if (args.length === 1) {
    let alters: MemberModel[];
    await memberRepo.getAltersByUserId(userId).then(result => alters = result )
    alters.forEach(alter => {
      if (alter.name == args[0]) {
	memberRepo.delete(alter.id)
	success = true;
      }
    })
  }
  if (success) {
    return "Member has been deleted"
  }
  else {
    return "Failed to delete Member"
  }
}
