import { FC } from "react";
import { ViewAllcardsCardContent } from "./CardContent";
import { ViewAllcardsAddCardContent } from "./AddCardContent";

const ViewAllcardsAddCard: FC = () => {
  return (
    <>
      <div className="row gy-5">
        <div className="col-md-4">
          <ViewAllcardsCardContent />
        </div>
        <div className="col-md-8">
          <ViewAllcardsAddCardContent />
        </div>
      </div>
    </>
  );
};

export { ViewAllcardsAddCard };
