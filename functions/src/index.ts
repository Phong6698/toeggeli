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
        const createdMatch: any = snap.data();
        return createdMatch.players.forEach((player: any) => {

            const didPlayerWon = (player.side === 'blue' && createdMatch.blueScore === 10) ||
                (player.side === 'red' && createdMatch.redScore === 10);

            return admin.firestore().collection('Statistics')
                .where('userID', '==', player.userID)
                .where('spaceID', '==', createdMatch.spaceID)
                .get().then(docSnap => {

                    if (!docSnap.empty) {
                        const statisticDoc = docSnap.docs[0];
                        const updateData = didPlayerWon ? { wins: statisticDoc.data().wins + 1 } : { losses: statisticDoc.data().losses + 1 };
                        return statisticDoc.ref.update(updateData);
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
                            spaceID: createdMatch.spaceID,
                            userID: player.userID
                        };
                        return admin.firestore().collection('Statistics').doc().set(newStatsistics);
                    }

                })
                .catch(() => console.error('Could not get Statistics'));
        });
    });