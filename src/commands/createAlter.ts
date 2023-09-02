import { AlterRepo } from "../repositories/AlterRepo";
import { AlterModel } from "models/alterModel"

export async function createAlter(userId: string, args: string[]){
  const alterRepo = new AlterRepo();

  const model: AlterModel = {
    owner: userId,
    name: args[0],
    prefix: args[1],
    profile_pic_url: "https://tse3.mm.bing.net/th?id=OIP.yte7rRnbCnWi1giriwTOvwHaHa&pid=15.1"
  }

  let userAlters: AlterModel[];
  await alterRepo.getAltersByUserId(userId).then(result => userAlters = result)
  
  let alterTags : string[] = [];
  userAlters.forEach( alter => {
    alterTags.push(alter.prefix)
  })

  let alterNames : string[] = [];
  userAlters.forEach ( alter => {
    alterNames.push(alter.name)
  })
  
  if (args.length == 2
    && args[1].includes("text")
    && !alterTags.includes(args[1])
    && args[1] != "text"
    && !alterNames.includes(args[0])) {
  
      alterRepo.addAlterForUser(model);
      return "Alter < " + model.name + " > has been succefully created"
  
    }
  else {
    if (args.length != 2){
      return "Error: Insufficent arguments";
    }
    if (args[1] === "text"){
      return "Error: Tag may not be only <text>";
    }
    if (!args[1].includes("text")) {
      return "Error: This command requires a tag that contains <text> in it";
    }
    if (alterTags.includes(args[1])) {
      return "Error: You already have an Alter with that tag"
    }
    if (alterNames.includes(args[0])) {
      return "Error: You can only have one Alter with that name"
    }
  }
}
