export type Attachment = {
  id: string;
  filename: string;
  filepath: string;
};
export class SinglePermissionDetailsModel {
  isFavorite: boolean;
  receivedVisiting: string;
  orgName: string;
  orgId: string;
  userId: string;
  recievedId: string;
  permissionSource: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  createdOn: string;
  creator: string;
  permissionReason: string;
  permissionNote: string;
  visitorName: string;
  visitorPhone: string;
  visitorWhatsApp: string;
  visitorEmail: string;
  visitorNID: string;
  permissionStatus: number;
  attachments: Attachment[];
  permissionNumber: number;
  permissionId: string;
  permissionType: number;
  visitorId: string;
  qrCodeUrl: string;
  isArchive: boolean;
  reveivedMail?: string;
  isCanceled?: boolean;
  isParking: any;
  managerDecission: any;
  parkingDto: any;
  creatorId?: string;
  creatorEmail?: string;
  permissionTypeAr: any;
  permissionTypeEn: any;
  buildingType?: number;

  constructor(
    isFavorite: boolean = false,
    receivedVisiting: string = "",
    orgName: string = "",
    orgId: string = "",
    userId: string = "",
    recievedId: string = "",
    permissionSource: number = 0,
    startDate: string = "",
    endDate: string = "",
    startTime: string = "",
    endTime: string = "",
    createdOn: string = "",
    creator: string = "",
    permissionReason: string = "",
    permissionNote: string = "",
    visitorName: string = "",
    visitorPhone: string = "",
    visitorWhatsApp: string = "",
    visitorEmail: string = "",
    visitorNID: string = "",
    permissionStatus: number = 0,
    attachments: Attachment[] = [],
    permissionNumber: number = 0,
    permissionId: string = "",
    permissionType: number = 0,
    visitorId: string = "",
    qrCodeUrl: string = "",
    isArchive: boolean = false,
    reveivedMail: string = "",
    isCanceled: boolean = false,
    creatorId: string = "",
    creatorEmail: string = "",
    permissionTypeAr: string = "",
    permissionTypeEn: string = "",
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
    this.visitorName = visitorName;
    this.visitorPhone = visitorPhone;
    this.visitorWhatsApp = visitorWhatsApp;
    this.visitorEmail = visitorEmail;
    this.visitorNID = visitorNID;
    this.permissionStatus = permissionStatus;
    this.attachments = attachments;
    this.permissionNumber = permissionNumber;
    this.permissionId = permissionId;
    this.permissionType = permissionType;
    this.visitorId = visitorId;
    this.qrCodeUrl = qrCodeUrl;
    this.isArchive = isArchive;
    this.orgId = orgId;
    this.userId = userId;
    this.recievedId = recievedId;
    this.reveivedMail = reveivedMail;
    this.isCanceled = isCanceled;
    this.creatorId = creatorId;
    this.creatorEmail = creatorEmail;
    this.permissionTypeAr = permissionTypeAr;
    this.permissionTypeEn = permissionTypeEn;
    this.buildingType = buildingType;
  }
}
