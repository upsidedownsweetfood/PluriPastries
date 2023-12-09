import { File } from "revolt.js"
import { createAlter } from "./createAlter"
import { avatarAlterChange } from "./avatarAlterChange"

export default async function migrateAlters(author: string, attachments: File[] | undefined, source: String) {
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
      const createResult = await createAlter(author, [name, brackets])
      if ( createResult.code === 0 ) {
	await avatarAlterChange(author, [name, avatar])
      }
      let tupperStruct = {tupper: name, message: createResult}
      
      console.log(tupperStruct)
    });
    return "Migration finished, check your tuppers to confirm"
  }
  else {
    return "This is not a valid json file"
  }
}
