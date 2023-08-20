import { Message } from "revolt.js"
import { returnHelpText } from "../commands/help"
import { split } from "shlex"

export async function commandHandler(message : Message, prefix : String) {
  let args : String[] = split(message.content);
  args.shift()
  const command = args[0]

  switch(command) {
    case "help" : {
      message.reply(returnHelpText());
      break;
    }
    case "list" : {
      message.reply("not yet implemented")
      break;
    }
    case "create" : {
      message.reply("not yet implemented")
    }
  }
}
