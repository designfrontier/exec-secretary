'use strict';

const events = require('monument').events
    , fetchingStore = {}
    , cache = require('node-cached')

    , leaderData = [
        {
            name: 'Daniel Sellers'
            , id: '1'
            , email: 'daniel@designfrontier.net'
        }
        , {
            name: 'Bryce Jolley'
            , id: '2'
            , email: 'jollyness@gmail.com'
        }
        , {
            name: 'Bishop Robinson'
            , id: '3'
            , email: 'bretarob@gmail.com'
        }
        , {
            name: 'Lance Stanley'
            , id: '4'
            , email: 'tlancestanley@gmail.com'
        }
        , {
            name: 'Jerry Anderson'
            , id: '5'
            , email: 'andjerry@gmail.com'
        }
        , {
            name: 'John Wilson'
            , id: '6'
            , email: 'drgroovey@yahoo.com'
        }
        , {
            name: 'Joanne Layne'
            , id: '7'
            , email: 'jcparty@xmission.com'
        }
        , {
            name: 'Deborah Gaudin'
            , id: '8'
            , email: 'deborah_gaudin@yahoo.com'
        }
        , {
            name: 'Brad Bean'
            , id: '9'
            , email: 'b34nespn@gmail.com'
        }
        , {
            name: 'Jenny Reeder'
            , id: '10'
            , email: 'jennyreeder1@gmail.com'
        }
        , {
            name: 'Mike Boesch'
            , id: '11'
            , email: 'boeschmwb@aol.com'
        }
    ]

    , notInProgress = (cached) => {
        return cached === null && !fetchingStore['data.leaders'];
    }

    , returnCollection = (cached) => {
        if (notInProgress(cached)) {
            // get data from async source faked here by process.nextTick
            fetchingStore['data.leaders'] = true;

            process.nextTick(() => {

                fetchingStore['data.leaders'] = false;
                events.emit('data:set:leaders', leaderData);
                cache.add('data.leaders', leaderData, 300000);
            });
        } else if (cached !== null) {
            events.emit('data:set:leaders', cached);
        }
    }

    , returnItem = (cached, id) => {
        if (notInProgress(cached)) {
            // get data from async source faked here by process.nextTick
            fetchingStore['data.leaders'] = true;

            process.nextTick(() => {

                fetchingStore['data.leaders'] = false;
                events.emit(`data:set:leaders:${id}`, leaderData.find((item) => {
                    return item.id === id;
                }));
                cache.add('data.leaders', leaderData, 300000);
            });
        } else if (cached !== null) {
            events.emit(`data:set:leaders:${id}`, cached.find((item) => {
                return item.id === id;
            }));
        }
    };


events.on('data:get:leaders', (id) => {
    const cached = cache.get('data.leaders');

    if (typeof id === 'undefined') {
        returnCollection(cached);
    } else {
        returnItem(cached, id);
    }
});
