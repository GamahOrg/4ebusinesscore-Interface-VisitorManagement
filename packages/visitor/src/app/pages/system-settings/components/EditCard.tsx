import { FC } from "react";
import { useIntl } from "react-intl";
import { ViewAllcardsCardContent } from "./CardContent";
import { ViewAllcardsEditCardContent } from "./EditCardContent";

const ViewAllcardsEditCard: FC = () => {
  const intl = useIntl();
  return (
    <>
      <div className="row gy-5">
        <div className="col-md-4">
          <ViewAllcardsCardContent />
        </div>
        <div className="col-md-8">
          <ViewAllcardsEditCardContent />
        </div>
      </div>
    </>
  );
};

export { ViewAllcardsEditCard };
