import { Selector } from 'testcafe';

class Favorites {

  async addFavorites(testController) {
    await Selector('#search-bar').exists;
    await testController.click('#search-bar');
    await testController.typeText('#search-input', 'aikido');
    await testController.click('#search-button');
    await testController.click('#favorites');
    await testController.pressKey('enter');
  }

}

export const favorites = new Favorites();
