const services = require("../data/services");

const getServices = (req, res) => {
  res.status(200).json({
    success: true,
    count: services.length,
    services
  });
};

const getServiceById = (req, res) => {
  const service = services.find(item => item.id === Number(req.params.id));

  if (!service) {
    return res.status(404).json({
      success: false,
      message: "Service not found"
    });
  }

  res.status(200).json({
    success: true,
    service
  });
};

module.exports = {
  getServices,
  getServiceById
};
