import { Message } from "revolt.js"
import { Database } from "bun:sqlite";
import sendAsMember from "./sendAsMemberHandler";
import checkAutoProxy from "./checkAutoProxy";
import sendAsAutoProxyMember from "./sendAsAutoProxyMember";

export async function nonCommandHandler(message : Message, database: Database){
  const should_auto_proxy = checkAutoProxy(message.author.id, database)

  if (should_auto_proxy) {
    await sendAsAutoProxyMember(message.author.id, message, database)
  }
  else {
    await sendAsMember(message, database);
  }
}
