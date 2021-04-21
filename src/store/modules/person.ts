import { State } from "vuex-simple";
import { ILocation, IName, IRegistered } from ".././interfaces/index";

export default class Person {
  @State()
  private _name: IName;
  private _location: ILocation;
  private _email: string;
  private _registered: IRegistered;

  constructor(
    name: IName,
    location: ILocation,
    email: string,
    registered: IRegistered
  ) {
    this._name = name;
    this._location = location;
    this._email = email;
    this._registered = registered;
  }

  public get name(): IName {
    return this._name;
  }
  public get location(): ILocation {
    return this._location;
  }
  public get email(): string {
    return this._email;
  }
  public get registered(): IRegistered {
    return this._registered;
  }
}
