import { Database } from "sqlite3";
import { MemberRepo } from "../repositories/MemberRepo";
import MemberModel from "models/MemberModel"

async function createMember(userId: string, args: string[], database: Database){
  const memberRepo = new MemberRepo(database);

  const model: MemberModel = {
    owner: userId,
    name: args[0],
    prefix: args[1],
    profile_pic_url: "https://tse3.mm.bing.net/th?id=OIP.yte7rRnbCnWi1giriwTOvwHaHa&pid=15.1"
  }

  let userAlters: MemberModel[];
  await memberRepo.getAltersByUserId(userId).then(result => userAlters = result)
  
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
  
      memberRepo.addAlterForUser(model);
      return {message: "Member < " + model.name + " > has been succefully created", code: 0}
  
    }
  else {
    if (args.length != 2){
      return {message: "Error: Insufficent arguments", code: 1};
    }
    if (args[1] === "text"){
      return {message: "Error: Tag may not be only <text>", code: 2};
    }
    if (!args[1].includes("text")) {
      return {message: "Error: This command requires a tag that contains <text> in it", code: 3};
    }
    if (alterTags.includes(args[1])) {
      return {message: "Error: You already have a Member with that tag", code: 4}
    }
    if (alterNames.includes(args[0])) {
      return {message: "Error: You can only have one Member with that name", code: 5}
    }
  }
}

export default createMember;
