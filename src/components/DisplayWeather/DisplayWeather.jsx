import React from "react";
import Lottie from "react-lottie";

import { IoLocationOutline } from "react-icons/io5";

import { getAnimationByName, capitalizeFirstLetter } from "../../utils/utils";

const DisplayWeather = ({ currentWeather, setCurrentWeather }) => {
  const { current } = currentWeather;

  const formatter = Intl.DateTimeFormat([], {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    timeZone: currentWeather.timezone,
  });
  const dayFormatter = Intl.DateTimeFormat([], {
    weekday: "long",
    timeZone: currentWeather.timezone,
  });

  return (
    <div className="flex flex-col items-center justify-between bg-gradient-to-br from-[#00feba] to-[#5b548a] text-white w-full md:min-w-[280px] rounded-lg">
      <div className="flex flex-col  gap-2 items-center justify-center">
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-col justify-center items-center">
            <div className="w-[200px] h-[200px] mx-auto">
              <Lottie
                {...getAnimationByName(
                  currentWeather &&
                    currentWeather.current &&
                    currentWeather.current.weather &&
                    currentWeather.current.weather?.length > 0 &&
                    currentWeather.current?.weather[0]?.main
                    ? currentWeather.current.weather[0].main
                    : ""
                )}
              />
            </div>

            <div className="flex text-2xl font-medium">
              {currentWeather &&
              currentWeather.current &&
              currentWeather.current.weather &&
              currentWeather.current.weather?.length > 0 &&
              currentWeather.current?.weather[0]?.description
                ? capitalizeFirstLetter(
                    currentWeather.current?.weather[0]?.description
                  )
                : ""}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h1 className="flex text-8xl font-bold">
              <span>
                {currentWeather?.current?.temp
                  ? Math.floor(currentWeather.current.temp)
                  : ""}
              </span>
              <span className="text-4xl">&deg;C</span>
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pb-4">
          <p className="text-3xl flex font-semibold text-[#19202d] py-4">
            <IoLocationOutline /> {currentWeather.city}
          </p>
          <div className="h-[1px] w-full my-2 bg-[#3B435E]"></div>
          <div className="text-2xl">
            {current?.dt
              ? dayFormatter.format(new Date(current.dt * 1000))
              : "-"}
            ,{" "}
            <span>
              {current?.dt
                ? formatter.format(new Date(current.dt * 1000))
                : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayWeather;
