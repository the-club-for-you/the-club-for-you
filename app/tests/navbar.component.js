import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  async gotoContactPage(testController) {
    await testController.click('#contact-page');
  }

  async gotoListClubPage(testController) {
    await testController.click('#list-clubs');
  }

  async gotoInterestsPage(testController) {
    await testController.click('#interests-page');
  }

  async gotoEditClubsPage(testController) {
    await testController.click('#editClubs');
  }

  async gotoAddClubPage(testController) {
    await testController.click('#addClub');
  }

  async gotoFavoritesPage(testController) {
    await testController.click('#favorites-page');
  }

  async gotoEventPage(testController) {
    await testController.click('#events-page');
  }

  async gotoAddEventPage(testController) {
    await testController.click('#addEvent');
  }
}

export const navBar = new NavBar();
