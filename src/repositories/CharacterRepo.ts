import { Database } from 'sqlite3';
export class CharacterRepo {
    db : Database
    constructor() {
        this.db = new Database('db.sqlite');
    }

    getAllCharacters(){
        return this.db.get(
            'SELECT * FROM CHARACTERS',
            res => console.log(res)
        )
    }

}
