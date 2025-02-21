import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const App = () => {
  const gitAgentbuttonref = useRef(null);
  const switchValue =
    localStorage.getItem("git_status") === "Running" ? true : false;
  const [gitAgentShow, setGitAgentShow] = useState(false);
  const [isOn, setIsOn] = useState(switchValue || false);
  const [query, setQuery] = useState(localStorage.getItem("query") || "");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCheckboxChange = (item) => {
    setSelectedItem(item); // Set the selected item to the current ID, unselecting others
  };
  console.log(selectedItem);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailIsOpen, setEmailIsOpen] = useState(false);
  const [responseSendMessageData, setResponseSendMessageData] = useState({});
  console.log(responseSendMessageData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stagingapi.jivahire.com/api/results/"
        );
        setApiData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  //  `https://utilities.jivahire.com/service5/generate-marketing-pitch/?x_api_key=ZBFezMmBuh2pkEXttdz6SwOeMgGGsG2b`
  const handleSendMessage = async () => {
    const formData = {
      project_details: selectedItem?.project_details,
      industry_type: selectedItem?.industries,
      prospect_name: selectedItem?.title,
    };
    try {
      const response = await axios.post(
        `https://stagingapi.jivahire.com/api/insight_generate/`,
        formData
      );

      if (response?.data?.success) {
        // toast.success(response?.data?.message);
        setResponseSendMessageData(response?.data);
        setEmailIsOpen(true);
      } else {
        toast.error(response?.data?.message || "An error occurred");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Network error");
    }
  };

  const handleStartOrStop = async () => {
    const formData = {
      // cmd: !isOn ? "start" : "stop",
      query: query,
    };

    console.log("Sending Data:", formData);

    try {
      const response = await axios.post(
        "https://stagingapi.jivahire.com/api/fetch/",
        formData
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        localStorage.setItem("git_status", response?.data?.status);
        localStorage.setItem("query", query);
      } else {
        toast.error(response?.data?.message || "An error occurred");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Network error");
    }
  };
  return (
    <div className=" p-4 text-sm font-sans">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-cyan-500 text-white p-5 rounded-lg shadow-lg flex justify-between items-center">
        <h1 className="text-lg font-bold tracking-wide">
          🌟 Lead Generation Agent
        </h1>
      </div>

      <div className="flex justify-between items-center gap-2">
        <div className="relative mt-2">
          {/* Status Indicator */}

          {/* Git Agent Button */}
          <button
            onClick={() => setGitAgentShow(!gitAgentShow)}
            className=" bg-gradient-to-r from-blue-900 to-cyan-500 disabled:bg-gradient-to-r disabled:from-blue-400 disabled:to-cyan-300 text-white px-4 py-2  rounded-lg"
          >
            Input Query
          </button>
          {/* Git Agent Dropdown */}

          {gitAgentShow && (
            <div
              ref={gitAgentbuttonref}
              className="border p-4 rounded-lg text-xs absolute bg-white text-gray-700 shadow-xl left-2 top-12 w-[600px] h-[300px] font-inter flex flex-col gap-2"
            >
              {/* Query Input */}
              <div>Input Query</div>
              <textarea
                rows={15}
                value={query || ""}
                type="text"
                placeholder="Enter Project / POC details"
                className="border outline-none px-3 py-2 w-full  rounded-lg text-gray-700 h-full"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="bg-blue-400 text-white px-4 py-2 rounded-lg"
                onClick={() => handleStartOrStop()}
                disabled={!query}
              >
                Search Query
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          {" "}
          <button
            onClick={() => handleSendMessage()}
            disabled={selectedItem?.length <= 0}
            className=" bg-gradient-to-r from-blue-900 to-cyan-500 disabled:bg-gradient-to-r disabled:from-blue-400 disabled:to-cyan-300 text-white px-4 py-2  rounded-lg"
          >
            Send Message
          </button>
          <button
            // onClick={() => setEmailIsOpen(true)}
            disabled={selectedItem?.length <= 0}
            className=" bg-gradient-to-r from-blue-900 to-cyan-500 disabled:bg-gradient-to-r disabled:from-blue-400 disabled:to-cyan-300 text-white px-4 py-2  rounded-lg"
          >
            Send Email
          </button>
        </div>
      </div>
      {/* Table Section */}
      {loading ? (
        "Loading..."
      ) : (
        <div className="overflow-x-auto py-6">
          <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-gray-800 to-gray-600 text-white uppercase text-xs  tracking-wide shadow-md">
              <tr>
                <th className="border px-4 py-3 text-center w-[110px]">
                  Select
                </th>
                <th className="border px-4 py-3 text-center">S.No</th>
                <th className="border px-4 py-3 text-center">Title</th>
                <th className="border px-4 py-3 text-center">Link</th>
                <th className="border px-4 py-3 text-center ">Snippet</th>
              </tr>
            </thead>
            <tbody>
              {apiData?.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  } hover:bg-cyan-100 transition-colors `}
                >
                  <td className="border px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedItem === item}
                      onChange={() => handleCheckboxChange(item)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="border px-4 py-3 text-center">{index + 1}</td>

                  <td className="border px-4 py-3">
                    {" "}
                    <div className=" flex gap-4">
                      <div className="min-w-10 minh-10 w-10 h-10 rounded-md">
                        <img
                          className="w-full h-full"
                          src={item?.image_url}
                          alt="logo"
                        />
                      </div>
                      <div className="font-semibold "> {item.title}</div>
                    </div>
                  </td>
                  <td className="border px-4 py-3 text-blue-600 underline">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.link}
                    </a>
                  </td>
                  <td
                    className="border px-4 py-3 "
                    dangerouslySetInnerHTML={{ __html: item.snippet }}
                  ></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {emailIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 font-inter">
          <div className="bg-white  rounded-md shadow-lg max-w-xl w-full ">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center gap-2 w-full border-b p-4">
                <strong>Customised Linkedin Message</strong>
                <div
                  className="cursor-pointer w-4 h-4"
                  onClick={() => setEmailIsOpen(false)}
                >
                  X
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4">
                <div>
                  <strong>Subject</strong>
                  <div className="border rounded-lg p-4 ">
                    {" "}
                    {responseSendMessageData?.data?.subject}
                  </div>
                </div>
                <div>
                  <strong>Body</strong>
                  <div className="border rounded-lg p-4 ">
                    {" "}
                    {responseSendMessageData?.data?.body}
                  </div>
                </div>
                {/* <div>
                  <strong>Message</strong>
                  <div className="border rounded-lg p-4 ">
                    {" "}
                    {responseSendMessageData?.data?.message}
                  </div>
                </div> */}
                <button
                  disabled
                  className=" bg-gradient-to-r from-blue-900 to-cyan-500 disabled:bg-gradient-to-r disabled:from-blue-400 disabled:to-cyan-300 text-white px-4 py-2  rounded-lg"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
