const Tour = require("./model");

exports.getTourService = async (filter, { skip, limit = 10, sortBy, fields }) => {
    const tours = await Tour.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sortBy)
        .select(fields);
        
    const totalTour = await Tour.countDocuments(filter);
    const pageCount = Math.ceil(totalTour / limit)
    return { totalTour, pageCount, tours };
}

exports.makeTour = async (data) => {
    const tour = await Tour.create(data);
    return tour;
}

exports.findTourId = async (id) => {
    const tour = await Tour.findTourId(id);
    return tour;
}

exports.updateTourId = async (id, data) => {
    const tour = await Tour.findTourId(id);
    const result = await tour.set(data).save();
    return result;
}

exports.findTrending = async () => {
    const tours = await Tour.find({}).sort({ views: -1 }).limit(3);
    return tours;
}

exports.findCheapest = async () => {
    const tours = await Tour.find({}).sort({ price: 1 }).limit(3);
    return tours;
}










