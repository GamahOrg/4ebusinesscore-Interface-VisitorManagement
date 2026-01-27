import { FC } from "react";
import { ToggleMyFavoriteDrawer } from "./my-favorite/ToggleMyFavoriteDrawer";
import { MyFavoriteDrawer } from "./my-favorite/MyFavoriteDrawer";
import { useIntl } from "react-intl";
import {ToolsBoxToggleDrawer} from "./tools-box/ToolsBoxToggleDrawer";

const RightToolbar: FC<any> = () => {
  const { locale } = useIntl();

  return (
    <>
      <div
        style={{
          left: locale == "ar" ? "0%" : "",
          right: locale == "en" ? "0%" : "",
          zIndex: 99,
        }}
        className={`engage-toolbar d-flex position-fixed px-5 fw-bolder  top-50 transform-90 mt-20 gap-2`}
      >
        <ToolsBoxToggleDrawer />
        {/* <ToolsBoxDrawer
          removeFromCardList={removeFromCardList}
          removeFromTableList={removeFromTableList}
        /> */}
        <ToggleMyFavoriteDrawer />
      </div>

      {/* <ToolsBoxDrawer removeFromCardList={removeFromCardList} removeFromTableList={removeFromTableList} /> */}
      {/* <MyFavoriteDrawer /> */}
    </>
  );
};

export { RightToolbar };
