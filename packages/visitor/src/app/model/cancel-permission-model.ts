export class CancelPermissionModel {
    userId: string;
    permissionCode: number;
    visitorName: string;
    permissionType: number;
    permissionSource: number;
    orgId: string;
    orgName: string;
    recivedId: string;
    recivedName: string;
    permissionStatus: number;
    reason: string;
    violationType: string;
    cancelReason: number;
  
    constructor(
      userId: string = "",
      permissionCode: number = 0,
      visitorName: string = "",
      permissionType: number = 0,
      permissionSource: number = 0,
      orgId: string = "",
      orgName: string = "",
      recivedId: string = "",
      recivedName: string = "",
      permissionStatus: number = 0,
      reason: string = "",
      violationType: string = "", 
      cancelReason: number = 0
    ) {
      this.userId = userId;
      this.permissionCode = permissionCode;
      this.visitorName = visitorName;
      this.permissionType = permissionType;
      this.permissionSource = permissionSource;
      this.orgId = orgId;
      this.orgName = orgName;
      this.recivedId = recivedId;
      this.recivedName = recivedName;
      this.permissionStatus = permissionStatus;
      this.reason = reason;
      this.violationType = violationType;
      this.cancelReason = cancelReason;
    }
  }
  