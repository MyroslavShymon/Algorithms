import { Action, Getter, Mutation, State } from "vuex-simple";
import Person from "./person";

export class makePerson {
  @State()
  private _result: Person[] = [];
  @State()
  public firstName = "";
  @State()
  public lastName = "";
  @State()
  public city = "";
  @State()
  public email = "";
  @State()
  public validEmail = false;
  @State()
  public country = "";
  @State()
  public yearsRegistered = 0;
  @State()
  public validYearsRegistered = false;
  @State()
  public validStreetNumber = false;
  @State()
  public streetNumber = 1;
  @State()
  public streetName = "";
  @State()
  public state = "";
  @State()
  private _personsFromServer = 1;

  @Action()
  public async getUsers(): Promise<void> {
    const response = await fetch(
      `https://randomuser.me/api?results=${this._personsFromServer}`
    );
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

  @Mutation()
  public bubbelSort() {
    // console.log("bubble", this._result);

    let swap, temp;
    do {
      swap = false;
      for (let index = 0; index < this._result.length - 1; index++) {
        if (this._result[index].email > this._result[index + 1].email) {
          temp = this._result[index];
          this._result[index] = this._result[index + 1];
          this._result[index + 1] = temp;
          swap = true;
        }
      }
    } while (swap == true);
    console.log("bubble", this._result);
  }
  @Mutation()
  public addPerson(pushedPerson: Person) {
    this._result.push(pushedPerson);
  }
  public set personsFromServer(count: number) {
    this._personsFromServer = count;
  }

  @Getter()
  public get persons(): Person[] {
    return this._result;
  }
  // @Getter()
  // public get personsFromServer(): number {
  //   return this._personsFromServer;
  // }
}
