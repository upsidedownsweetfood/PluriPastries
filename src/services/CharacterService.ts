import { CharacterRepo } from "repositories/CharacterRepo";

class CharacterService {
    repo : CharacterRepo;

    constructor() {
        this.repo = new CharacterRepo();
    }

    public getCharacter() : any{
        return this.repo.getAllCharacters();
    }
}