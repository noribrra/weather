import "./App.css";
import {
  Button,
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { useEffect, useState } from "react";

// librrares
import axios from "axios";
import moment from "moment";
import "moment/min/locales.min";
import { useTranslation } from "react-i18next";

const THEME = createTheme({
  typography: {
    fontFamily: `IBM`,
  },
});

function App() {
  const { t, i18n } = useTranslation();
  const [weather, serweather] = useState({
    temp: "",
    min_temp: "",
    max_temp: "",
    description: "",
    icon: "",
  });
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
    moment.locale("ar");
    i18n.changeLanguage("ar");
  }, []);
  useEffect(() => {
    settinme(moment().format("MMM Do "));

    let cancelaxios = null;
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=37.06782&lon=42.20226&appid=20da7496931a7bb17dce22eb3dbd7fc2",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelaxios = c;
          }),
        }
      )
      .then(function (response) {
        const temp = Math.round(response.data.main.temp - 272.15);
        const min_temp = Math.round(response.data.main.temp_min - 272.15);
        const max_temp = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;

        serweather({
          temp,
          min_temp,
          max_temp,
          description,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      cancelaxios();
    };
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
