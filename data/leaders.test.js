/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , events = require('monument').events;

require('./leaders.js');

describe('leaders Collection tests', () => {
    it('should respond to data:get:leaders passed an id', (done) => {
        events.once('data:set:leaders:1', (data) => {
            assert.isObject(data);
            done();
        });

        events.emit('data:get:leaders', 1);
    });

    it('should respond to data:get:leaders with no id', (done) => {
        events.once('data:set:leaders', (data) => {
            assert.isArray(data);
            done();
        });

        events.emit('data:get:leaders');
    });
});
