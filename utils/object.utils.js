// TODO - Traduction
//Pour retirer une propriété de l'objet renvoyé par DAO
export const omit = (obj, key) => {
	// const { email, ...otherValues } = obj;
	const { [key]: keyValue, ...otherValues } = obj;
	return otherValues;
};

//omit(user, ['password', 'id'])
export const omitMulti = (obj, keys) => {
	const otherValues = keys.reduce(
		(toBuild, key) => {
			const o = omit(toBuild, key); //nouvel obj avec une prop en moins
			return { ...o }; //on décompose chacune des props de o - toBuild = {id, email} puis toBuild = {email}
		},
		{ ...obj } //{id, email, password}
	);

	return otherValues;
};

export const omitMulti_bg = (obj, keys) => {
	keys.reduce((toBuild, key) => ({ ...omit(toBuild, key) }), { ...obj });
};
