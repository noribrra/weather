import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fearchweater = createAsyncThunk("weater-api", async () => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=37.06782&lon=42.20226&appid=20da7496931a7bb17dce22eb3dbd7fc2",
    {
      //   cancelToken: new axios.CancelToken((c) => {
      //     cancelaxios = c;
      //   }),
    }
  );
  const temp = Math.round(response.data.main.temp - 272.15);
  const min_temp = Math.round(response.data.main.temp_min - 272.15);
  const max_temp = Math.round(response.data.main.temp_max - 272.15);
  const description = response.data.weather[0].description;
  const icon = response.data.weather[0].icon;

  return {
    temp,
    min_temp,
    max_temp,
    description,
    icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
  };
});

export const weathergit = createSlice({
  name: "weatherapi",
  initialState: {
    weather: {
      temp: "",
      min_temp: "",
      max_temp: "",
      description: "",
      icon: "",
    },
    isloding: false,
  },

  extraReducers(builder) {
    builder
      .addCase(fearchweater.pending, (state, action) => {
        state.isloding = true;
      })
      .addCase(fearchweater.fulfilled, (state, action) => {
        state.weather = action.payload;
        state.isloding = false;
      });
  },
});

export default weathergit.reducer;
