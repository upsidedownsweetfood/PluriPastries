import { MemberRepo } from "../repositories/MemberRepo"
import MemberModel from "../models/MemberModel"
import { Database } from "sqlite3";

async function colorMemberChange(userId: string, args: string[], database: Database){
  const memberRepo = new MemberRepo(database);
  const regexHex = /^#[0-9A-F]{6}$/i;
  
  if (args.length == 2 && regexHex.test(args[1])){
    const alterName = args[0];
    const alterColor = args[1];

    let alters: MemberModel[];
    await memberRepo.getAltersByUserId(userId).then( result => alters = result ) // fetching alters from user.
    if (alters.length == 0) return "This user has no Members." // checking if returned array is at least not 0, if len 0, then return. 

    let alterToEdit: MemberModel;
    alters.forEach( alter => {
      if (alter.name == alterName) {
	alterToEdit = alter;
      }
    })

    alterToEdit.color = alterColor;
    memberRepo.editAlter(alterToEdit)
    
    return "The Member's colour has been changed."
  }

  return "Error: Insufficent Arguments"
}

export default colorMemberChange
