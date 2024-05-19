const Resource = require("../Model/resourceModel");

exports.createResource = async (req, res) => {
  try {
    const { title, markdownContent } = req.body;
    const resource = new Resource({
      title,
      markdownContent,
      createdBy: req._id,
    });
    await resource.save();
    res
      .status(201)
      .json({ message: "Resource created successfully", resource });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate("createdBy")
      .sort({ createdAt: -1 });
    // res.status(200).json(resources);
    res.status(200).send({
      success: true,
      message: "Articles fetched successfully",
      resources,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findById(id).populate("createdBy");
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    // res.status(200).json(resource);
    res.status(200).send({
      success: true,
      message: "Article fetched successfully",
      resource,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
