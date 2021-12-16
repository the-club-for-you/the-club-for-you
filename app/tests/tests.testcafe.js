import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { listClubs } from './listclubs.component';
import { interests } from './interests.component';
import { listClubsAdmin } from './listClubsAdmin.page.js';
import { addClubPage } from './addclub.page';
import { favorites } from './favorites.component';
import { addEventPage } from './addEvent.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentials2 = { username: 'admin@foo.com', password: 'changeme' };
const credentials3 = { username: 'malialiu@hawaii.edu', password: 'm' };
const credentials4 = { username: 'aikidoatuh@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout and contact page work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoContactPage(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that list clubs page work.', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoListClubPage(testController);
  await listClubs.filter(testController);
  await listClubs.gotoSearchResult(testController);
  await listClubs.gotoClubInfoPage(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that interests page work.', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoInterestsPage(testController);
  await interests.gotoListClubsFilterPage(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that edit club page work.', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoEditClubsPage(testController);
  await listClubsAdmin.gotoResult(testController);
  await listClubsAdmin.gotoEditPage(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that add club page work.', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoAddClubPage(testController);
  await addClubPage.addClub(testController);
  await navBar.gotoListClubPage(testController);
  await addClubPage.findAddedClub(testController);
  await listClubs.gotoClubInfoPage(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that favorites page work.', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoListClubPage(testController);
  await favorites.addFavorites(testController);
  await navBar.gotoFavoritesPage(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that sign up and reset password page work.', async (testController) => {
  await testController.click('#login-dropdown');
  await testController.click('#login-dropdown-sign-up');
  await testController.typeText('#signup-form-email', 'malialiu@hawaii.edu');
  await testController.typeText('#signup-form-password', 'm');
  await testController.click('#signup-form-submit');
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials3.username, credentials3.password);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
  await testController.click('#login-dropdown');
  await testController.click('#login-dropdown-sign-up');
  await testController.click('#reset-password');
});

test('Test that event page work.', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials4.username, credentials4.password);
  await navBar.isLoggedIn(testController, credentials4.username);
  await navBar.gotoAddEventPage(testController);
  await addEventPage.addEvent(testController);
  await navBar.gotoEventPage(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
