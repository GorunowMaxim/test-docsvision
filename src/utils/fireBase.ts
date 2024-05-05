declare const firebase: any;

export const getBuildingInfo = async () => {
	try {
		const response: any = await firebase.firestore().collection('places').get();

		const docs = response.docs.map((x: any) => ({
			id: x.id,
			data: x.data(),
			parts: x.data().parts && x.data().parts.map((part: any) => part.id),
		}));
		return docs;
	} catch (error) {
		console.error('Error getting building info:', error);
		throw error;
	}
};

export const getEquipmentInfo = async () => {
	try {
		const response: any = await firebase.firestore().collection('inventory').get();

		let data = response.docs.map((x: any) => ({
			id: x.id,
			data: x.data(),
			placeId: x.data().place?.id,
		}));
		return data;
	} catch (error) {
		console.error('Error getting equipment info:', error);
		throw error;
	}
};

export const deleteEquipment = async (id: string) => {
	try {
		await firebase
			.firestore()
			.collection('inventory')
			.doc(id)
			.delete()
			.then(() => {
				console.info('Done');
			});
	} catch (error) {
		console.error('Error', error);
		throw error;
	}
};

export const addEquipment = async (name: string, count: string, place: string) => {
	try {
		await firebase
			.firestore()
			.collection('inventory')
			.doc()
			.set({
				name: name,
				count: count,
				place: firebase.firestore().collection('places').doc(place),
			})
			.then(() => {
				console.info('Done');
			});
	} catch (error) {
		console.error('Error', error);
		throw error;
	}
};

export const updateEquipment = async (id: string, name: string, count: string, placeId: string) => {
	try {
		await firebase
			.firestore()
			.collection('inventory')
			.doc(id)
			.update({
				name: name,
				count: count,
				place: firebase.firestore().collection('places').doc(placeId),
			})
			.then(() => {
				console.info('Done');
			});
	} catch (error) {
		console.error('Error', error);
		throw error;
	}
};
