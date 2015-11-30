'use strict';
const events = require('monument').events;

events.on('route:/weekly-announcement-email:get', (connection) => {
    events.once('data:set:leaders', (leaders) => {
        console.log(leaders);
        events.emit('send:weekly:announcments', leaders);
        connection.res.send('weekly announcments email sent');
    });

    events.emit('data:get:leaders');
});
