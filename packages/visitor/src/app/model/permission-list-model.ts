import {
  PermissionSource,
  PermissionType,
  PermissionStatus,
} from "./permit-enums";
export class PermissionListModel {
  visitorId: string;
  permissionID: string;
  vistorId: string;
  permissionNumber: number;
  vistorName: string;
  visitorCount: number;
  permissionType: PermissionType;
  orgName: string;
  orgNameEn?: string;
  permissionSource: PermissionSource;
  recivedVisiting: string;
  permissionStatus: PermissionStatus;
  isFouvirte: boolean;
  startDate?: string;
  stratDate?: string;
  stratTime?: string;
  endTime?: string;
  endDate?: string;
  permissionId: string;
  userId: string;
  receivedId?: string;
  reveivedMail?: string;
  permissionTypeAr?: string;
  permissionTypeEn?: string;
  isParking?: boolean;
  isReminder?: boolean;
  buildingType?: number;
  constructor(
    permissionID: string = "",
    vistorId: string = "",
    permissionNumber: number = 0,
    vistorName: string = "",
    visitorCount: number = 0,
    permissionType: PermissionType = PermissionType?.PersonalPermission,
    orgName: string = "",
    orgNameEn: string = "",
    permissionSource: PermissionSource = PermissionSource?.External,
    recivedVisiting: string = "",
    permissionStatus: PermissionStatus = PermissionStatus?.Pending,
    isFouvirte: boolean = false,
    startDate: string = "",
    stratDate: string = "",
    stratTime: string = "",
    endTime: string = "",
    endDate: string = "",
    permissionId: string = "",
    visitorId: string = "",
    userId: string = "",
    receivedId: string = "",
    reveivedMail: string = "",
    isParking: boolean = false,
    isReminder: boolean = false,
    buildingType: number = 0
  ) {
    this.permissionID = permissionID;
    this.vistorId = vistorId;
    this.permissionNumber = permissionNumber;
    this.vistorName = vistorName;
    this.visitorCount = visitorCount;
    this.permissionType = permissionType;
    this.orgName = orgName;
    this.orgNameEn = orgNameEn;
    this.permissionSource = permissionSource;
    this.recivedVisiting = recivedVisiting;
    this.permissionStatus = permissionStatus;
    this.isFouvirte = isFouvirte;
    this.startDate = startDate;
    this.stratDate = stratDate;
    this.endTime = endTime;
    this.stratTime = stratTime;
    this.endDate = endDate;
    this.permissionId = permissionId;
    this.visitorId = visitorId;
    this.userId = userId;
    this.receivedId = receivedId;
    this.reveivedMail = reveivedMail;
    this.isParking = isParking;
    this.isReminder = isReminder;
    this.buildingType = buildingType;
  }
}
export class GroupModel {
  id: string;
  groupName: string;
  groupNamber: number;
  startDate?: string;
  endDate?: string;
  permissionType?: PermissionType;
  permissionListDto: PermissionListModel[];
  permissionTypeEn?: string;
  permissionTypeAr?: string;
  buildingType?: number;
  constructor(
    id: string = "",
    groupName: string = "",
    groupNamber: number = 0,
    permissionListDto: PermissionListModel[] = [],
    startDate: string = "",
    endDate: string = "",
    permissionType: PermissionType = PermissionType.PersonalPermission,
    buildingType: number = 0
  ) {
    this.id = id;
    this.groupName = groupName;
    this.groupNamber = groupNamber;
    this.permissionListDto = permissionListDto;
    this.startDate = startDate;
    this.endDate = endDate;
    this.permissionType = permissionType;
    this.buildingType = buildingType;
  }
}
