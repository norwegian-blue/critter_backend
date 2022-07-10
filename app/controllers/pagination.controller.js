const getPagination = (page, size) => {
    const limit = size;
    const offset = (page-1) * limit;
    return {limit, offset};
};
const getPagingData = (data, page, limit) => {
    let { count: totalCreets, rows: creets } = data;
    creets = creets.map(el => el.toJSON());
    const currentPage = page;
    const totalPages = Math.ceil(totalCreets / limit); 
    return { totalCreets, creets, currentPage, totalPages };
};
const pagination = {
    getPagination: getPagination,
    getPagingData: getPagingData,
};

module.exports = pagination;