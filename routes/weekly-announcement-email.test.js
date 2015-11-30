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

    it('should not respond to route:/weekly-announcement-email:get if no token', () => {
        events.emit('route:/weekly-announcement-email:get', fakeConnection);

        assert.include(fakeConnection.out().response, 'Punk.');
    });

    it('should respond to route:/weekly-announcement-email:get if token', (done) => {
        fakeConnection.query.token = 'tobeornototobethatisthequestion';

        events.on('send:weekly:announcments', (leaders) => {
            assert.isArray(leaders);


            done();
        });

        events.on('data:get:leaders', () => {
            events.emit('data:set:leaders', [ { name: 'daniel' } ]);
        });

        events.emit('route:/weekly-announcement-email:get', fakeConnection);
        assert.include(fakeConnection.out().response, 'sent');
    });
});
