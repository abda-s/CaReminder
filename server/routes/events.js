// routes/events.js
const express = require('express');
const router = express.Router();
const { events, eventoccurrence } = require('../models');
const { generateOccurrences } = require('../helpers/recurrence');

// Create an event
router.post('/', async (req, res) => {
  const { title, description, recurrencePattern, schule, endDate, userId } = req.body;
  
  try {
    const event = await events.create({
      title,
      description,
      recurrencePattern,
      schule,
      endDate,
      userId,
    });

    // Generating occurrences for the event
    const generatedOccurrences = generateOccurrences(event, new Date(), endDate);

    // Bulk create occurrences
    await eventoccurrence.bulkCreate(generatedOccurrences);

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const eventsRes = await events.findAll();
    res.status(200).json(eventsRes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/occ', async (req, res) => {
  try {
    const eventOccurrences = await eventoccurrence.findAll({
      include: [{
        model: events,
        as: 'event',
        attributes: ['title'] // Include only the 'title' attribute from the events table
      }]
    });

    // Group event occurrences by date
    const groupedOccurrences = {};
    eventOccurrences.forEach(occurrence => {
      if (!groupedOccurrences[occurrence.date]) {
        groupedOccurrences[occurrence.date] = [];
      }
      groupedOccurrences[occurrence.date].push({
        id: occurrence.id,
        name: occurrence.event.title, // Use the title from the associated event
        height: 50, // Set height as needed
        day: occurrence.date,
        time:occurrence.time,
        pills:occurrence.pills,
      });
    });

    res.status(200).json(groupedOccurrences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
