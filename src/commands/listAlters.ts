import { AlterRepo } from "../repositories/AlterRepo"
import { AlterModel } from "../models/alterModel"
import { tableConstructor } from '../utils/tableConstructor'

export async function listAlters(userId: string) {
  const alterRepo = new AlterRepo();
  let alters: AlterModel[];
  await alterRepo.getAltersByUserId(userId).then(result => { alters = result })
  
  if (alters.length > 0 ) {
    return tableConstructor(alters)
  }
  else {
    return "No Members found for this user"
  }
}
