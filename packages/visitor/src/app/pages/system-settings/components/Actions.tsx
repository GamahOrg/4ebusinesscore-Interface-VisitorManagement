import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { EditBasicDataPopup } from "../popup/edit-basicData-popup";

export const Actions: FC = () => {
  const intl = useIntl();
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [modalEShow, setModalEShow] = useState<boolean>(false);

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className=" p-0 text-center"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2" style={{ color: "#7e8299" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as="button" onClick={() => setModalEShow(true)}>
            <div
              className="menu-link p-3 text-primary text-left"
              style={{ textAlign: "right" }}
            >
              <i className="fas fa-pen mx-2 fs-4 text-primary"></i>
              {intl.formatMessage({ id: "Edit" })}
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={() => setModalDShow(true)}>
            <div
              className="menu-link p-3 text-danger text-left"
              style={{ textAlign: "right" }}
            >
              <i className="fas fa-trash mx-2 fs-4 text-danger "></i>
              {intl.formatMessage({ id: "Delete" })}
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow}
        />
      </div>
      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
        <EditBasicDataPopup
          handleClose={() => setModalEShow(false)}
          showAdd={modalEShow}
        />
      </div>
    </>
  );
};
