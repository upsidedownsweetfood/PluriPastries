import { AlterRepo } from "../repositories/AlterRepo"
import { AlterModel } from "../models/alterModel" 

export async function deleteAlter(userId: string, args: string[]) {
  const alterRepo = new AlterRepo();
  let success: boolean = false;
  
  if (args.length === 1) {
    let alters: AlterModel[];
    await alterRepo.getAltersByUserId(userId).then(result => alters = result )
    alters.forEach(alter => {
      if (alter.name == args[0]) {
	alterRepo.deleteAlter(alter.id)
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
