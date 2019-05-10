import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.region('europe-west1').https.onRequest((request, response) => {
    response.send('Hello from Toeggeli!');
});


export const updateStatistics = functions.region('europe-west1')
    .firestore.document('Matches/{matchID}').onCreate((snap, context) => {
        const match: any = snap.data();
        match.players.forEach((player: any) => {
            const didPlayerWon = (player.side === 'blue' && match.blueScore === 10) ||
                (player.side === 'red' && match.redScore === 10);

            admin.firestore().collection('Statistics')
                .where('userID', '==', player.userID)
                .where('spaceID', '==', match.spaceID).get().then(docSnap => {

                if (!docSnap.empty) {
                    const statisticDoc = docSnap.docs[0];
                    const statisticData = docSnap.docs[0].data();
                    if (didPlayerWon) {
                        statisticDoc.ref.update({wins: statisticData.wins + 1}).then(() => {
                            console.log('Updated with a win');
                        }).catch(() => console.error('error'));
                    } else {
                        statisticDoc.ref.update({losses: statisticData.losses + 1}).then(() => {
                            console.log('Updated with a loss');
                        }).catch(() => console.error('error'));
                    }
                } else {
                    let wins = 0;
                    let losses = 0;
                    if (didPlayerWon) {
                        wins = 1;
                    } else {
                        losses = 1;
                    }
                    const newStatsistics = {
                        wins: wins,
                        losses: losses,
                        elo: 0,
                        spaceID: match.spaceID,
                        userID: player.userID
                    };
                    admin.firestore().collection('Statistics').doc().set(newStatsistics).then(() => {
                        console.log("created a new statistic doc");
                    }).catch(() => console.error('error'));
                }
            }).catch(() => console.error('error'))
        });

    });
