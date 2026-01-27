export enum RequestStatus {
  idle,
  loading,
  succeeded,
  failed,
}

export enum ResponseStatus {
  FailedToSave,
  SavedSuccessfully,
  Exception,
  Success,
  Failed,
  FailedToFindTheObject,
  AlreadyExisting,
}

export enum BuildingStatus {
  Main = 1,
  Sub = 2,
}
