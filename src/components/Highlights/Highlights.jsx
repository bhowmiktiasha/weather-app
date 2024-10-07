import React from "react";
import Card from "./Card";

function Highlights({ weather }) {
  const { current } = weather;
  const formatter = Intl.DateTimeFormat([], {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    timeZone: weather.timezone,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-wrap justify-around gap-4">
      <Card className="h-card  rounded-xl min-w-[170px] items-center p-12 flex flex-col justify-between">
        <div className="mb-2">Humidity</div>
        <img src="/weather_icons/humidity.png" width={100} alt="" />
        <div className="flex items-end mt-2">
          <h1 className="text-5xl">{current?.humidity || "-"}</h1>
          <span className="text-[#7f7f7f] mb-1 ml-1">%</span>
        </div>
      </Card>

      <Card className="h-card  rounded-xl min-w-[170px] items-center p-12 flex flex-col justify-between">
        <div className="mb-2">Wind Speed</div>
        <img
          src={`/weather_icons/wind-night.png`}
          width={100}
          alt="wind icon"
        />
        <div className="flex items-end mt-2">
          <h1 className="text-5xl">
            {current?.wind_speed ? current.wind_speed.toFixed(1) : "-"}
          </h1>
          <span className="text-[#7f7f7f] mb-1 ml-1">m/s</span>
        </div>
      </Card>

      <Card className="h-card  rounded-xl min-w-[170px] items-center p-12 flex flex-col justify-between justify-evenly">
        <div className="flex items-center">
          <img src="/weather_icons/sunrise.png" width={50} alt="" />
          <div className="flex flex-col ml-2 text-2xl">
            {current?.sunrise
              ? formatter.format(new Date(current.sunrise * 1000))
              : "-"}

            <span className="text-xl text-[#7f7f7f]">Sunrise</span>
          </div>
        </div>
        <div className="flex items-center">
          <img src="/weather_icons/sunset.png" width={50} alt="" />
          <div className="flex flex-col ml-2 text-2xl">
            {current?.sunset
              ? formatter.format(new Date(current.sunset * 1000))
              : "-"}
            <span className="text-xl text-[#7f7f7f]">Sunset</span>
          </div>
        </div>
      </Card>

      <Card className="h-card  rounded-xl min-w-[170px] items-center p-12 flex flex-col justify-between">
        <div className="mb-2">Clouds</div>
        <img src="/weather_icons/clouds.png" width={100} alt="" />

        <div className="flex items-end mt-2">
          <h1 className="text-5xl">
            {" "}
            {current?.clouds ? current.clouds : "-"}
          </h1>
          <span className="text-[#7f7f7f] mb-1 ml-1">%</span>
        </div>
      </Card>

      <Card className="h-card  rounded-xl min-w-[170px] items-center p-12 flex flex-col justify-between">
        <div className="mb-2">UV Index</div>
        <img src="/weather_icons/uv.png" width={100} alt="" />
        <h1 className="text-5xl">
          {current?.uvi || current?.uvi === 0 ? current.uvi : "-"}
        </h1>
      </Card>

      <Card className="h-card  rounded-xl min-w-[170px] items-center p-12 flex flex-col justify-between">
        <div className="mb-2">Pressure</div>
        <img src="/weather_icons/pressure.png" width={100} alt="" />

        <div className="flex items-end mt-2">
          <h1 className="text-5xl">
            {current?.pressure ? current.pressure : "-"}
          </h1>
          <span className="text-[#7f7f7f] mb-1 ml-1">hPa</span>
        </div>
      </Card>
    </div>
  );
}

export default Highlights;
