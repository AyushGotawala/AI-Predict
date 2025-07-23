const predictImage = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const prediction = "Predicted Digit: 5";
    
    return res.status(200).json({ success: true, prediction });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  predictImage,
};