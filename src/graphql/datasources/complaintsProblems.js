const { RESTDataSource } = require('apollo-datasource-rest');
const { HPD_COMPLAINTS_PROBLEMS_API } = require('../../constants');

class ComplaintsProblemsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = HPD_COMPLAINTS_PROBLEMS_API.URL;
    }

    async ComplaintsProblemsAPI(complaintIds) {
        const query = encodeURI(`?$select=${Object.values(HPD_COMPLAINTS_PROBLEMS_API.PARAMS).join(',')} &$where=complaintid in(${complaintIds.join(',')}) &$order=statusdate DESC`);
        const data = await this.get('', query);
        return data && data.length ? data.reduce((problemsByComplaintId, currProblemData) => {
            const complaintProblem = this.complaintProblemReducer(currProblemData)
            if (problemsByComplaintId[complaintProblem.complaintId]) {
                problemsByComplaintId[complaintProblem.complaintId].push(complaintProblem)
            }
            else {
                problemsByComplaintId[complaintProblem.complaintId] = [complaintProblem]
            }
            return problemsByComplaintId;
        }, {}) : [];
    }

    complaintProblemReducer(data) {
        const apiParams = HPD_COMPLAINTS_PROBLEMS_API.PARAMS;
        return {
            problemId: data[apiParams.problemId],
            complaintId: data[apiParams.complaintId],
            unitType: data[apiParams.unitType],
            spaceType: data[apiParams.spaceType],
            severity: data[apiParams.severity],
            category: data[apiParams.category],
            subCategory: data[apiParams.subCategory],
            problemType: data[apiParams.problemType],
            status: data[apiParams.status],
            statusUpdatedAt: data[apiParams.statusUpdatedAt],
            statusDescription: data[apiParams.statusDescription]
        }
    }

}

module.exports = ComplaintsProblemsAPI;