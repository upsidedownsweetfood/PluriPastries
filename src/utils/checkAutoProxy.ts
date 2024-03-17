import UserRepo from "repositories/UserRepo";
import { Database } from "bun:sqlite";

function checkAutoProxy
(
  userId: string,
  database: Database
): boolean
{
  const repo = new UserRepo(database);
  const user_id = repo.getIdByRevoltId(userId);
  const is_enabled = repo.isProxyEnabled(user_id);
  
  return is_enabled
}

export default checkAutoProxy;
