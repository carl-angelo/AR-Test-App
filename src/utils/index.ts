import { Gender, MaritalStatus } from "../enum";

export const formatDate = (date: Date): string => {
	const newDate = new Date(date);
	return date
		? `${newDate.getMonth()}/${newDate.getDate()}/${newDate.getFullYear()}`
		: "";
};

export const getGender = (gender: string): string => {
	return Gender[gender as keyof typeof Gender];
};

export const getMaritalStatus = (status: string): string => {
	return MaritalStatus[status as keyof typeof MaritalStatus];
};
