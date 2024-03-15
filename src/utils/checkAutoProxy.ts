import { MemberRepo } from "repositories/MemberRepo";
import { Database } from "sqlite3";

async function checkAutoProxy
(
  userId: number,
  database: Database
): Promise<Boolean>
{
  const repo = new MemberRepo(database)

  return true
}

export default checkAutoProxy;
