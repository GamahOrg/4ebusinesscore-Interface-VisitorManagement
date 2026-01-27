export type Attachment = {
  id: string;
  filename: string;
  filepath: string;
};
export class EditedPermissionModel {
  receivedVisiting: string;
  orgName: string;
  startDate: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  permissionReason: string;
  permissionNote: string;
  visitorName: string;
  visitorPhone: string;
  visitorWhatsApp: string;
  visitorEmail: string;
  visitorNID: string;
  attachments: Attachment[] ;
  permissionType: number;
  editId: string;
  responsibleName: string;
  editDate: string;
  permissionSource: any;

  constructor(
    receivedVisiting: string = "",
    orgName: string = "",
    startDate: string = "",
    endDate: string | null = null,
    startTime: string | null = null,
    endTime: string | null = null,
    permissionReason: string = "",
    permissionNote: string = "",
    visitorName: string = "",
    visitorPhone: string = "",
    visitorWhatsApp: string = "",
    visitorEmail: string = "",
    visitorNID: string = "",
    attachments: Attachment[] = [],
    permissionType: number = 0,
    editId: string = "",
    responsibleName: string = "",
    editDate: string = ""
  ) {
    this.receivedVisiting = receivedVisiting;
    this.orgName = orgName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.permissionReason = permissionReason;
    this.permissionNote = permissionNote;
    this.visitorName = visitorName;
    this.visitorPhone = visitorPhone;
    this.visitorWhatsApp = visitorWhatsApp;
    this.visitorEmail = visitorEmail;
    this.visitorNID = visitorNID;
    this.attachments = attachments;
    this.permissionType = permissionType;
    this.editId = editId;
    this.responsibleName = responsibleName;
    this.editDate = editDate;
  }
}
