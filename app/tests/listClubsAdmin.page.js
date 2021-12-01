import { Selector } from 'testcafe';

class ListClubsAdmin {

  async gotoResult(testController) {
    await Selector('#search-bar').exists;
    await testController.click('#search-bar');
    await testController.typeText('#search-input', 'aikido');
    await testController.click('#search-button');
  }

  async gotoEditPage(testController) {
    await Selector('#clubs-list').exists;
    await testController.click('#edit');
  }
}

export const listClubsAdmin = new ListClubsAdmin();
