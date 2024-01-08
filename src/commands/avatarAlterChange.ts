import { AlterModel } from "../models/alterModel"
import { AlterRepo } from "../repositories/AlterRepo"

export async function avatarAlterChange(userId: string, args: string[]){
  const alterRepo = new AlterRepo();
  let userAlters : AlterModel[] = [];
  await alterRepo.getAltersByUserId(userId).then( result => userAlters = result )

  let userAltersNames : string[] = [];
  userAlters.forEach(alter => userAltersNames.push(alter.name));

  if (args.length == 2) {
    if (userAltersNames.includes(args[0])){
      userAlters.forEach( alter => {
	if (alter.name == args[0]) {
	  alter.profile_pic_url = args[1];
	  alterRepo.editAlter(alter)
	}
      })
    }
    return "The profile picture for the Member has been changed"
  }

  if (args.length != 2) {
    return "Error: Insufficent number of arguments. \nexample: !ck avatar < name > < url >"
  }
  
} 
