const REGEX = {
	email: /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/,
};

const regexIsOk = (regex, value) => regex.test(value);

export const emailIsValid = (email) => regexIsOk(REGEX.email, email);
