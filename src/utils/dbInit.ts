import { Database } from "sqlite3";

function dbInit(database: Database){
  database.run("CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, owner TEXT, prefix TEXT, name TEXT, profile_pic_url TEXT, color TEXT)");

  database.run(`
  CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    revolt_id TEXT NOT NULL,
    auto_proxy BOOLEAN NOT NULL,
    auto_proxy_member INTEGER,
    FOREIGN KEY (auto_proxy_member)
      REFERENCES members (id))
  `); 
}

export default dbInit
