export const DB_USER = 'b3_user';
export const DB_PASS = 'Adm87782930dmA';
export const DB_NAME = 'db_meetups';
export const DB_HOST = 'cluster0.ntlsu.mongodb.net';
export const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

export const DUMMY_MEETUPS = [
	{
		id: 'm1',
		title: 'A First Meetup 3333',
		image: 'https://t3.ftcdn.net/jpg/04/12/62/10/240_F_412621028_EuMKOQ3vTooRXIMTYczQQWZmVYc32Ua6.jpg',
		address: 'Some address 5, 123, Some City',
		description: 'This is a first meetup!',
	},
	{
		id: 'm2',
		title: 'A Second Meetup 2',
		image: 'https://t3.ftcdn.net/jpg/04/05/84/10/240_F_405841062_E4NB5FZKdOGCJiGgdE1ttLY1aEiJNmeR.jpg',
		address: 'Some address 5, 123, Some City',
		description: 'This is a second meetup!',
	},
];
