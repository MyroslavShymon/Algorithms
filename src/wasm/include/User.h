#ifndef __USER_H__
#define __USER_H__

class User {
private:
	std::string _firstName;
	std::string _lastName;
	std::string _email;
	std::string _username;
	int _age;
public:
	User(std::string firstName,std::string lastName,std::string email,std::string username, int age);
	// Getter
	std::string firstName() {
		return _firstName;
	}
	std::string lastName() {
		return _lastName;
	}
	std::string email() {
		return _email;
	}
	std::string username() {
		return _username;
	}
	int age() {
		return _age;
	}
};

#endif