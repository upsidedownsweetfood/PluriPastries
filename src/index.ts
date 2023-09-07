import { Client, Message } from "revolt.js";
import { commandHandler } from "./utils/commandHandler"
import { nonCommandHandler } from "./utils/nonCommandHandler"
import config from "../config.json"
const client : Client = new Client({ eagerFetching: false });


client.on("ready", async () => {
  console.info(`Gummed in as ${client.user.username}!`)
  client.user.edit({status : {text: config.prefix + " help for the help menu"}})
});

client.on("messageCreate", async (message: Message) => {
  try{if (!message.author) {await client.users.fetch(message.authorId)} }
  catch(e){console.log(e)}

  try{if (!messafe.content) {await client.messages.fetch(message.id)}}
  catch(e){console.log(e)}
  
  if (message === undefined) {return}
  if (message.author?.bot) {}
  else {
    if (message.content.startsWith(config.prefix)) {
      commandHandler(message, config.prefix);
    }
    else {
      nonCommandHandler(message);
    }
  }
});

client.loginBot(config.botKey);
