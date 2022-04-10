import { Fragment } from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';
import { DB_URI } from '../../utils/constants';

// domani.com/{id}

const MeetupDetails = props => {
	return (
		<Fragment>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name="description" content={props.meetupData.description} />
			</Head>
			<MeetupDetail
				id={props.meetupData.id}
				title={props.meetupData.title}
				image={props.meetupData.image}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</Fragment>
	);
};

export async function getStaticPaths() {
	const client = await MongoClient.connect(DB_URI);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');
	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		fallback: 'blocking',
		paths: meetups.map(meetup => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(DB_URI);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');
	const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

	client.close();

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
			},
		},
		revalidate: 1,
	};
}

export default MeetupDetails;
