export class permissionTypeModel {
  id: string;
  nameAr: string;
  nameEn: string;

  constructor(id: string = "", nameAr: string = "", nameEn: string = "") {
    this.id=id;
    this.nameAr=nameAr;
    this.nameEn=nameEn;
  }
}
