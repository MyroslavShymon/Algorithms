import IStreet from "./IStreet";

export default interface ILocation {
  readonly street: IStreet;
  readonly city: string;
  readonly state: string;
  readonly country: string;
}
