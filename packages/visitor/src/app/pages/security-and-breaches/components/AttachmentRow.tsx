import { FC } from "react";
import { VisitorRootUrl } from "@4eplatform/shared/apis/visitor";


type AttachmentRowProps ={
  attach:any
}

const AttachmentRow :FC<AttachmentRowProps>= ({attach}) => {


  return (
    <div className="d-flex justify-content-start flex-wrap gap-2">
      {attach?.map((file: any) => {
  if (!file || typeof file.filePath !== "string") {
    return null;
  }
        const fileName = file?.fileName?.substring(file?.fileName?.lastIndexOf("/") + 1);

        const isImage =
          fileName?.endsWith(".jpeg") ||
          fileName?.endsWith(".jpg") ||
          fileName?.endsWith(".png") ||
          fileName?.endsWith(".jfif") ||
          fileName?.endsWith(".webp") ||
          fileName?.endsWith(".PNG") ;
        const isPdf = fileName?.endsWith(".pdf");
        const isDoc =
          fileName?.endsWith(".doc") || fileName?.endsWith(".docx");
        const isExcel =
          fileName?.endsWith(".xlsx") || fileName?.endsWith(".xls");
        const isVideo =
          fileName?.endsWith(".mp4") ||
          fileName?.endsWith(".ts") ||
          fileName?.endsWith(".mkv") ||
          fileName?.endsWith(".avi") ||
          fileName?.endsWith(".webm");
        const isPowerPoint =
          fileName?.endsWith(".pptx") ||
          fileName?.endsWith(".pptm") ||
          fileName?.endsWith(".ppt") ||
          fileName?.endsWith(".pps") ||
          fileName?.endsWith(".ppsm");
        const isText = fileName?.endsWith(".txt");

        const fileIcon = isImage
          ? `${VisitorRootUrl}${file?.filePath}`
          : isPdf
          ? "/media/pmo/pdfIcon.png"
          : isDoc
          ? "/media/pmo/docIcon.png"
          : isExcel
          ? "/media/pmo/excelIcon.png"
          : isVideo
          ? "/media/pmo/video.png"
          : isPowerPoint
          ? "/media/pmo/powerPointIcon.png"
          : isText
          ? "/media/pmo/textIcon.png"
          : "/media/pmo/pdfIcon.png";
        return (
          <div className="d-flex" key={file?.id}>
            <img
              src={fileIcon}
              alt=""
              className="d-inline-block ms-2"
              style={{
                height: "40px",
                width: "40px",
              }}
            />
            <div>
              <a href={`${VisitorRootUrl}${file?.filePath}`} target="_blank" rel="noopener noreferrer">
                <p className="text-primary mx-2 fw-bolder p-0 m-0 cursor-pointer">
                  {fileName}
                </p>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttachmentRow;
