// export const passIsValid = (pass) => pass.length === 128; //sha512 hash in hexa length
//TODO - check every validator
export const passIsValid = (pass) => typeof pass === 'string'; //sha512 hash in hexa length

export const numIsValid = (num) => typeof num === 'number';

export const isString = (data) => typeof data === 'string';

export const stringIsFilled = (data) =>
	isString(data) && data.trim().length > 0;
