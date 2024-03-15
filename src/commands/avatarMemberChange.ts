import { Database } from "bun:sqlite";
import MemberModel from "../models/MemberModel"
import { MemberRepo } from "../repositories/MemberRepo"

export async function avatarMemberChange(userId: string, args: string[], database: Database){
  const memberRepo = new MemberRepo(database);
  let userAlters : MemberModel[] = [];
  await memberRepo.getAltersByUserId(userId).then( result => userAlters = result )

  let userAltersNames : string[] = [];
  userAlters.forEach(alter => userAltersNames.push(alter.name));

  if (args.length == 2) {
    if (userAltersNames.includes(args[0])){
      userAlters.forEach( alter => {
	if (alter.name == args[0]) {
	  alter.profile_pic_url = args[1];
	  memberRepo.editAlter(alter)
	}
      })
    }
    return "The profile picture for the Member has been changed"
  }

  if (args.length != 2) {
    return "Error: Insufficent number of arguments. \nexample: !ck avatar < name > < url >"
  }
  
} 
