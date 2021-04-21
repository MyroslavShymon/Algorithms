import { Module, State } from "vuex-simple";
import { makePerson } from "./../modules/makePerson";

export class MyStore {
  @Module()
  public persons = new makePerson();
  // public makePerson = new makePerson();
  @State()
  public version = "2.0.0";
}
