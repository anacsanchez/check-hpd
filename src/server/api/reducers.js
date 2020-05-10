const formatDate = (dateString) => dateString.slice(0,10);

const complaintReducer = (complaint) => {
  const { housenumber, streetname, borough, zip } = complaint;
  return ({
    complaintId: complaint.complaintid,
    problemId: complaint.problemid,
    buildingId: complaint.buildingid,
    address: `${housenumber} ${streetname}, ${borough} ${zip}`,
    unit: complaint.apartment,
    receivedDate: complaint.receiveddate ? formatDate(complaint.receiveddate) : '',
    status: complaint.status,
    statusDate: complaint.statusdate ? formatDate(complaint.statusdate) : '',
    unitType: complaint.unittype,
    spaceType: complaint.spacetype,
    type: complaint.type,
    category: `${complaint.majorcategory} - ${complaint.minorcategory}`,
    issue: complaint.code,
    statusDescription: complaint.statusdescription
  });
};

const violationReducer = (violation) => {
  const { housenumber, streetname, boro, zip } = violation;

  return (
    {
      id: violation.violationid,
      buildingId: violation.buildingId,
      address: `${housenumber} ${streetname}, ${boro} ${zip}`,
      unit: violation.apartment,
      story: violation.story,
      class: violation.class,
      inspectionDate: violation.inspectiondate ? formatDate(violation.inspectiondate) : '',
      approvedDate: violation.approveddate ? formatDate(violation.approveddate) : '',
      originalCertifyByDate: violation.originalcertifybydate ? formatDate(violation.originalcertifybydate) : '',
      originalCorrectByDate: violation.originalcorrectbydate ? formatDate(violation.originalcorrectbydate) : '',
      newCertifyByDate: violation.newcertifybydate ? formatDate(violation.newcertifybydate) : '',
      newCorrectByDate: violation.newcorrectbydate ? formatDate(violation.newcorrectbydate) : '',
      certifiedDate: violation.certifieddate ? formatDate(violation.certifieddate) : '',
      description: violation.novdescription,
      issuedDate: violation.novissueddate ? formatDate(violation.novissueddate) : '',
      currentStatus: violation.currentstatus,
      currentStatusDate: violation.currentstatusdate ? formatDate(violation.currentstatusdate) : '',
      type: violation.novtype,
      violationStatus: violation.violationstatus,
      neighborhood: violation.nta
    }
  );
};

module.exports = {
  violationReducer,
  complaintReducer
};
