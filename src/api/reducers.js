const formatDate = (dateString) => dateString.slice(0,10);

const complaintReducer = (complaint) => {
  const { housenumber, streetname, borough, zip } = complaint;
  return ({
    problemId: complaint.problemid,
    complaintId: complaint.complaintid,
    buildingId: complaint.buildingid,
    address: `${housenumber} ${streetname}, ${borough} ${zip}`,
    unit: complaint.apartment,
    receivedDate: complaint.receiveddate ? formatDate(complaint.receiveddate) : '',
    status: complaint.status,
    statusDate: complaint.statusdate ? formatDate(complaint.statusdate) : '',
    locationType: `${complaint.unittype} - ${complaint.spacetype}`,
    type: complaint.type,
    category: `${complaint.majorcategory} - ${complaint.minorcategory}`,
    issue: complaint.code,
    statusDescription: complaint.statusdescription
  });
};

const violationReducer = (violation) => {
  const { housenumber, streetname, boro, zip, nta } = violation;
  const violationAddress = `${housenumber} ${streetname}, ${boro} ${zip}`;
  const addressUnit = `${violation.apartment ? `Apt ${violation.apartment} ` :'' }${violation.story ? `Flr ${violation.story}` : ''}`
  const violationType = `Class ${violation.class}${violation.novtype ? ` - ${violation.novtype}` : ''}`;

  return ({
      violationid: violation.violationid,
      buildingId: violation.buildingId,
      address: violationAddress,
      unit: addressUnit,
      inspectionDate: violation.inspectiondate ? formatDate(violation.inspectiondate) : '',
      approvedDate: violation.approveddate ? formatDate(violation.approveddate) : '',
      originalCertifyByDate: violation.originalcertifybydate ? formatDate(violation.originalcertifybydate) : '',
      originalCorrectByDate: violation.originalcorrectbydate ? formatDate(violation.originalcorrectbydate) : '',
      newCertifyByDate: violation.newcertifybydate ? formatDate(violation.newcertifybydate) : '',
      newCorrectByDate: violation.newcorrectbydate ? formatDate(violation.newcorrectbydate) : '',
      certifiedDate: violation.certifieddate ? formatDate(violation.certifieddate) : '',
      description: violation.novdescription,
      issuedDate: violation.novissueddate ? formatDate(violation.novissueddate) : '',
      lastUpdated: violation.currentstatusdate ? formatDate(violation.currentstatusdate) : '',
      type: violationType,
      violationStatus: `${violation.violationstatus == 'Close' ? 'Closed' : 'Open' } - ${violation.currentstatus}`,
      neighborhood: violation.nta
  });
};

module.exports = {
  violationReducer,
  complaintReducer
};
