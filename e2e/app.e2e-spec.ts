import { RemotelyOperatedAircraftPage } from './app.po';

describe('remotely-operated-aircraft App', () => {
  let page: RemotelyOperatedAircraftPage;

  beforeEach(() => {
    page = new RemotelyOperatedAircraftPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
