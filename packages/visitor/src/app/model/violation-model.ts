export class ViolationModel {
    violationtype: string;
    date: string;
    visitorId: string;
    visitorName: string;
    permissionId: string;
    permissionType: number;
    permissionSource: number;
    orgId: string;
    orgName: string;
    permissionStatus: number;
    permissionRecovery: string;
    violationId:string;
    violationName:string;
    permissionCode : number;
    violationCount : number;
    permissionOrg :string ;
    permissionReceiver : string ; 
    location:string;
    description : string ; 
    attachments :AttachmentViolationModel[];
    recivedName : string ;
    constructor(
      violationtype: string = "",
      date: string = "",
      visitorId: string = "",
      visitorName: string = "",
      permissionId: string = "",
      permissionType: number = 0,
      permissionSource: number = 0,
      orgId: string = "",
      orgName: string = "",
      permissionStatus: number = 0,
      permissionRecovery: string = "",
      violationId:string="",
      violationName:string="",
      permissionCode : number=0,
      violationCount : number=0,
      permissionOrg :string ="",
      permissionReceiver : string ="",
      location : string ="",
      description : string ="",
      attachments :AttachmentViolationModel[] = [],
      recivedName : string ="",
    ) {
      this.violationtype = violationtype;
      this.date = date;
      this.visitorId = visitorId;
      this.visitorName = visitorName;
      this.permissionId = permissionId;
      this.permissionType = permissionType;
      this.permissionSource = permissionSource;
      this.orgId = orgId;
      this.orgName = orgName;
      this.permissionStatus = permissionStatus;
      this.permissionRecovery = permissionRecovery;
      this.violationId=violationId;
      this.violationName=violationName;
      this.permissionCode=permissionCode;
      this.violationCount=violationCount;
      this.permissionOrg=permissionOrg;
      this.permissionReceiver=permissionReceiver;
      this.location = location;
      this.description = description;
      this.attachments = attachments;
      this.recivedName = recivedName;
    }
  }
  
  export class AttachmentViolationModel{
    id:string;
    filePath : string;
    fileName :string;
    constructor(
      id:string="",
      filePath : string="",
      fileName :string="",
    ){
      this.id = id;
      this.filePath = filePath;
      this.fileName = fileName;
    }
  } 