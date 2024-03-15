import { File } from "revolt.js"
import { Database } from "bun:sqlite"
import createMember from "./createMember"
import { avatarMemberChange } from "./avatarMemberChange"

export default async function migrateAlters(author: string, attachments: File[] | undefined, source: String, database: Database) {
  // source is not utilized for now, it is put as an argument in case the bot evolves further
  
  let file = attachments[0]
  
  if (file.contentType === "text/plain") {

    const fileResponse = await fetch(file.url)
    const fileResponseBlob = await fileResponse.blob()
    const textFromBlob = fileResponseBlob.text()
    const jsonFromText = JSON.parse(await textFromBlob)
    
    if (jsonFromText.tuppers === "undefined"){
      return "wrong json file, be certain that this is a tupperbox migration file"
    }

    const tuppers = jsonFromText.tuppers
    
    tuppers.forEach(async element => {
      let name = element.name
      let avatar = element.avatar_url
      let brackets = element.brackets[0] + "text" + element.brackets[1]
      const createResult = await createMember(author, [name, brackets], database)
      if ( createResult.code === 0 ) {
	await avatarMemberChange(author, [name, avatar], database)
      }
      let tupperStruct = {tupper: name, message: createResult}
      
      console.log(tupperStruct)
    });
    return "Migration finished, check your Members to confirm"
  }
  else {
    return "This is not a valid json file"
  }
}
