#include <stdio.h>
#include <iostream>
#include <emscripten.h>
#include <chrono>
#include <typeinfo>

#include "../src/User.cpp"
#include "../src/sorts.cpp"
#include "../src/globals.cpp"
#include "../src/functions.cpp"

using namespace std;

extern "C" {
	void sort(int len);
}

void sort(int len) {
	auto start = chrono::high_resolution_clock::now();

	User** users = new User * [len];
	const char** names_array = new const char* [len];
	const char** lastName_array = new const char* [len];
	const char** email_array = new const char* [len];
	const char** username_array = new const char* [len];
	field = returnField();
	cout<<"returnField!!!!!!!!"<<field<<"\n";

	for (int i = 0; i < len; i++){
		names_array[i] = returnFirstNames(i);
		lastName_array[i] = returnlastNames(i);
		email_array[i] = returnEmails(i);
		username_array[i] = returnUsernames(i);
	}

	for (int i = 0; i < len; i++)
	{
		users[i] = new User(names_array[i],lastName_array[i],email_array[i],username_array[i], EM_ASM_DOUBLE({
		  let ages = [];
		  state.users.forEach((user) => {
			ages.push(user.age);
		  });
		  return ages[$0];
		  console.log("state.field",state.field);
			}, i));
	}
//const { state } = require("../../src/store/modules/users/state");
sortType = returnSortType();
	if(sortType == "bubbleSort"){
		bubbleSort(users, len);
	}else if(sortType == "quickSort"){
		bubbleSort(users, len);
	}else{
		cout<<"cpp default Sort";
	}

	formJSON(users, len);

	delete[]names_array;
	delete[]lastName_array;
	delete[]email_array;
	delete[]username_array;
	auto end = chrono::high_resolution_clock::now();

	// Calculating total time taken by the program.
	double time_taken =
		chrono::duration_cast<chrono::nanoseconds>(end - start).count();

	time_taken *= 1e-9;
	setTime(time_taken);
}

int main() {
	return 0;
}