import { IUser } from "../../types/interfaces";

export default function bubbleSort(
  users: IUser[],
  field: string
): [IUser[], number] {
  let time: number = performance.now();
  let swap: boolean, temp: IUser;
  do {
    swap = false;
    for (let index = 0; index < users.length - 1; index++) {
      if (users[index][field] > users[index + 1][field]) {
        temp = users[index];
        users[index] = users[index + 1];
        users[index + 1] = temp;
        swap = true;
      }
    }
  } while (swap == true);
  time = performance.now() - time;
  return [users, time];
}
