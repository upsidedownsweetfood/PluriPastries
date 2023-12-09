import { Message } from "revolt.js"
import { returnHelpText } from "../commands/help"
import { listAlters } from "../commands/listAlters"
import { createAlter } from "../commands/createAlter"
import { deleteAlter } from "../commands/deleteAlter"
import { avatarAlterChange } from "../commands/avatarAlterChange"
import { colorAlterChange } from "../commands/colorAlterChange"
import migrationCommand from "../commands/migrateAlters"

import { split } from "shlex"

export async function commandHandler(message : Message, _prefix : String) {
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
      await message.reply(await listAlters(message.author.id));
      break;
    }
    case "create" : {
      const commandResponse = await createAlter(message.author.id, args);
      await message.reply (commandResponse.message)
      break
    }
    case "delete" : {
      await message.reply(await deleteAlter(message.author.id, args))
      break
    }
    case "avatar" : {
      await message.reply(await avatarAlterChange(message.author.id, args));
      break
    }
    case "color" : {
      await message.reply(await colorAlterChange(message.author.id, args));
      break
   }
   case "tupper" : {
      await message.reply(await migrationCommand(message.author.id, message.attachments, "placeholder"))
      break
   }
  }
}
