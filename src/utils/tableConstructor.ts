import { AlterModel } from '../models/alterModel'
export function tableConstructor(data: AlterModel[]){
  const header = "| Name | tag |\n|----|----|\n"
  let body : string = "";
  data.forEach(alter => {
    body = body +
    "|" + alter.name  + "|" + alter.prefix + "|\n"
  })
  body = body.slice(0, body.length - 2)
  return header + body
}
