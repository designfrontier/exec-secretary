'use strict';
const events = require('monument').events;

events.on('route:/weekly-announcement-email:get', (connection) => {
    if (connection.query.token && connection.query.token === 'tobeornototobethatisthequestion'){
        events.once('data:set:leaders', (leaders) => {
            events.emit('send:weekly:announcments', leaders);
            connection.res.send('weekly announcments email sent');
        });

        events.emit('data:get:leaders');
    } else {
        events.emit('error:401', connection);
    }
});
