'use strict';

const events = require('monument').events
    , sendGridKey = process.env.SEND_GRID_KEY || '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'
    , sendgrid = require('sendgrid')(sendGridKey);

events.on('send:weekly:announcments', (emailList) => {
    const email = new sendgrid.Email();

    email.from = 'daniel@designfrontier.net';
    email.fromName = 'Daniel Sellers';
    email.subject = 'Weekly Announcment Sharing Email';

    email.text = `
This is your weekly reminder to add your announcments to the shared announcements google doc.
In case you are not sure where to find it here is the URL: https://docs.google.com/document/d/1jQmvWF9N_fvLfN79M18quEWEyRFD7u-lHgjpd0R4pv4/edit?usp=sharing

Please make sure that anything you would like shared with other groups is in by Friday night so that they can print a copy before Sunday.

Thanks!

-Daniel Sellers`;

    email.html = `
<p>This is your weekly reminder to add your announcments to the shared announcements google doc.</p>
<p>In case you are not sure where it is... <a href="https://docs.google.com/document/d/1jQmvWF9N_fvLfN79M18quEWEyRFD7u-lHgjpd0R4pv4/edit?usp=sharing">you can access it here</a>.</p>
<p>Please make sure that anything you would like shared with other groups is in by Friday night so that they can print a copy before Sunday.</p>
<p>Thanks!</p>
<p>&mdash;Daniel Sellers</p>`;

    emailList.forEach((person) => {
        email.addTo(person.email);
    });

    sendgrid.send(email, (err, json) => {
        if (err) {
            console.log(err);
        }

        console.log(json);
    });
});
