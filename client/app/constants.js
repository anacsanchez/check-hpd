export const violationsTableColsMap = new Map([
    ["unit", "Unit"],
    ["issuedDate", "Issued"],
    ["violationStatus", "Status"],
    ["description", "Description"],
    ["lastUpdated", "Updated"],
    ["type", "Type"],
    ["inspectionDate", "Inspected"],
    ["approvedDate", "Approved"],
    ["originalCertifyByDate", "Certify By"],
    ["originalCorrectByDate", "Correct By"],
    ["certifiedDate", "Certified"]
]);

export const complaintsTableColsMap = new Map([
    ["problemId", "ID"],
    ["unit", "Unit"],
    ["receivedDate", "Received"],
    ["issue", "Issue"],
    ["category", "Category"],
    ["type", "Severity"],
    ["locationType", "Location"],
    ["status", "Status"],
    ["statusDate", "Updated"],
    ["statusDescription", "Description"]
]);
