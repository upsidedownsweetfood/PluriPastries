import { Client, Message } from "revolt.js";
import { commandHandler } from "./utils/commandHandler"
import { nonCommandHandler } from "./utils/nonCommandHandler"
import { Database } from "bun:sqlite";
import config from "../config.json"
import dbInit from "utils/dbInit";

const client : Client = new Client({ eagerFetching: false });
const db = new Database(config.databaseName);
dbInit(db);

client.on("ready", async () => {
  console.info(`logged in as ${client.user.username}!`)
  client.user.edit(
    {
      status : {
	text: config.prefix + " help for the help menu"
      }
    }
  )
});


client.on("messageCreate", async (message: Message) => {
  try{ if (!message.author) { await client.users.fetch(message.authorId) } }
  catch(e){console.log(e)}
  
  if (message.content === undefined) {return}
  if (message.author?.bot) {return}
  
  // checks if the message's body starts with the prefix
  if (message.content.startsWith(config.prefix)) {
    commandHandler(message, db, config.prefix);
  }
  else {
    nonCommandHandler(message, db);
  }
});

client.loginBot(config.botKey);
