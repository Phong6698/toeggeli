import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.region('europe-west1').https.onRequest((request, response) => {
    response.send('Hello from Toeggeli!');
});

export const updateStatistics = functions.region('europe-west1')
    .firestore.document('Matches/{matchID}').onCreate((snap) => {
        const createdMatch: any = snap.data();

        // Transactional
        return admin.firestore().runTransaction(async transaction => {
            try {
                const promises: Promise<any>[] = [];
                createdMatch.players.forEach((player: any) => {
                    const statisticQuery = admin.firestore().collection('Statistics')
                        .where('userID', '==', player.userID)
                        .where('spaceID', '==', createdMatch.spaceID);
                    promises.push(transaction.get(statisticQuery));
                });

                const docSnaps = await Promise.all(promises);
                docSnaps.forEach((docSnap, index) => {
                    const didPlayerWon = (createdMatch.players[index].side === 'blue' && createdMatch.blueScore === 10) ||
                        (createdMatch.players[index].side === 'red' && createdMatch.redScore === 10);
                    if (!docSnap.empty) {
                        const statisticDoc = docSnap.docs[0];
                        const updateData = didPlayerWon ? {wins: statisticDoc.data().wins + 1} : {losses: statisticDoc.data().losses + 1};
                        transaction.update(statisticDoc.ref, updateData);
                    } else {
                        let wins = 0;
                        let losses = 0;
                        if (didPlayerWon) {
                            wins = 1;
                        } else {
                            losses = 1;
                        }
                        const newStatistics = {
                            wins: wins,
                            losses: losses,
                            elo: 0,
                            spaceID: createdMatch.spaceID,
                            userID: createdMatch.players[index].userID
                        };
                        transaction.set(admin.firestore().collection('Statistics').doc(), newStatistics);
                    }
                });
            } catch (error) {
                return error;
            }
        });
    });