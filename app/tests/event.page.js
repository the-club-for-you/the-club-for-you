import { Selector } from 'testcafe';

class EventPage {
  constructor() {
    this.pageId = '#events-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const eventPage = new EventPage();
