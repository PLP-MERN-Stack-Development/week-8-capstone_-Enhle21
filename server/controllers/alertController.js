const Alert = require('../models/Alert');

exports.createAlert = async (req, res) => {
res.status(201).send('Alert created');
  try {
    const alert = new Alert({
      userId: req.user.id,
      location: req.body.location,
      audioUrl: req.body.audioUrl,
    });

    const savedAlert = await alert.save();
    req.io.emit("new_alert", savedAlert);
    res.status(201).json(savedAlert);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};