const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Location = require('../models/location');

// Create a new location
router.post('/', (req, res, next) => {
  const location = new Location({
    _id: new mongoose.Types.ObjectId(),
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    altitude: req.body.altitude
  });
  location.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Location created successfully",
        createdLocation: {
          _id: result._id,
          longitude: result.longitude,
          latitude: result.latitude,
          altitude: result.altitude,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Get all locations
router.get('/', (req, res, next) => {
  Location.find()
    .exec()
    .then(locations => {
      res.status(200).json({
        count: locations.length,
        locations: locations.map(location => {
          return {
            _id: location._id,
            longitude: location.longitude,
            latitude: location.latitude,
            altitude: location.altitude,
            createdAt: location.createdAt,
            updatedAt: location.updatedAt
          }
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Get a specific location
router.get('/:locationId', (req, res, next) => {
  const id = req.params.locationId;
  Location.findById(id)
    .exec()
    .then(location => {
      console.log(location);
      if (location) {
        res.status(200).json({
          location: location
        });
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Update a specific location
router.patch('/:locationId', (req, res, next) => {
  const id = req.params.locationId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Location.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Location updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Delete a specific location
router.delete('/:locationId', (req, res, next) => {
  const id = req.params.locationId;
  Location.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Location deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;