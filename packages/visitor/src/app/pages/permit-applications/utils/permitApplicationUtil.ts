export const handlePermissionStatus = (status: number|string) => {
    switch (status) {
      case 0:
        return { className: "badge-light-warning text-warning", value: "UnderRevision" };
      case 1:
        return { className: "badge-light-primary text-primary-original", value: "Continued" };
      case 2:
        return { className: "badge-light-success text-success", value: "Acceptable" };
      case 3:
        return { className: "badge-light-danger text-danger", value: "Canceled" };
      case 4:
        return { className: "badge-secondary text-dark", value: "Finished" };
      case 5:
        return { className: "badge-light-danger text-danger", value: "Rejected" };
      default:
        return { className: "text-dark", value: "NotFound" };
    }
  };
  export const handlePermissionSource = (status: number|string) => {
    switch (status) {
      case 0:
        return { className: "badge-light-success text-success", value: "Internall" };
      case 1:
        return { className: "badge-light-primary text-primary-original", value: "Externall" };
      default:
        return { className: "text-dark", value: "NotFound" };
    }
  };


  export  const handlePermissionType = (status: number|string) => {
    switch (status) {
      case 0:
        return { className: "badge-light-warning text-warning", value: "PermitWork" };
      case 1:
        return { className: "badge-light-primary text-primary-original", value: "PersonalVisit" };
      default:
        return { className: "text-dark", value: "NotFound" };
    }
  };
  export  const handleCancelReason = (status: number|string) => {
    switch (status) {
      case 0:
        return { className: "badge-light-danger text-danger", value: "Violation" };
      case 1:
        return { className: "badge-light-danger text-danger", value: "Other" };
      default:
        return { className: "text-dark", value: "NotFound" };
    }
  };