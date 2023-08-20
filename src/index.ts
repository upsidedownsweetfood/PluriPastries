import { Client, Message } from "revolt.js";
import { commandHandler } from "./utils/commandHandler"
import config from "../config.json"
const client : Client = new Client();


client.on("ready", async () => {
  console.info(`Gummed in as ${client.user.username}!`)
  client.user.edit({status : {text: config.prefix + "help for the help menu"}})
});

client.on("messageCreate", async (message: Message) => {
    if (message.author.bot) {}
    else {
      if (message.content.startsWith(config.prefix)){commandHandler(message, config.prefix)}
      else {}
    }
});

client.loginBot(config.botKey);
