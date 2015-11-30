/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , events = require('monument').events;

require('./leaders.js');

describe('leaders Collection tests', () => {
    it('should respond to data:get:leaders passed an id', (done) => {
        events.once('data:set:leaders:123', (data) => {
            assert.isObject(data);
            done();
        });

        events.emit('data:get:leaders', 123);
    });

    it('should respond to data:get:leaders with no id', (done) => {
        events.once('data:set:leaders', (data) => {
            assert.isArray(data);
            done();
        });

        events.emit('data:get:leaders');
    });
});