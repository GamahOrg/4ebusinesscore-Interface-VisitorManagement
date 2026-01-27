import {
  PermissionSource,
  PermissionType,
  PermissionStatus,
} from "./permit-enums";

export class VisitorDtoModel {
    visitorName: string;
    userId: string;
    permissionStatus: number;
    visitorId:string;
    visitorCode:string
  
    constructor(
      visitorName: string = "",
      userId: string = "",
      permissionStatus: number = 0,
      visitorId:string="",
      visitorCode: string=""
    ) {
      this.visitorName = visitorName;
      this.userId = userId;
      this.permissionStatus = permissionStatus;
      this.visitorId=visitorId
      this.visitorCode = visitorCode
    }
  }
  export class ModifiedVisitorDtoModel {
    visitorName: string;
    userId: string;
    permissionStatus: number;
    permissionType:number;
    permissionSource:number;
    permissionCode:number | string;
    orgId:string;
    recivedId:string;
    orgName:string;
    recivedName:string;
    visitorId:string;
    permissionID:string;
    reveivedMail?:string
  
    constructor(
      visitorName: string = "",
      userId: string = "",
      permissionStatus: number = 0,
      permissionType:number=0,
      permissionSource:number=0,
      permissionCode:number=0,
      visitorId:string="",
      recivedName:string="",
      orgName:string="",
      recivedId:string="",
      orgId:string="",
      permissionID:string="",
      reveivedMail:string=""

    ) {
      this.visitorName = visitorName;
      this.userId = userId;
      this.permissionStatus = permissionStatus;
      this.orgId=orgId;
      this.orgName=orgName;
      this.permissionCode=permissionCode;
      this.permissionSource=permissionSource;
      this.permissionType=permissionType;
      this.recivedId=recivedId;
      this.recivedName=recivedName;
      this.visitorId=visitorId;
      this.permissionID=permissionID;
      this.reveivedMail=reveivedMail
    }
  }
  export class PermissionDtoModel {
    permissionType: number;
    permissionSource: number;
    // permissionCode: number;
    orgId: string;
    recivedId: string;
    orgName: string;
    recivedName: string;
    permissionId:string;
    visitorDto: VisitorDtoModel[];
    permissionID: string;
    vistorId: string;
    permissionNumber: number;
    vistorName: string;
    visitorCount: number;
    PermissionType: PermissionType;
    PermissionSource: PermissionSource;
    recivedVisiting: string;
    permissionStatus: PermissionStatus;
    isFouvirte: boolean;
    reveivedMail?:string
    isParking?: boolean;
    permissionTypeAr?: string;
    permissionTypeEn?: string;
  
    constructor(
      permissionType: number = 0,
      permissionSource: number = 0,
      // permissionCode: number = 0,
      permissionId:string="",
      orgId: string = "",
      recivedId: string = "",
      orgName: string = "",
      recivedName: string = "",
      permissionID: string = "",
      vistorId: string = "",
      permissionNumber: number,
      vistorName: string = "",
      visitorCount: number,
      PermissionType: PermissionType,
      PermissionSource: PermissionSource, 
      recivedVisiting: string,
      PermissionStatus: PermissionStatus,
      isFouvirte: boolean,
      isParking: boolean,
      visitorDto: VisitorDtoModel[] = [],
      reveivedMail:string="",
      permissionTypeAr:string="",
      permissionTypeEn:string=""
    ) {
      this.permissionType = permissionType;
      this.permissionSource = permissionSource;
      // this.permissionCode = permissionCode;
      this.orgId = orgId;
      this.recivedId = recivedId;
      this.orgName = orgName;
      this.recivedName = recivedName;
      this.visitorDto = visitorDto;
      this.permissionId=permissionId;
      this.permissionID = permissionID;
      this.vistorId = vistorId;
      this.permissionNumber = permissionNumber;
      this.vistorName = vistorName;
      this.visitorCount = visitorCount;
      this.PermissionType = PermissionType;
      this.PermissionSource = PermissionSource;
      this.recivedVisiting = recivedVisiting;
      this.permissionStatus = PermissionStatus;
      this.isFouvirte = isFouvirte;
      this.isParking = isParking;
      this.reveivedMail=reveivedMail;
      this.permissionTypeAr=permissionTypeAr;
      this.permissionTypeEn=permissionTypeEn;
    }
  }
  
  export class VisitorsPermissionGroupModel {
    groupId: string;
    groupName: string;
    groupcode: number;
    permissionDto: PermissionDtoModel[];
    visitorDto: VisitorDtoModel[];
    permissiontype: number;
    permissionSource: number;
    PermitNumber: string;
    VisitorName: string;
    WhatsAppNumber: string;
    Number: string;
    PermitReason: string;
    AuthorizingAuthority: string;
    PermitSource: string;
    visitReceiver: string;
    PermitDateStart: string;
    PermitDateEnd: string;
    PermitTimeStart: string;
    PermitTimeEnd: string;
    PermitStatus: PermissionStatus;
    Options: string;
    clicked?: boolean;
    id: string;
    GroupNumber: string;
    groupNamber: number;
    permissionListDto: PermissionDtoModel[] = []
  
    constructor(
      groupId: string = "",
      groupName: string = "",
      groupCode: number = 0,
      permissiontype: number,
      permissionSource: number,
      permissionDto: PermissionDtoModel[] = [],
      permissionListDto: PermissionDtoModel[] = [],
      visitorDto: VisitorDtoModel[],
      PermitNumber: string,
      VisitorName: string,
      WhatsAppNumber: string,
      id: string,
      GroupNumber: string,
      Number: string,
      PermitReason: string,
      AuthorizingAuthority: string,
      PermitSource: string,
      visitReceiver: string,
      PermitDateStart: string,
      PermitDateEnd: string,
      PermitTimeStart: string,
      PermitTimeEnd: string,
      PermitStatus: PermissionStatus,
      Options: string,
      groupNamber: number,
      clicked?: boolean,

    ) {
      this.groupId = groupId;
      this.groupName = groupName;
      this.groupcode = groupCode;
      this.permissionDto = permissionDto;
      this.visitorDto = visitorDto;
      this.permissiontype = permissiontype;
      this.permissionSource = permissionSource;
      this.PermitNumber = PermitNumber;
      this.VisitorName = VisitorName;
      this.WhatsAppNumber = WhatsAppNumber;
      this.Number = Number;
      this.PermitReason = PermitReason;
      this.AuthorizingAuthority = AuthorizingAuthority;
      this.PermitSource = PermitSource;
      this.visitReceiver = visitReceiver;
      this.PermitDateStart = PermitDateStart;
      this.PermitDateEnd = PermitDateEnd;
      this.PermitTimeStart = PermitTimeStart;
      this.PermitTimeEnd = PermitTimeEnd;
      this.PermitStatus = PermitStatus;
      this.Options = Options;
      this.id = id;
      this.GroupNumber = GroupNumber;
      this.groupNamber = groupNamber;
      this.permissionListDto = permissionListDto;
    }
  }
  