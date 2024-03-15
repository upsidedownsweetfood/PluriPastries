import { Message } from "revolt.js"
import { Database } from "sqlite3";
import sendAsMember from "./sendAsMemberHandler";

export async function nonCommandHandler(message : Message, database: Database){
  await sendAsMember(message, database);
}
