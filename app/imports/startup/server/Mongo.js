import { Meteor } from 'meteor/meteor';
import { Clubs } from '../../api/club/Clubs.js';
import { Interests } from '../../api/interest/Interests.js';
import { Token } from '../../api/token/token.js';

/* eslint-disable no-console */

// Initialize the database with a default clubs document.
function addClubs(clubs) {
  console.log(`  Adding: ${clubs.name}`);
  Clubs.collection.insert(clubs);
}

// Initialize the database with a default interests document.
function addInterests(interests) {
  console.log(`  Adding: ${interests.name}`);
  Interests.collection.insert(interests);
}

function addToken(tokens) {
  console.log(`  Adding: ${tokens.token}`);
  Token.collection.insert(tokens);
}

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * Clubs count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Clubs.collection.find().count() < 7)) {
  const clubsAssetsFileName = 'clubs.data.json';
  console.log(`Loading data from private/${clubsAssetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(clubsAssetsFileName));
  jsonData.defaultClubs.map(clubs => addClubs(clubs));
}

if ((Meteor.settings.loadAssetsFile) && (Interests.collection.find().count() < 7)) {
  const interestsAssetsFileName = 'interests.data.json';
  console.log(`Loading data from private/${interestsAssetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(interestsAssetsFileName));
  jsonData.defaultInterests.map(interests => addInterests(interests));
}

if ((Meteor.settings.loadAssetsFile) && (Token.collection.find().count() < 7)) {
  const TokenAssetsFileName = 'token.data.json';
  console.log(`Loading data from private/${TokenAssetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(TokenAssetsFileName));
  jsonData.defaultToken.map(tokens => addToken(tokens));
}
