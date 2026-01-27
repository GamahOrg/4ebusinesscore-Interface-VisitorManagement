export class ControllerPermissionModel {
  permissionID: string;
  vistorId: string;
  permissionNumber: number;
  vistorName: string;
  visitorCount: number;
  permissionType: number;
  orgName: string;
  permissionSource: number;
  recivedVisiting: string;
  permissionStatus: number;
  isFouvirte: boolean;

  constructor(
    permissionID: string = "",
    vistorId: string = "",
    permissionNumber: number = 0,
    vistorName: string = "",
    visitorCount: number = 0,
    permissionType: number = 0,
    orgName: string = "",
    permissionSource: number = 0,
    recivedVisiting: string = "",
    permissionStatus: number = 0,
    isFouvirte: boolean = false
  ) {
    this.permissionID = permissionID;
    this.vistorId = vistorId;
    this.permissionNumber = permissionNumber;
    this.vistorName = vistorName;
    this.visitorCount = visitorCount;
    this.permissionType = permissionType;
    this.orgName = orgName;
    this.permissionSource = permissionSource;
    this.recivedVisiting = recivedVisiting;
    this.permissionStatus = permissionStatus;
    this.isFouvirte = isFouvirte;
  }
}

