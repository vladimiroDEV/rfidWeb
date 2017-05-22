import { RfidWebPage } from './app.po';

describe('rfid-web App', () => {
  let page: RfidWebPage;

  beforeEach(() => {
    page = new RfidWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
