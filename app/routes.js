var Event     = require('./models/events');


module.exports = function(router) {


    // middleware to use for all requests
    //router.use(function(req, res, next) {
        // do logging
       //console.log('Something is happening.');
      //  next(); // make sure we go to the next routes and don't stop here
  //  });

  // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
  router.route('/')
    .get(function(req, res) {
  	res.json({ message: 'Welcome to Events api!' });
  });

    // on routes that end in /events
    // ----------------------------------------------------
    router.route('/events')

        .post(function(req, res) {
            var event = new Event();
            event.name = req.body.name;
            event.youtube_video_link = req.body.youtube_video_link;
            event.image = req.body.image;
			      event.description = req.body.description;
            event.likes = req.body.likes;
            event.starts = req.body.starts;
			      event.ends = req.body.ends;
			      event.location = req.body.location;
			      event.hashtag = req.body.hashtag;
			      event.your_name = req.body.your_name;
			      event.your_telephone_number = req.body.your_telephone_number;
			      event.your_email_address = req.body.your_email_address;


            // save the events and check for errors
            event.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'event created!' });
            });
        })

        // get all the events (accessed at GET http://localhost:8080/api/events)
        .get(function(req, res) {
            Event.find().sort({ _id: -1 }).exec(function(err, events) {
                if (err)
                    res.send(err);

                res.json(events);
            });
        });


    // on routes that end in /events/:event_id
    // ----------------------------------------------------
    router.route('/events/:event_id')

        // get the event with id (accessed at GET http://localhost:8080/api/events/:event_id)
        .get(function(req, res) {
            Event.findById(req.params.event_id, function(err, event) {

                if (err)
                    res.send(err);
                res.json(event);
            });
        })

        // update the event with id (accessed at PUT http://localhost:8080/api/events/:event_id)
        .put(function(req, res) {

            Event.findById(req.params.event_id, function(err, event) {

                if (err)
                    res.send(err);

                    event.name = req.body.name;
                    event.youtube_video_link = req.body.youtube_video_link;
                    event.image = req.body.image;
        			      event.description = req.body.description;
                    event.likes = req.body.likes;
                    event.starts = req.body.starts;
        			      event.ends = req.body.ends;
        			      event.location = req.body.location;
        			      event.hashtag = req.body.hashtag;
        			      event.your_name = req.body.your_name;
        			      event.your_telephone_number = req.body.your_telephone_number;
        			      event.your_email_address = req.body.your_email_address;

                // save the event
                event.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Event updated!' });
                });

            });
        })

        // delete the event with this id (accessed at DELETE http://localhost:8080/api/event/:event_id)
        .delete(function(req, res) {

            Event.remove({
                _id: req.params.event_id
            }, function(err, event) {
                if (err)
                    res.send(err);

                res.json({ message: 'Event Successfully deleted' });
            });
        });

}
