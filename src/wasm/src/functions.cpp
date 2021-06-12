#include "../include/functions.h"
#include "../include/globals.h"
#include "../include/User.h"

void formJSON(User* users[], int len) {
	std::string stringToFormJson = "[";
	for (int i = 0; i < len; i++)
	{
		std::string firstName = users[i]->firstName();
		std::string lastName = users[i]->lastName();
		std::string email = users[i]->email();
		std::string username = users[i]->username();
		std::string age = std::to_string(users[i]->age());
		stringToFormJson.append("{'firstName':'");
		stringToFormJson.append(firstName);
		stringToFormJson.append("','lastName':'");
		stringToFormJson.append(lastName);
		stringToFormJson.append("','email':'");
		stringToFormJson.append(email);
		stringToFormJson.append("','username':'");
		stringToFormJson.append(username);
		stringToFormJson.append("','age':'");
		stringToFormJson.append(age);
		stringToFormJson.append("'},");
	}
	stringToFormJson.append("]");
	JSON = stringToFormJson;
	int n = stringToFormJson.length();
	char char_array[n + 1];
	strcpy(char_array, stringToFormJson.c_str());
	EM_ASM_({
	  JSON_str = UTF8ToString($0);
	//   state.users = UTF8ToString($0);
	JSON.parse(JSON.stringify(JSON_str))
	  console.log('JSON ' + JSON_str);
	}, char_array);
}

EM_JS(void, setTime,
	(double time), {
	   console.log("time bubble sort in cpp = ", time);
	   time_bubble = time;
	});

EM_JS(char*, returnFirstNames, (int i), {
	  let firstNames = [];
	  state.users.forEach((user) => {
		firstNames.push(user.firstName);
	  });
	  const greetings = firstNames[i];
	  const byteCount = lengthBytesUTF8(greetings) + 1;

	  const greetingsPointer = _malloc(byteCount);
	  stringToUTF8(greetings, greetingsPointer, byteCount);

	  return greetingsPointer;
	});
EM_JS(char*, returnlastNames, (int i), {
	  let lastNames = [];
	  state.users.forEach((user) => {
		lastNames.push(user.lastName);
	  });
	  const greetings = lastNames[i];
	  const byteCount = lengthBytesUTF8(greetings) + 1;

	  const greetingsPointer = _malloc(byteCount);
	  stringToUTF8(greetings, greetingsPointer, byteCount);

	  return greetingsPointer;
	});
EM_JS(char*, returnEmails, (int i), {
	  let emails = [];
	  state.users.forEach((user) => {
		emails.push(user.email);
	  });
	  const greetings = emails[i];
	  const byteCount = lengthBytesUTF8(greetings) + 1;

	  const greetingsPointer = _malloc(byteCount);
	  stringToUTF8(greetings, greetingsPointer, byteCount);

	  return greetingsPointer;
	});
EM_JS(char*, returnUsernames, (int i), {
	  let usernames = [];
	  state.users.forEach((user) => {
		usernames.push(user.firstName);
	  });
	  const greetings = usernames[i];
	  const byteCount = lengthBytesUTF8(greetings) + 1;

	  const greetingsPointer = _malloc(byteCount);
	  stringToUTF8(greetings, greetingsPointer, byteCount);

	  return greetingsPointer;
	});
