import { Attachment } from "./single-permission-details-model";

export class VisitorModel {
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
  isArchive: boolean;
  isParking: any;
  permissionTypeAr: any;
  permissionTypeEn: any;
  buildingType: number;

  constructor(
    permissionID: string = "",
    vistorId: string = "",
    permissionNumber: number = 0,
    vistorName: string = "",
    visitorCount: number = 1,
    permissionType: number = 0,
    orgName: string = "",
    permissionSource: number = 0,
    recivedVisiting: string = "",
    permissionStatus: number = 0,
    isFouvirte: boolean = false,
    isArchive: boolean = false,
    buildingType: number = 0
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
    this.isArchive = isArchive;
    this.buildingType = buildingType;
  }
}

export class GroupPermissionDetailsModel {
  isFavorite: boolean;
  receivedVisiting: string;
  orgName: string;
  permissionSource: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  createdOn: string;
  creator: string;
  permissionReason: string;
  permissionNote: string;
  attachments: Attachment[];
  permissionId: string;
  permissionType: number;
  visitor: VisitorModel[];
  qrCodeUrl: string;
  permissionStatus: number;
  groupName: string;
  groupNumber: number;
  managerDecission: any;
  parkingDto: any;
  isParking: any;
  creatorEmail?: string;
  creatorId?: string;
  buildingType?: number;
  constructor(
    isFavorite: boolean = false,
    receivedVisiting: string = "",
    orgName: string = "",
    permissionSource: number = 0,
    startDate: string = "",
    endDate: string = "",
    startTime: string = "",
    endTime: string = "",
    createdOn: string = "",
    creator: string = "",
    permissionReason: string = "",
    permissionNote: string = "",
    attachments: Attachment[] = [],
    permissionId: string = "",
    permissionType: number = 0,
    visitor: VisitorModel[] = [],
    qrCodeUrl: string = "",
    permissionStatus: number = 0,
    groupName: string = "",
    groupNumber: number = 0,
    creatorId: string = "",
    creatorEmail: string = "",
    buildingType: number = 0
  ) {
    this.isFavorite = isFavorite;
    this.receivedVisiting = receivedVisiting;
    this.orgName = orgName;
    this.permissionSource = permissionSource;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.createdOn = createdOn;
    this.creator = creator;
    this.permissionReason = permissionReason;
    this.permissionNote = permissionNote;
    this.attachments = attachments;
    this.permissionId = permissionId;
    this.permissionType = permissionType;
    this.visitor = visitor;
    this.qrCodeUrl = qrCodeUrl;
    this.permissionStatus = permissionStatus;
    this.groupName = groupName;
    this.groupNumber = groupNumber;
    this.creatorEmail = creatorEmail;
    this.creatorId = creatorId;
    this.buildingType = buildingType;
  }
}
