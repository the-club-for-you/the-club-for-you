import { Selector } from 'testcafe';

class ClubTypes {

  async gotoListClubsFilterPage(testController) {
    await Selector('#interest-list').exists;
    await testController.click('#Academic');
  }
}

export const interests = new ClubTypes();
