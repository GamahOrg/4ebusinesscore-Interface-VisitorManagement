import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { FC, useState } from "react";
import { useIntl } from "react-intl";

interface ViechleDataGroupProps {
  register?: any;
  setValue?: any;
  trigger?: any;
  errors?: any;
  parkingArray?: any;
  setParkingArray?: any;
  formValues?: any;
  visitors?:any;
}

const ViechleDataGroup: FC<ViechleDataGroupProps> = ({
  register,
  setValue,
  trigger,
  errors,
  parkingArray,
  setParkingArray,
  formValues,
  visitors,
}) => {
  const intl = useIntl();
  const [localParkingArray, setLocalParkingArray] = useState(parkingArray || []);
  const [parkingCount, setParkingCount] = useState<number | null>(null);
  const updateParkingForms = (count: number) => {
    const newArray = Array.from({ length: count }, (_, idx) => ({
      CarType: localParkingArray[idx]?.CarType || "",
      CarPlateData: localParkingArray[idx]?.CarPlateData || "",
      CarColor: localParkingArray[idx]?.CarColor || "",
      CarModel: localParkingArray[idx]?.CarModel || "",
      ParkingDuration: localParkingArray[idx]?.ParkingDuration || "",
    }));
    setLocalParkingArray(newArray);
    setParkingArray(newArray);
  };
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedArray = [...localParkingArray];
    updatedArray[index][field] = value;
    setLocalParkingArray(updatedArray);
    setParkingArray(updatedArray);
  };
 
  return (
    <>
      <div className="row my-8">
        <div className="col-12 my-6">
          <label className="form-label mx-2 px-2 fw-bold">
            <span>{intl.formatMessage({ id: "NumberOfParking" })}</span>
          </label>
<input
  type="text"
  className="form-control form-control-solid"
  placeholder={intl.formatMessage({ id: "NumberOfParking" })}
  value={parkingCount ?? ""}
  onChange={(e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      setParkingCount(null);
      return;
    }
    if (value > (visitors?.length ?? 0)) {
      showSuccessAlert(false, "youCanNotHaveMoreCarsThanVisitors", intl);
      return;
    }
    setParkingCount(value);
    updateParkingForms(value);
  }}
/>
        </div>

        {localParkingArray.map((entry: any, index: number) => (
          <div key={index} className="col-12 my-6 d-flex align-items-center">

<span className="badge bg-success fs-2 p-3 d-flex align-items-center justify-content-center w-30px mx-3">
             {index + 1}
          </span>
            <div className="row">
              {/* Car Type */}
              <div className="col-sm-4 col-12 my-6">
                <label className="form-label mx-2 px-2 fw-bold required">
                  <span>{intl.formatMessage({ id: "CarType" })}</span>
                </label>
                <input
                  className="form-control form-control-solid"
                  placeholder={intl.formatMessage({ id: "CarType" })}
                  value={entry.CarType}
                  onChange={(e) => handleInputChange(index, "CarType", e.target.value)}
                />
              </div>
              {/* Car Plate Data */}
              <div className="col-sm-4 col-12 my-6">
                <label className="form-label mx-2 px-2 fw-bold required">
                  <span>{intl.formatMessage({ id: "CarPlateData" })}</span>
                </label>
                <input
                  className="form-control form-control-solid"
                  placeholder={intl.formatMessage({ id: "CarPlateData" })}
                  value={entry.CarPlateData}
                  onChange={(e) => handleInputChange(index, "CarPlateData", e.target.value)}
                />
              </div>
              {/* Car Color */}
              <div className="col-sm-4 col-12 my-6">
                <label className="form-label mx-2 px-2 fw-bold required">
                  <span>{intl.formatMessage({ id: "CarColor" })}</span>
                </label>
                <input
                  className="form-control form-control-solid"
                  placeholder={intl.formatMessage({ id: "CarColor" })}
                  value={entry.CarColor}
                  onChange={(e) => handleInputChange(index, "CarColor", e.target.value)}
                />
              </div>
              {/* Car Model */}
              <div className="col-sm-4 col-12 my-6">
                <label className="form-label mx-2 px-2 fw-bold">
                  <span>{intl.formatMessage({ id: "CarModel" })}</span>
                </label>
                <input
                  className="form-control form-control-solid"
                  placeholder={intl.formatMessage({ id: "CarModel" })}
                  value={entry.CarModel}
                  onChange={(e) => handleInputChange(index, "CarModel", e.target.value)}
                />
              </div>

              {/* Parking Duration */}
              <div className="col-sm-4 col-12 my-6">
                <label className="form-label mx-2 px-2 fw-bold">
                  <span>{intl.formatMessage({ id: "ParkingDuration" })}</span>
                </label>
                 <div className="input-group mt-1">
                  <div className="input-group-prepend">
                  <span className="input-group-text text-muted">hrs
                   </span>
          </div>
          <input
                    className="form-control form-control-solid"
                    placeholder={intl.formatMessage({ id: "ParkingDuration" })}
                    value={entry.ParkingDuration}
                    onChange={(e) => handleInputChange(index, "ParkingDuration", e.target.value)}
                  />
         </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViechleDataGroup;
