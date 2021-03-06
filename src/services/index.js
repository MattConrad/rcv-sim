//@flow
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCHtzTb8Fmgy1tu3tQ2ghmaTH_1lhgr6s4',
  authDomain: 'rcv-sim.firebaseapp.com',
  databaseURL: 'https://rcv-sim.firebaseio.com',
  projectId: 'rcv-sim',
  storageBucket: 'rcv-sim.appspot.com',
  messagingSenderId: '710177801325'
};

firebase.initializeApp(config);

export const googleAuth = new firebase.auth.GoogleAuthProvider();
export const database = firebase.database();
export const auth = firebase.auth();

export const electionsRef = (): Object => database.ref('elections');

export const myElectionsRef = (uid: string): Object => {
  return database
    .ref('elections')
    .orderByChild('owner')
    .equalTo(uid);
};

export const electionRef = (key: string): Object =>
  database.ref(`/elections/${key}`);

export const candidatesRef = (key: string): Object =>
  database.ref(`/candidates/${key}`);

export const votesRef = (key: string): Object => database.ref(`/votes/${key}`);

export const candidatesForElectionRef = (electionKey: string): Object =>
  database.ref(`candidates/${electionKey}`);
