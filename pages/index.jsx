import { Fragment } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';
import { DB_URI } from '../utils/constants';

// free images
// https://stock.adobe.com/br/search/free?filters%5Bcontent_type%3Aphoto%5D=1&filters%5Bfree_collection%5D=1&filters%5Bcontent_type%3Aimage%5D=1&filters%5Breleases%3Ais_exclude%5D=1&order=relevance&safe_search=1&search_type=filter-select&get_facets=1

const HomePage = props => {
	return (
		<Fragment>
			<Head>
				<title>React Meetups Machado</title>
				<meta name="description" content="Browse a huge list of highly active React Meetups" />
			</Head>
			<MeetupList meetups={props.meetups} />
		</Fragment>
	);
};

// export async function getServerSideProps(context) {
// 	const { req, res } = context;
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

export async function getStaticProps() {
	const client = await MongoClient.connect(DB_URI);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');
	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map(meetup => ({
				id: meetup._id.toString(),
				title: meetup.title,
				image: meetup.image,
				address: meetup.address,
				description: meetup.description,
			})),
		},
		revalidate: 1,
	};
}

export default HomePage;
