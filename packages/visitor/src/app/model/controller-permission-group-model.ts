import { ControllerPermissionModel } from "./controller-permission-model";


export class ControllerPermissionGroupModel {
    id: string;
    groupName: string;
    groupNamber: number;
    permissionListDto: ControllerPermissionModel[];
  
    constructor(
      id: string = "",
      groupName: string = "",
      groupNamber: number = 0,
      permissionListDto: ControllerPermissionModel[] = []
    ) {
      this.id = id;
      this.groupName = groupName;
      this.groupNamber = groupNamber;
      this.permissionListDto = permissionListDto;
    }
  }
  