#include "../include/User.h"

// using namespace std;

User::User(std::string firstName,std::string lastName,std::string email,std::string username, int age) {
	_firstName = firstName;
	_lastName = lastName;
	_email = email;
	_username = username;
	_age = age;
}
