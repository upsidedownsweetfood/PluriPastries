import { AlterRepo } from "../repositories/AlterRepo"
import { AlterModel } from "../models/alterModel"

export async function colorAlterChange(userId: string, args: string[]){
  const alterRepo = new AlterRepo();
  const regexHex = /^#[0-9A-F]{6}$/i;
  
  if (args.length == 2 && regexHex.test(args[1])){
    const alterName = args[0];
    const alterColor = args[1];

    let alters: AlterModel[];
    await alterRepo.getAltersByUserId(userId).then( result => alters = result ) // fetching alters from user.
    if (alters.length == 0) return "This user has no Alters." // checking if returned array is at least not 0, if len 0, then return. 

    let alterToEdit: AlterModel;
    alters.forEach( alter => {
      if (alter.name == alterName) {
	alterToEdit = alter;
      }
    })

    alterToEdit.color = alterColor;
    alterRepo.editAlter(alterToEdit)
    
    return "The Alter's colour has been changed."
  }

  return "Error: Insufficent Arguments"
}
