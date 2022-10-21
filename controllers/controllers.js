const {
  getTourService,
  makeTour,
  findTourId,
  updateTourId,
  findTrending,
  findCheapest,
} = require("../model/service");

// Post Tour

exports.postATour = async (req, res) => {
  try {
    const result = await makeTour(req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully Data Saved",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Something Went wrong",
      error: error.message,
    });
  }
};

// Get Specific tour

exports.getTourId = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await findTourId(id);
    result.views += 1;
    const findNewResult = await updateTourId(id, result);

    res.status(200).json({
      status: "Success",
      message: "Found the Tour",
      data: findNewResult,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "400 Bad Request",
      error: error.message,
    });
  }
};

// Get All tour

exports.getAllTour = async (req, res) => {
  try {
    let filters = { ...req.query };
    const fields = ["sort", "page", "limit"];

    fields.forEach((field) => delete filters[field]);

    let filterFields = JSON.stringify(filters);

    filterFields = filterFields.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterFields);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join();
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const tours = await getTourService(filters, queries);

    res.status(200).json({
      status: "Success",
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "400 Bad Request",
      error: error.message,
    });
  }
};

// Get the Cheapest

exports.getCheapest = async (req, res) => {
  try {
    const result = await findCheapest();

    res.status(200).json({
      status: "Success",
      message: "Found Cheapest",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Something Went wrong",
      error: error.message,
    });
  }
};

// Update a tour

exports.updateTourId = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await updateTourId(id, req.body);

    res.status(200).json({
      status: "Success",
      message: "Found Tour",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Something Went wrong",
      error: error.message,
    });
  }
};

// Get the tranding tour

exports.getTrending = async (req, res) => {
  try {
    const result = await findTrending();

    res.status(200).json({
      status: "Success",
      message: "found Trending",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "400 Bad Request",
      error: error.message,
    });
  }
};
