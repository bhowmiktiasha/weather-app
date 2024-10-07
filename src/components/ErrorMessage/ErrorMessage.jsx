import React from "react";

const ErrorMessage = ({ geoApiErrorMessage, weatherApiErrorMessage }) => {
  return (
    <>
      {(geoApiErrorMessage || weatherApiErrorMessage) && (
        <div className="my-6 w-full bg-gray-800 items-center rounded-md p-3">
          {weatherApiErrorMessage && (
            <p className="">
              <span className="text-red-500 text-2xl font-bold">Error:</span>
              <span className="text-base pl-4 text-white">
                {weatherApiErrorMessage}
              </span>
            </p>
          )}

          {geoApiErrorMessage && (
            <div className="flex flex-col gap-2">
              <p className="">
                <span className="text-red-500 text-2xl font-bold">Error:</span>
                <span className="text-base pl-4 text-white">
                  {geoApiErrorMessage}
                </span>
              </p>
              <p className="pt-4">
                <span className="text-green-500 text-2xl font-bold">
                  Suggestion:
                </span>
                <span className="text-base pl-4 text-white">
                  Press the search button to retrieve weather details for the
                  city you entered in the input box.
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
