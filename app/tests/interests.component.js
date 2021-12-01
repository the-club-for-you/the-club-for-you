import { Selector } from 'testcafe';

class ClubTypes {

  async gotoListClubsFilterPage(testController) {
    await Selector('#interest-list').exists;
    await testController.click('#interest-list');
  }
}

export const interests = new ClubTypes();
