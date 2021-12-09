import { Selector } from 'testcafe';

class ClubTypes {

  async gotoListClubsFilterPage(testController) {
    await Selector('#interest-list').exists;
    await testController.click('#academic');
  }
}

export const interests = new ClubTypes();
