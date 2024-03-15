import { Message } from "revolt.js"
import { Database } from "bun:sqlite";
import sendAsMember from "./sendAsMemberHandler";
import checkAutoProxy from "./checkAutoProxy";

export async function nonCommandHandler(message : Message, database: Database){
  await sendAsMember(message, database);
  checkAutoProxy(message.author.id, database)
}
