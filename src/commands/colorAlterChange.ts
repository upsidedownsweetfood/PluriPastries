import { AlterRepo } from "../repositories/AlterRepo"

export async function colorAlterChange(userId: string, args: string[]){
  const alterRepo = new AlterRepo();

  if (args.length == 2){
    const alterName = args[0];
    const alterColor = args[1];

    
    
    return "The Alter's colour has been changed"
  }
}
