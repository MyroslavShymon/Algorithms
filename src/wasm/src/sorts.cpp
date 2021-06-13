#include "../include/sorts.h"
#include "../include/User.h"
#include "../include/globals.h"

void bubbleSort(User* a[], const int size) {
	for (int i = 0; i < size - 1; i++) {
		for (int j = 0; j < size - i - 1; j++) {
			if(field == "age"){
				if (a[j]->age() > a[j + 1]->age()) {
					User* temp = a[j];
					a[j] = a[j + 1];
					a[j + 1] = temp;
				}
			}
			else{
				if (std::strcmp(a[j]->dynamicGetter(field).c_str(), a[j + 1]->dynamicGetter(field).c_str()) > 0)
           		{
					User* temp = a[j];
					a[j] = a[j + 1];
					a[j + 1] = temp;
            	}
			}
		}
	}
}
