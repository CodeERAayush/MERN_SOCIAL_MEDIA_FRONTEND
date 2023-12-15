import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Advertisement
        </Typography>
        <Typography color={medium}>Remove</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://play-lh.googleusercontent.com/GpV4nMdLrrXycnZtHNR_TeBIrc-HXEGw5Uvz7WHJMe0GaJuQcY3wdiqU6Z_91ZarEtd9=w480-h960-rw"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>GupShup- ChatRoom</Typography>
        <Typography color={medium}><a target="_main" href="https://play.google.com/store/apps/details?id=com.mychatroom">App Link</a></Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      The Application Provide A Secure Way To Chat With You Friends and Family.
      Anonymous Chat Feature. 
      Data Doesn't Gets Saved Anywhere So No Headache Of Chat Leak.
      </Typography>
      <Typography variant="sub" color={medium}>© Project By CodeERAayush</Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
