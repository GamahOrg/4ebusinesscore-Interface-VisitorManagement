import { Fragment } from "react";
import "./Style.css";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useIntl } from "react-intl";

type props = {
  steps: any;
  currentStep: any;
  setCurrentStep: any;
  changeIcon?: boolean;
  visitors?: any;
  handleNextInStepper?: boolean;
  handleNextIndividual?: any;
};
const Stepper = ({
  steps,
  currentStep,
  setCurrentStep,
  changeIcon = true,
  visitors,
  handleNextInStepper = false,
  handleNextIndividual,
}: props) => {
  const intl = useIntl();

  const handleNext = (index: number) => {
    if (visitors?.length == 0) {
      showSuccessAlert(false, "YouMustEnterAtLeastOneVisitor", intl);
      return;
    } else {
      setCurrentStep(index);
    }
  };

  return (
    <div className="stepper justify-content-center mb-5">
      {steps?.map((step: any, index: number) => (
        <Fragment key={step?.id}>
          {index > 0 && (
            <div
              className={`line ${currentStep >= index ? "active" : ""}`}
            ></div>
          )}
          <div
            onClick={async (e) => {
              if (handleNextInStepper || handleNextIndividual) {
                if (handleNextInStepper) handleNext(index);
                if (handleNextIndividual) {
                  if (await handleNextIndividual()) setCurrentStep(index);
                  e.preventDefault();
                }
              } else setCurrentStep(index);
            }}
            key={index}
            className={`step ${
              currentStep >= index ? "active" : ""
            } d-flex flex-column justify-content-center position-relative cursor-pointer`}
          >
            <div
              className={`step-circle ${currentStep >= index ? "active" : ""}`}
            >
              {currentStep > index && changeIcon ? (
                <i className="fa-solid fa-check text-white fs-3"></i>
              ) : (
                step?.icon
              )}
            </div>
            <b
              className="mt-3 position-absolute top-100"
              style={{
                minWidth: "114px",
                textAlign: "center",
              }}
            >
              {step?.name}
            </b>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Stepper;
