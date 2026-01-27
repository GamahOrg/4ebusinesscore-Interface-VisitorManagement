import React, { useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";

type AddPopupProps = {
show?: any;
handleClose?: any;
};
type Props = {
activeButtonId: number;
};

const notes: React.FC<AddPopupProps & Props> = ({
show,
handleClose,
activeButtonId,
}) => {
const intl = useIntl();

const [modalHShow, setModalHShow] = useState<boolean>(false);

const [filter, setFilter] = useState<any>({
courseName: "",
});


let handleCancel = () => {
setFilter({
    courseName: "",
});
handleClose();
};

return (
<>
    <div className="modal fade" aria-hidden="true">
    <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
    >
        <div className="card">
        <Modal.Header
            closeButton
            className="p-5"
            style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            padding: "0px",
            }}
        >
            <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
            <Modal.Title>
                <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
                <span className="card-label fs-4 my-5">
                    {" "}
                    {intl.formatMessage({ id: "Notes" })}
                </span>
                </h3>
            </Modal.Title>
            </div>
        </Modal.Header>
        <Modal.Body>
            <form className="form outputForm">
                <div className="row">
                    <div className="paragraph rounded p-5"
                    style={{backgroundColor: "#F5F8FA"}}>
                        <p>
                        هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة
                        </p>
                    </div>
                </div>
            </form>
        </Modal.Body>

        </div>
    </Modal>
    </div>
    <div
    className="modal fade"
    id="Rega_modal_viewEmployee_hierarchy"
    aria-hidden="true"
    >
    </div>
</>
);
};

export default notes;
