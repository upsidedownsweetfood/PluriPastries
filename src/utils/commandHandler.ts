import { Message } from "revolt.js"
import { Database } from "sqlite3"
import { split } from "shlex"

import { returnHelpText } from "../commands/help"
import listMember from "../commands/listMember"
import createMember from "../commands/createMember"
import { deleteMember } from "../commands/deleteMember"
import { avatarMemberChange } from "../commands/avatarMemberChange"
import colorMemberChange from "../commands/colorMemberChange"
import migrationCommand from "../commands/migrateMember"



export async function commandHandler(message : Message, db: Database,  _prefix : String) {
  let args : string[] = split(message.content);
  args.shift()
  const command = args[0]
  args.shift()

  switch(command) {
    case "help" : {
      await message.reply(returnHelpText());
      break;
    }
    case "list" : {
      await message.reply(await listMember(message.author.id, db));
      break;
    }
    case "create" : {
      const commandResponse = await createMember(message.author.id, args, db);
      await message.reply (commandResponse.message)
      break
    }
    case "delete" : {
      await message.reply(await deleteMember(message.author.id, args, db))
      break
    }
    case "avatar" : {
      await message.reply(await avatarMemberChange(message.author.id, args, db));
      break
    }
    case "color" : {
      await message.reply(await colorMemberChange(message.author.id, args, db));
      break
   }
   case "tupper" : {
      await message.reply(await migrationCommand(message.author.id, message.attachments, "placeholder", db))
      break
   }
  }
}
