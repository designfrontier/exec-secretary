/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , events = require('monument').events
    , fakeConnection = require('../test_stubs/connectionStub');

require('./weekly-announcement-email');

describe('/weekly-announcement-email route file tests', () => {
    beforeEach(() => {
        fakeConnection.reset();
    });

    it('should respond to route:/weekly-announcement-email:get', () => {
        events.emit('route:/weekly-announcement-email:get', fakeConnection);

        assert.strictEqual(fakeConnection.out().response, 'route /weekly-announcement-email now responding to get requests');
    });
});