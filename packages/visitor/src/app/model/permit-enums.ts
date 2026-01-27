export enum PermissionType {
  WorkingPermission,
  PersonalPermission,
}
export enum PermissionSource {
  Internal,
  External,
}

export enum PermissionStatus {
  Pending,
  InProgress,
  Approved,
  Canceled,
  Finshed,
  Rejected,
}
export enum ActionType {
  AddNewVisitor,
  CanceledPermissionForVisitor,
  EditPermissionInfo,
  updatedPermissionInfo,
  RecordedViolation,
  AcceptedPermission,
  CancelGroup,
  ReNewPermissionForVisitor,
  rejectUpdated,
  RejectRenew,
  RejectPermission,
  RejectCancel
}
export enum CanceledReason {
  Violation,
  Other,
}
