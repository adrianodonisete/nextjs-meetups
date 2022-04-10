import { MongoClient } from 'mongodb';

import { DB_URI } from '../../utils/constants';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const { title, image, address, description } = req.body;

		const client = await MongoClient.connect(DB_URI);
		const db = client.db();

		const meetupsCollection = db.collection('meetups');
		const result = await meetupsCollection.insertOne({ title, image, address, description });

		console.log(result);

		client.close();

		res.status(201).json({
			success: true,
			message: 'Created',
		});
	}
};

export default handler;
