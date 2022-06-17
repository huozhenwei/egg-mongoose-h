'use strict';

const mock = require('egg-mock');

describe('test/mongoose-h.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/mongoose-h-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, mongooseH')
      .expect(200);
  });
});
