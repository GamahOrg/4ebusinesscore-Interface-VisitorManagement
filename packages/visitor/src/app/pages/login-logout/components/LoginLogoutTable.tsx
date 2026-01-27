import { useIntl } from "react-intl";
import { FC, useEffect, useState } from "react";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { fetchCheckInList } from "../../../redux/check-in-slice";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/store";
import { Spinner } from "react-bootstrap";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { handlePermissionStatus } from "../../permit-applications/utils/permitApplicationUtil";
import moment from "moment";
import 'moment/locale/ar';
// import moment from "moment-timezone";

interface LoginLogoutTableProps {
  searchText: string;
  selectedDate: string;
  isTransit: boolean;
  transitStatus: number;
}

const LoginLogoutTable: FC<LoginLogoutTableProps> = ({ searchText, selectedDate, isTransit, transitStatus }) => {
  const intl = useIntl();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNamber, setPageNamber] = useState<number>(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const params = {
      pageSize,
      pageNamber,
      isTransit,
      transitStatus,
      ...(searchText && { search: searchText }),
      ...(selectedDate && { date: selectedDate })
    }
    dispatch(fetchCheckInList(params) as any)
  }, [pageNamber, pageSize, searchText, selectedDate, isTransit, transitStatus])


  const { checkInList, pagination, status } = useSelector((state: RootState) => state.checkIn)


  const { totalPages, totalItems } = pagination;



  const handleTransitionStatus = (status: number) => {
    switch (status) {
      case 0:
        return (
          <div className="d-flex justify-content-center align-items-center gap-1">
            <i className="fa-solid fa-arrow-up text-success" style={{ transform: 'rotate(45deg)' }}></i>
            <span>{intl.formatMessage({ id: "Login" })}</span>
          </div>
        );
      case 1:
        return (
          <div className="d-flex justify-content-center align-items-center gap-1">
            <i className="fa-solid fa-arrow-down text-danger" style={{ transform: 'rotate(45deg)' }}></i>
            <span>{intl.formatMessage({ id: "LogOut1" })}</span>
          </div>
        );
      case 2:
        return (
          <div className="d-flex justify-content-center align-items-center gap-1">
            <i className="fa-solid fa-ban text-danger"></i>
            <span>{intl.formatMessage({ id: "Forbid" })}</span>
          </div>
        );
      default:
        return <></>;
    }
  }

  const handleIsTransit = (status: boolean) => {
    switch (status) {
      case true:
        return { className: "badge-light-success text-success", value: "AllowPassage" };
      case false:
        return { className: "badge-light-danger text-danger", value: "DenyPassage" };
      default:
        return { className: "text-dark", value: "NotFound" };
    }
  };

  return (
    <>
    {status === RequestStatus.loading ? (
               
        <div className="d-flex gap-4 justify-content-center align-items-center py-4">
          {intl.formatMessage({ id: "Loading" })}
          <Spinner animation="border" variant="primary" />
        </div> ) : 
          checkInList?.length > 0 ? 

       
      <div className="card-xl-stretch mb-xl-8 px-0">
        <div className="table-responsive mt-4 align-middle">
          <table
            className="table table-row-dashed table-row-gray-300 gs-0 gy-7"
            id="REGA-WS-caseList"
          >
            <thead>
              <tr className="fw-bolder text-muted">
                <th className="min-w-150px text-center">
                  {intl.formatMessage({ id: "TransitStatus" })}
                </th>
                <th className="min-w-100px text-center">
                  {intl.formatMessage({ id: "PermitNumber" })}
                </th>
                <th className="min-w-100px text-center">
                  {intl.formatMessage({ id: "VisitorName" })}
                </th>
                <th className="min-w-100px text-center">
                  {intl.formatMessage({ id: "PermitStatus" })}
                </th>
                <th className="min-w-100px text-center">
                  {intl.formatMessage({ id: "AuthorizingAuthority" })}
                </th>
                <th className="min-w-100px text-center">
                  {intl.formatMessage({ id: "VisitReceiver" })}
                </th>
                <th className="min-w-100px text-center">
                  {intl.formatMessage({ id: "TransitProcedures" })}
                </th>
                <th className="min-w-100px text-center">
                  {intl.formatMessage({ id: "TransitDateAndTime" })}
                </th>
              </tr>
            </thead>

            <tbody className="position-relative">
              
              {checkInList?.map((item: any, index: number) => (
                <tr className="text-center" key={
                  (item?.visitorId ? `visitor-${item.visitorId}` : "") +
                  (item?.permissionCode ? `-code-${item.permissionCode}` : "") +
                  (item?.id ? `-id-${item.id}` : "") +
                  `-idx-${index}`
                }>
                  <td >  {handleTransitionStatus(item?.transitStatus)}  </td>
                  <td>{item?.permissionCode}#</td>
                  <td>{item?.visitorName}</td>
                  <td className="text-center">
                    <div
                      className={`badge ${handlePermissionStatus(item?.permissionStatus)?.className}`}
                    >
                      {intl.formatMessage({
                        id: handlePermissionStatus(item?.permissionStatus)?.value,
                      })}
                    </div>
                  </td>
                  <td>{item?.orgName ? item?.orgName : intl.formatMessage({ id: "NotFound" })}</td>
                  <td>{item?.recivedName ? item?.recivedName : intl.formatMessage({ id: "NotFound" })}</td>
                  <td className="text-center">
                    <div
                      className={`badge ${handleIsTransit(item?.isTransit)?.className}`}
                    >
                      {intl.formatMessage({
                        id: handleIsTransit(item?.isTransit)?.value,
                      })}
                    </div>
                  </td>
                  <td className="d-flex flex-column">
                    <span>
                      {intl.locale === "ar" 
                        ? moment(item?.date).local().locale(intl.locale).format('DD-MM-YYYY')
                        : moment(item?.date).local().locale(intl.locale).format('MM/DD/YYYY')
                      }
                    </span> 
                    <span>
                      {moment(item?.date).local().locale(intl.locale).format('hh:mm A')}
                    </span>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
          <SystemPagination
            totalPages={totalPages}
            totalItems={totalItems}
            pageIndex={pageNamber}
            pageSize={pageSize}
            setPageIndex={setPageNamber}
            setPageSize={setPageSize}
          />
        </div>
      </div> : 
                <div className="d-flex gap-4 justify-content-center align-items-center py-4">
              {intl.formatMessage({ id: "No_data_yet" })}
            </div>
         
        }
       
    </>
  );
};

export default LoginLogoutTable;
