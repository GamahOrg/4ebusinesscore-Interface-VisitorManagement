import { FC, useState } from "react";
import { useIntl } from "react-intl";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ViolationModel } from '../../../model/violation-model';
import { DeleteViolationsPopup } from "../popup/delete-violations-popup";
import {useLocation} from "react-router-dom"


type ActionProps = {
  id?: string;
  permit?: ViolationModel;
  pageIndexForMember?: number;
  pageSizeForMember?: number;
};

export const SinglePermitActions: FC<ActionProps> = ({ id, permit ,pageIndexForMember ,  pageSizeForMember}) => {
  const intl = useIntl();
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  let location = useLocation();
  let cardTitle = location?.state?.cardTitle || location?.state?.cardName
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
          <Link 
          to={`/security-and-breaches/view-violation/${id}`}
          state={{
            CardTitle:cardTitle,
          }}>
            <Dropdown.Item as="button">
              <div
                className="menu-link p-3 text-muted text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                {intl.formatMessage({ id: "ViewDetails" })}
              </div>
            </Dropdown.Item>
          </Link>
             { permit?.permissionStatus ==1&&(
                   <Link 
                        to={`/security-and-breaches/add-sub-violation/${id}`}
                        state={{
                        CardTitle:cardTitle,
                         }}>
                      <Dropdown.Item as="button">
                      <div
                      className="menu-link p-3 text-success text-left"
                       style={{ textAlign: "right" }}
                     >
                       <i className="fa-solid fa-square-plus mx-2 fs-4 text-success"></i>
                       {intl.formatMessage({ id: "AddViolation" })}
                      </div>
                        </Dropdown.Item>
                      </Link>
                )}
          <Dropdown.Item as="button" onClick={() => setModalDShow(true)}>
            <div
              className="menu-link p-3 text-danger text-left"
              style={{ textAlign: "right" }}
            >
              <i className="fa-solid fa-trash mx-2 fs-4 text-danger"></i>
              {intl.formatMessage({ id: "Delete" })}
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
        <DeleteViolationsPopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow} 
          id={id}
          {...{
            pageSizeForMember,
            pageIndexForMember,
          }}
           />
      </div>


    </>
  );
};
