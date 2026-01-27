export class VisitorModel {
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
    visitorName: string;
    visitorPhone: string;
    visitorWhatsApp: string;
    visitorEmail: string;
    visitorNID: string;
    permissionStatus: number;
    attachments: any | null;
    permissionNumber: number;
    permissionId: string;
    permissionType: number;
    visitorId: string;
    qrCodeUrl: string;
    inside?: boolean;
    permissionTypeAr: any;
    permissionTypeEn: any;
  
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
      visitorName: string = "",
      visitorPhone: string = "",
      visitorWhatsApp: string = "",
      visitorEmail: string = "",
      visitorNID: string = "",
      permissionStatus: number = 0,
      attachments: any | null = null,
      permissionNumber: number = 0,
      permissionId: string = "",
      permissionType: number = 0,
      visitorId: string = "",
      qrCodeUrl: string = "",
      inside: boolean = false,
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
      this.inside = inside;
    }
  }
  