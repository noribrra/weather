import "./App.css";
import {
  Button,
  CircularProgress,
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { fearchweater } from "./features/apiweather/apiweather";

// librrares
import moment from "moment";
import "moment/min/locales.min";
import { useTranslation } from "react-i18next";

const THEME = createTheme({
  typography: {
    fontFamily: `IBM`,
  },
});

function App() {
  let use = useSelector((state) => state.axiosreduser);
  const weather = use.weather;
  const isloding = use.isloding;
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const [time, settinme] = useState("");
  const [locale, setlocal] = useState("ar");
  const [dir, setdir] = useState("rtl");

  function handelclicklanguage() {
    if (locale === "ar") {
      setlocal("en");
      i18n.changeLanguage("en");
      moment.locale("en");
      setdir("ltr");
      settinme(moment().format("MMM Do "));
    } else {
      setlocal("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
      setdir("rtl");
      settinme(moment().format("MMM Do "));
    }
  }

  useEffect(() => {
    settinme(moment().format("MMM Do "));
    dispatch(fearchweater());
    moment.locale("ar");
    i18n.changeLanguage("ar");
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={THEME}>
        <Container maxWidth="sm">
          {/* card */}
          <div
            dir={dir}
            style={{
              background: "#349",
              color: "#fff",
              padding: "10px",
              borderRadius: "15px",
              boxShadow: "0px 11px 1px rgba(0,0,0,0.2)",
            }}
          >
            {/* content */}
            <div>
              {/* city and time */}
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "start",
                  marginRight: "10px",
                }}
                dir={dir}
              >
                <Typography style={{ fontWeight: "600" }} variant="h2">
                  {t("Al Malikea")}
                </Typography>
                <Typography variant="h6" style={{ marginRight: "10px" }}>
                  {time}
                </Typography>
              </div>
              <hr />
              <div
                style={{ display: "flex", justifyContent: "space-around" }}
                id="cloud and main and max"
              >
                {/* digry and descraption */}

                <div>
                  {isloding ? <CircularProgress color="inherit" /> : ""}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    id="temp"
                  >
                    <Typography variant="h1" style={{ textAlign: "right" }}>
                      {weather.temp}
                    </Typography>
                    <img src={weather.icon} alt="" />
                  </div>
                  <Typography variant="h6">{t(weather.description)}</Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                    id="main-and-max"
                  >
                    <h6>
                      {t("min")} : {weather.min_temp}
                    </h6>
                    <h6>
                      {t("max")} : {weather.max_temp}
                    </h6>
                  </div>
                </div>
                <CloudIcon style={{ fontSize: "200px", color: "white" }} />
              </div>
            </div>
            {/* ===content=== */}
          </div>
          {/* === carrd === */}
          <div
            dir={dir}
            style={{
              margin: "20px 0px",
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              onClick={handelclicklanguage}
              style={{ color: "#349" }}
              variant="text"
            >
              {locale === "en" ? "ARABIC" : "انجليزي"}
            </Button>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
