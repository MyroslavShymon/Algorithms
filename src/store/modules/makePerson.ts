import { Action, Getter, State } from "vuex-simple";
import Person from "./person";

export class makePerson {
  @State()
  private _result: Person[] = [];

  @Action()
  public async getUsers(): Promise<void> {
    const response = await fetch("https://randomuser.me/api?results=10");
    const object = await response.json();
    const persons = object.results;
    persons.forEach((person: Person) => {
      person = new Person(
        person.name,
        person.location,
        person.email,
        person.registered
      );
      this._result.push(person);
    });
  }

  @Getter()
  public get persons(): Person[] {
    return this._result;
  }
}
