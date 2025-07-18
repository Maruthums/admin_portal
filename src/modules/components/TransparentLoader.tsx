import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
interface IProps {
  fixedHeight?: string;
  zIndex?: number;
}

const TransparentLoader = (props: IProps) => {
  return (
    <Backdrop
      sx={{
        height: props.fixedHeight ? props.fixedHeight : "100vh",
        color: "#fff",
        zIndex: props?.zIndex ? props?.zIndex : 100,
      }}
      open={true}
      onClick={() => {
        return;
      }}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default TransparentLoader;
