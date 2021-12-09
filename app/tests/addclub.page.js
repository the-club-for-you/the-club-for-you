import { Selector } from 'testcafe';

class AddClub {

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async addClub(testController) {
    await Selector('#add-form').exists;
    await testController.typeText('#clubName', 'Test');
    await testController.typeText('#contactName', 'admin');
    await testController.typeText('#contactEmail', 'admin@foo.com');
    await testController.click('#type-list');
    await testController.pressKey('enter');
    await testController.click('#type-list');
    await testController.typeText('#approvedDate', '2021-11-03T05:00');
    await testController.typeText('#expireDate', '2022-11-03T05:00');
    await testController.typeText('#owner', 'admin@foo.com');
    await testController.typeText('#description', 'test');
    await testController.click('#submit-addclub');
    await testController.pressKey('enter');
  }

  async findAddedClub(testController) {
    await Selector('#search-bar').exists;
    await testController.click('#search-bar');
    await testController.typeText('#search-input', 'Test');
    await testController.click('#search-button');
  }
}

export const addClubPage = new AddClub();
