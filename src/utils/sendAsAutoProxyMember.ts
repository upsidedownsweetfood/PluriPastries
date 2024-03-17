import Database from "bun:sqlite";
import { Message } from "revolt.js"
import { MemberRepo } from "repositories/MemberRepo";
import UserRepo from "repositories/UserRepo";
import MemberModel from "models/MemberModel";

async function sendAsAutoProxyMember(revolt_uid: string, message: Message, database: Database) {
  // assumes that every check has been done previously

  const userRepo = new UserRepo(database)
  const memberRepo = new MemberRepo(database)
  
  const user_id = userRepo.getIdByRevoltId(revolt_uid)
  const auto_proxy_id = userRepo.getSelectedAutoProxyIdByUserId(user_id)

  const member_to_proxy_as: MemberModel = memberRepo.getById(auto_proxy_id)
  const replyIds: string[] | undefined = message.replyIds;   
  let replies: any[] = [];

  if (replyIds !== undefined) {
    replyIds.forEach( replyId => {
      replies.push({
	id: replyId,
	mention: false
      })
    })
  }
  
  try{
    await message.channel.sendMessage({
      content: message.content,
      masquerade: {
	name: member_to_proxy_as.name ,
      },
      replies: replies
    })
    await message.delete();
  }
  catch(e){
    console.log(e)
    await message.channel.sendMessage("Error: PluralCake requires at least these permissions: \n- Masquerade permissions. \n- Message editing permissions.")
  } 
}

export default sendAsAutoProxyMember
