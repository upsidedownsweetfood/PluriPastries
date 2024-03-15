import { Message } from "revolt.js"
import { Database } from "sqlite3";
import { MemberRepo } from "../repositories/MemberRepo"
import MemberModel from "../models/MemberModel"

export default async function sendAsMember(message: Message, database: Database) {
  const alterRepo: MemberRepo = new MemberRepo(database);
  let alters: MemberModel[];
  await alterRepo.getAltersByUserId(message.author.id).then(result => alters = result);

  alters.forEach( async alter => {
    const pre_prefix = alter.prefix.split("text");
    if (message.content.startsWith(pre_prefix[0]) && message.content.endsWith(pre_prefix[1])) {
      let actualContent: string = message.content;
      actualContent = actualContent.slice(pre_prefix[0].length, actualContent.length - pre_prefix[1].length)

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
	  content: actualContent,
	  masquerade: {
	    name: alter.name ,
	    avatar: alter.profile_pic_url,
	    color: alter.color
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
  })
}
