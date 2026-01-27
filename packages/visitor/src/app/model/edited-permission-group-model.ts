// Model for the edited group info
export class EditedGroupInfoDto {
    permissionType: number;
    permissionSource: number;
    permissionCode: number;
    orgId: string;
    recivedId: string;
    orgName: string;
    recivedName: string;
    visitorName: string;
    userId: string;
    permissionStatus: number;
    editedId: string;
    visitorId: string;

    constructor(
        permissionType: number = 0,
        permissionSource: number = 0,
        permissionCode: number = 0,
        orgId: string = "",
        recivedId: string = "",
        orgName: string = "",
        recivedName: string = "",
        visitorName: string = "",
        userId: string = "",
        permissionStatus: number = 0,
        editedId: string = "",
        visitorId: string = ""
    ) {
        this.permissionType = permissionType;
        this.permissionSource = permissionSource;
        this.permissionCode = permissionCode;
        this.orgId = orgId;
        this.recivedId = recivedId;
        this.orgName = orgName;
        this.recivedName = recivedName;
        this.visitorName = visitorName;
        this.userId = userId;
        this.permissionStatus = permissionStatus;
        this.editedId = editedId;
        this.visitorId = visitorId;
    }
}

// Main model for the edited permission group
export class EditedPermissionGroupModel {
    groupName: string;
    groupcode: number;
    groupId: string;
    editedlGroupInfoDto: EditedGroupInfoDto[];

    constructor(
        groupName: string = "",
        groupcode: number = 0,
        groupId: string = "",
        editedlGroupInfoDto: EditedGroupInfoDto[] = []
    ) {
        this.groupName = groupName;
        this.groupcode = groupcode;
        this.groupId = groupId;
        this.editedlGroupInfoDto = editedlGroupInfoDto;
    }
}
