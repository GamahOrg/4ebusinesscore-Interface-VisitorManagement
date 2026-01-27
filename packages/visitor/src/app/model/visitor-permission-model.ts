export class VisitorPermissionModel {
  userId: string;
  permissionCode: string;
  visitorName: string;
  permissionType: number;
  permissionSource: number;
  orgId: string;
  orgName: string;
  recivedId: string;
  recivedName: string;
  permissionStatus: number;
  editedId?: string | null;
  violationId: string;
  visitorId: string;
  isFouvirte: boolean;
  vistorId: string = "";
  permissionNumber: number;
  vistorName: string;
  visitorCount: number;
  recivedVisiting: string;
  permissionID: string;
  permissionId: string;
  nationalID: string;
  PhoneNumber: string;
  WhatsAppNumber: string;
  email: string;
  reveivedMail?: string;
  isParking?: boolean;
  acceptButNotParking?: boolean;
  constructor(
    userId: string = "",
    permissionCode: string = "",
    visitorName: string = "",
    permissionType: number = 0,
    permissionSource: number = 0,
    orgId: string = "",
    orgName: string = "",
    recivedId: string = "",
    recivedName: string = "",
    permissionStatus: number = 0,
    editedId: string | null = null,
    violationId: string = "",
    visitorId: string = "",
    isFouvirte: boolean = false,
    permissionID: string = "",
    vistorId: string = "",
    permissionNumber: number = 0,
    vistorName: string = "",
    visitorCount: number = 0,
    recivedVisiting: string = "",
    permissionId: string = "",
    nationalID: string = "",
    PhoneNumber: string = "",
    WhatsAppNumber: string = "",
    email: string = "",
    reveivedMail: string = "",
    isParking: boolean = false,
    acceptButNotParking: boolean = false
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
    this.editedId = editedId;
    this.violationId = violationId;
    this.visitorId = visitorId;
    this.isFouvirte = isFouvirte;
    this.vistorId = vistorId;
    this.permissionNumber = permissionNumber;
    this.vistorName = vistorName;
    this.visitorCount = visitorCount;
    this.recivedVisiting = recivedVisiting;
    this.permissionID = permissionID;
    this.permissionId = permissionId;
    this.nationalID = nationalID;
    this.PhoneNumber = PhoneNumber;
    this.WhatsAppNumber = WhatsAppNumber;
    this.email = email;
    this.reveivedMail = reveivedMail;
    this.isParking = isParking;
    this.acceptButNotParking = acceptButNotParking;
  }
}

export class GroupVisitorsPermissionModel {
  groupName: string;
  groupcode: number;
  violationGroupsInfoDto: VisitorPermissionModel[];
  constructor(
    groupName: string = "",
    groupcode: number = 0,
    violationGroupsInfoDto: VisitorPermissionModel[] = []
  ) {
    this.groupName = groupName;
    this.groupcode = groupcode;
    this.violationGroupsInfoDto = violationGroupsInfoDto;
  }
}
