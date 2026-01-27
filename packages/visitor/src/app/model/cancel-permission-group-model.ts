export class CancelGroupInfoDtoModel {
    permissionType: number;
    permissionSource: number;
    permissionCode: number;
    orgId: string;
    recivedId: string;
    orgName: string;
    recivedName: string;
    visitorName: string;
    userId: string;
    permissionStatus: number;
    reason: string;
    violationType: string;
    cancelReason: number;
  
    constructor(
      permissionType: number = 0,
      permissionSource: number = 0,
      permissionCode: number = 0,
      orgId: string = "",
      recivedId: string = "",
      orgName: string = "",
      recivedName: string = "",
      visitorName: string = "",
      userId: string = "",
      permissionStatus: number = 0,
      reason: string = "",
      violationType: string = "",
      cancelReason: number = 0
    ) {
      this.permissionType = permissionType;
      this.permissionSource = permissionSource;
      this.permissionCode = permissionCode;
      this.orgId = orgId;
      this.recivedId = recivedId;
      this.orgName = orgName;
      this.recivedName = recivedName;
      this.visitorName = visitorName;
      this.userId = userId;
      this.permissionStatus = permissionStatus;
      this.reason = reason;
      this.violationType = violationType;
      this.cancelReason = cancelReason;
    }
  }
  
  export class CancelPermissionGroupModel {
    groupId:string;
    groupName: string;
    groupCode: number;
    cancelGroupInfoDtos: CancelGroupInfoDtoModel[];
  
    constructor(
      groupId:string ="",
      groupName: string = "",
      groupCode: number = 0,
      cancelGroupInfoDtos: CancelGroupInfoDtoModel[] = []
    ) {
      this.groupId = groupId
      this.groupName = groupName;
      this.groupCode = groupCode;
      this.cancelGroupInfoDtos = cancelGroupInfoDtos;
    }
  }
  