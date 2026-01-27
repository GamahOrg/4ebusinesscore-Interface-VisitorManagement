import React, { FC, useEffect } from 'react'
import { useIntl } from "react-intl";




type ViechleDataProps = {
    register?: any;
    setValue?: any;
    trigger?: any;
    formValues?: any;
    errors?: any;
    DisplayErrorMessage?: any;
  };
const ViechleData: FC<ViechleDataProps> = ({
    register,
    setValue,
    trigger,
    errors,
    DisplayErrorMessage,
    formValues,

}) => {
    const intl = useIntl();

  useEffect(() => {
    setValue?.("stepNumber", 2);
  }, []);
  return (
<>
  <div className="row my-8">

    {/* Car Type */}
    <div className="col-sm-4 col-12 my-6">
      <label className="form-label mx-2 px-2 fw-bold required">
        <span>{intl.formatMessage({ id: "CarType" })}</span>
      </label>
      <div className="input-group mt-1">
        <div className="input-group-prepend">
          <span className="input-group-text">
          <i className="fa-solid fa-layer-group special"></i>
          </span>
        </div>
        <input
          className="form-control form-control-solid"
          placeholder={intl.formatMessage({ id: "CarType" })}
          {...register("CarType")}
        />
         {DisplayErrorMessage(errors?.CarType?.message, intl, intl.locale)}
      </div>
    </div>

    {/* Car Plate Data */}
    <div className="col-sm-4 col-12 my-6">
      <label className="form-label mx-2 px-2 fw-bold required">
        <span>{intl.formatMessage({ id: "CarPlateData" })}</span>
      </label>
      <div className="input-group mt-1">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fas fa-id-card special"></i>
          </span>
        </div>
        <input
          className="form-control form-control-solid"
          placeholder={intl.formatMessage({ id: "CarPlateData" })}
          {...register("CarPlateData")}
        />
         {DisplayErrorMessage(errors?.CarPlateData?.message, intl, intl.locale)}
      </div>
    </div>

    {/* Car Color */}
    <div className="col-sm-4 col-12 my-6">
      <label className="form-label mx-2 px-2 fw-bold required">
        <span>{intl.formatMessage({ id: "CarColor" })}</span>
      </label>
      <div className="input-group mt-1">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fas fa-palette special"></i>
          </span>
        </div>
        <input
          className="form-control form-control-solid"
          placeholder={intl.formatMessage({ id: "CarColor" })}
          {...register("CarColor")}
        />
         {DisplayErrorMessage(errors?.CarColor?.message, intl, intl.locale)}
      </div>

    </div>

    {/* Car Model */}
    <div className="col-sm-4 col-12 my-6">
      <label className="form-label mx-2 px-2 fw-bold">
        <span>{intl.formatMessage({ id: "CarModel" })}</span>
      </label>
      <div className="input-group mt-1">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fas fa-car-side special"></i>
          </span>
        </div>
        <input
          className="form-control form-control-solid"
          placeholder={intl.formatMessage({ id: "CarModel" })}
          {...register("CarModel")}
        />
         {DisplayErrorMessage(errors?.CarModel?.message, intl, intl.locale)}
      </div>
    </div>

    {/* Parking Duration */}
    <div className="col-sm-4 col-12 my-6">
      <label className="form-label mx-2 px-2 fw-bold">
        <span>{intl.formatMessage({ id: "ParkingDuration" })}</span>
      </label>
      <div className="input-group mt-1">
        <div className="input-group-prepend">
          <span className="input-group-text text-muted">
            {/* <i className="fas fa-clock special"></i> */}
            hrs
          </span>
        </div>
        <input
          className="form-control form-control-solid"
          placeholder={intl.formatMessage({ id: "ParkingDuration" })}
          {...register("Duration")}
        />
         {DisplayErrorMessage(errors?.Duration?.message, intl, intl.locale)}
      </div>
    </div>

  </div>
</>

  )
}

export default ViechleData
