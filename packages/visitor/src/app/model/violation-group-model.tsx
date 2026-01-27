import { ViolationModel } from "./violation-model";

export class ViolationGroupModel {
  groupId: string;
  groupName: string;
  groupcode: number;
  violationGroupsInfoDto: ViolationModel[];
  orgName:string;
  permissionSource:number;
  permissionType:number;
  recivedName:string;
  constructor(
    groupId: string = "",
    groupName: string = "",
    violationGroupsInfoDto: ViolationModel[] = [],
    groupcode: number = 0,
    orgName:string="",
    permissionSource:number=0,
    permissionType:number=0,
    recivedName:string="",
  ) {
    this.groupId = groupId;
    this.groupName = groupName;
    this.violationGroupsInfoDto = violationGroupsInfoDto;
    this.groupcode = groupcode;
    this.orgName=orgName;
    this.permissionSource=permissionSource;
    this.permissionType=permissionType;
    this.recivedName=recivedName;
  }
}
