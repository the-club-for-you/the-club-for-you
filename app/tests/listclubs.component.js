import { Selector } from 'testcafe';

class ListClubs {

  async gotoSearchResult(testController) {
    await Selector('#search-bar').exists;
    await testController.click('#search-bar');
    await testController.typeText('#search-input', 'aikido');
    await testController.click('#search-button');
  }

  async gotoClubInfoPage(testController) {
    await Selector('#club-list').exists;
    await testController.click('#club-list');
  }
}

export const listClubs = new ListClubs();
