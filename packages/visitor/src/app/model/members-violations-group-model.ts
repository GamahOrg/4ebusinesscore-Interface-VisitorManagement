export class MembersViolationsGroupModel {
  visitorId: string;
  visitorName: string;
  violationType: string;
  date: string;
  description: string;
  permissionCode: number;
  violationId: string;
  location: string;
  permissionType: number;
  permissionOrg: string;
  fullName:string;
  constructor(
    visitorId: string = "",
    visitorName: string = "",
    violationType: string = "",
    date: string = "",
    description: string = "",
    permissionCode: number = 0,
    violationId: string = "",
    location: string = "",
    permissionType: number = 0,
    permissionOrg: string = "",
    fullName:string="",
  ) {
    this.visitorId = visitorId;
    this.visitorName = visitorName;
    this.violationType = violationType;
    this.date = date;
    this.description = description;
    this.permissionCode = permissionCode;
    this.violationId = violationId;
    this.location = location;
    this.permissionType = permissionType;
    this.permissionOrg = permissionOrg;
    this.fullName = fullName;
  }
}
