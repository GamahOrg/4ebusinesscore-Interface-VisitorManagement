import {
  PermissionSource,
  PermissionType,
  PermissionStatus,
  ActionType,
  CanceledReason
} from "./permit-enums";
export class FollowPermissionModel {
    permissionId: string;
    description: string;
    reason: string;
    date: string;
    visitorId: string;
    startDate: string;
    createBy: string;
    orgName: string;
    endDate: string;
    startTime: string;
    endTime: string;
    userId: string;
    visitorName: string;
    nationalID: number;
    phoneNumber: number;
    whatsAppNumber: number;
    email: string;
    orgId: string;
    recivedId: string;
    recivedName: string;
    notes: string;
    permissionStatus: PermissionStatus;
    action: ActionType;
    cancelreson:number;
    reasonForCancled:CanceledReason;
    violationtype:string;
    permissionNote:string;
    attachments:any
    constructor(
      permissionId: string = "",
      description: string = "",
      reason: string = "",
      date: string = "",
      visitorId: string = "",
      startDate: string = "",
      createBy: string = "",
      orgName: string = "",
      endDate: string = "",
      startTime: string = "",
      endTime: string = "",
      userId: string = "",
      visitorName: string = "",
      nationalID: number = 0,
      phoneNumber: number = 0,
      whatsAppNumber: number = 0,
      email: string = "",
      orgId: string = "",
      recivedId: string = "",
      recivedName: string = "",
      notes: string = "",
      permissionStatus: PermissionStatus = PermissionStatus.Pending,
      action: ActionType = ActionType.AddNewVisitor,
      cancelreson:number=0,
      reasonForCancled:CanceledReason=CanceledReason?.Violation,
      violationtype:string="",
      permissionNote:string="",
      attachments:any=[]
    ) {
      this.permissionId = permissionId;
      this.description = description;
      this.reason = reason;
      this.date = date;
      this.visitorId = visitorId;
      this.startDate = startDate;
      this.createBy = createBy;
      this.orgName = orgName;
      this.endDate = endDate;
      this.startTime = startTime;
      this.endTime = endTime;
      this.userId = userId;
      this.visitorName = visitorName;
      this.nationalID = nationalID;
      this.phoneNumber = phoneNumber;
      this.whatsAppNumber = whatsAppNumber;
      this.email = email;
      this.orgId = orgId;
      this.recivedId = recivedId;
      this.recivedName = recivedName;
      this.notes = notes;
      this.permissionStatus = permissionStatus;
      this.action = action;
      this.cancelreson=cancelreson
      this.reasonForCancled=reasonForCancled;
      this.violationtype=violationtype;
      this.permissionNote=permissionNote;
      this.attachments=attachments
    }
  }
  