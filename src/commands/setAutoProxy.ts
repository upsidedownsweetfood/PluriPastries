import Database from "bun:sqlite";
import { MemberRepo } from "repositories/MemberRepo";
import UserRepo from "repositories/UserRepo";
import UserModel from "models/UserModel";

function setAutoProxy(author_id: string, args: string[], database: Database) {
  
  if (args.length != 1) {return 0}

  const memberRepo = new MemberRepo(database);
  const userRepo = new UserRepo(database);

  const member = memberRepo.getByName(args[0], author_id);
  if (member == null) {return 1}

  if (
    userRepo.getIdByRevoltId(author_id)
  ){
    const user_model: UserModel = {
      "revolt_id": author_id,
      "autoProxy": false
    }
    userRepo.new(user_model)
  }

  const bot_user_id = userRepo.getIdByRevoltId(author_id)
  userRepo.setSelectedAutoProxyId(member.id, bot_user_id)
}

export default setAutoProxy
