const { RESTDataSource } = require('apollo-datasource-rest');
const { HPD_COMPLAINTS_PROBLEMS_API: { URL: API_URL, PARAMS } } = require('../../constants');

class ComplaintsProblemsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = API_URL;
    }

    async getComplaintsProblemsByComplaintIds(complaintIds) {
        const query = encodeURI(`?$select=${Object.values(PARAMS).join(',')} &$where=${PARAMS.complaintId} in(${complaintIds.join(',')}) &$order=${PARAMS.statusUpdatedAt} DESC`);
        const data = await this.get('', query);
        return data && data.length ? data.reduce((problemsByComplaintId, currProblemData) => {
            const complaintProblem = this.complaintProblemReducer(currProblemData);
            if (problemsByComplaintId[complaintProblem.complaintId]) {
                problemsByComplaintId[complaintProblem.complaintId].push(complaintProblem);
            }
            else {
                problemsByComplaintId[complaintProblem.complaintId] = [complaintProblem];
            }
            return problemsByComplaintId;
        }, {}) : [];
    }

    complaintProblemReducer(data) {
        return {
            problemId: data[PARAMS.problemId],
            complaintId: data[PARAMS.complaintId],
            unitType: data[PARAMS.unitType],
            location: data[PARAMS.location],
            severity: data[PARAMS.severity],
            category: data[PARAMS.category],
            subCategory: data[PARAMS.subCategory],
            problemType: data[PARAMS.problemType],
            status: data[PARAMS.status],
            statusUpdatedAt: data[PARAMS.statusUpdatedAt],
            statusDescription: data[PARAMS.statusDescription]
        };
    }
}

module.exports = ComplaintsProblemsAPI;