import { Selector } from 'testcafe';

class AddEvent {

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async addEvent(testController) {
    await Selector('#addEvent-form').exists;
    await testController.click('#eventClub');
    await testController.pressKey('down');
    await testController.typeText('#eventTitle', 'Test');
    await testController.typeText('#eventDate', '2021-11-17T05:00');
    await testController.typeText('#eventDescription', 'test');
    await testController.click('#submit-addEvent');
    await testController.pressKey('enter');
  }
}

export const addEventPage = new AddEvent();
