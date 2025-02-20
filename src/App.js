import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
const data = [
  {
    id: 1,
    title: "Bret Foudray - Premier Automotive | LinkedIn",
    link: "https://www.linkedin.com/in/bret-foudray-9b246632",
    htmlTitle: "Bret Foudray - Premier <b>Automotive</b> | LinkedIn",
    displayLink: "www.linkedin.com",
    htmlSnippet:
      "Premier <b>Automotive</b> - WP Carey School of Business â€“ Arizona State University About I have built a successful and well-rounded <b>automotive</b> career taking bad&nbsp;...",
  },
  {
    id: 2,
    title: "Jeremiah Weaver - COO and General Manager - Automotive ...",
    link: "https://www.linkedin.com/in/jeremiah-weaver-56663299",
    htmlTitle:
      "Jeremiah Weaver - <b>COO</b> and General Manager - <b>Automotive</b> ...",
    displayLink: "www.linkedin.com",
    htmlSnippet:
      "... <b>Automotive</b> Designs and Fabrication, I work to lead our motivated and skilled ... Experience. <b>Automotive</b> Designs &amp;amp; Fabrication Graphic. <b>COO</b> and General Manager.",
  },
  {
    id: 3,
    title: "Terry L Karges Sr - Petersen Automotive Museum | LinkedIn",
    link: "https://www.linkedin.com/in/terry-l-karges-sr-64029415",
    htmlTitle:
      "Terry L Karges Sr - Petersen <b>Automotive</b> Museum | LinkedIn",
    displayLink: "www.linkedin.com",
    htmlSnippet:
      "Dec 8, 2016 <b>...</b> Experience: Petersen <b>Automotive</b> Museum Â· Location: Los Angeles Â· 500+ connections on LinkedIn. View Terry L Karges Sr&#39;s profile on LinkedIn,&nbsp;...",
  },
  {
    id: 4,
    title: "John Cavanaugh - CFO - Automotive Credit Corp | LinkedIn",
    link: "https://www.linkedin.com/in/john-cavanaugh-896b87a",
    htmlTitle:
      "John Cavanaugh - <b>CFO</b> - <b>Automotive</b> Credit Corp | LinkedIn",
    displayLink: "www.linkedin.com",
    htmlSnippet:
      "<b>CFO</b> at <b>Automotive</b> Credit Corp Â· Experience: <b>Automotive</b> Credit Corp Â· Location: Northville Â· 500+ connections on LinkedIn. View John Cavanaugh&#39;s profile on&nbsp;...",
  },
  {
    id: 5,
    title: "John Bozzella - Alliance For Automotive Innovation | LinkedIn",
    link: "https://www.linkedin.com/in/john-bozzella",
    htmlTitle:
      "John Bozzella - Alliance For <b>Automotive</b> Innovation | LinkedIn",
    displayLink: "www.linkedin.com",
    htmlSnippet:
      "John Bozzella, a veteran auto industry <b>executive</b> and policy leader, is the president andâ€¦ Â· Experience: Alliance For <b>Automotive</b> Innovation Â· Education:&nbsp;...",
  },
  {
    id: 6,
    title: "Lubomir Stanislavov - CEO - Automotive Cluster Bulgaria | LinkedIn",
    link: "https://bg.linkedin.com/in/lubomir-stanislavov-7313b611",
    htmlTitle:
      "Lubomir Stanislavov - <b>CEO</b> - <b>Automotive</b> Cluster Bulgaria | LinkedIn",
    displayLink: "bg.linkedin.com",
    htmlSnippet:
      "<b>CEO</b> at <b>Automotive</b> Cluster Bulgaria Â· Experience: <b>Automotive</b> Cluster Bulgaria Â· Education: University of Architecture, Civil Engineering and Geodesy, Sofia,&nbsp;...",
  },
  {
    id: 7,
    title: "Scott LeTourneau - Cox Automotive Inc. | LinkedIn",
    link: "https://www.linkedin.com/in/sletourneau",
    htmlTitle: "Scott LeTourneau - Cox <b>Automotive</b> Inc. | LinkedIn",
    displayLink: "www.linkedin.com",
    htmlSnippet:
      "Specialties: Corporate strategy, mergers, acquisitions, divestitures, strategicâ€¦ Â· Experience: Cox <b>Automotive</b> Inc. Â· Education: University of Virginia&nbsp;...",
  },
  {
    id: 8,
    title: "Judy Curran - ANSYS, Inc. | LinkedIn",
    link: "https://www.linkedin.com/in/judycurran",
    htmlTitle: "Judy Curran - ANSYS, Inc. | LinkedIn",
    displayLink: "www.linkedin.com",
    htmlSnippet:
      "<b>Executive</b> Board Member. Inforum <b>Automotive</b> Next. Oct 2014 - Oct 2017 3 years 1 month. Patents. Air fuel ratio feedback control. Issued November 1, 1994 US&nbsp;...",
  },
  {
    id: 9,
    title: "Logan Pitts - AGS Company Automotive Solutions | LinkedIn",
    link: "https://www.linkedin.com/in/logan-pitts-5598697",
    htmlTitle:
      "nLogan Pitts - AGS Company <b>Automotive</b> Solutions | LinkedIn",
    displayLink: "www.linkedin.com",
    htmlSnippet:
      "Experience: AGS Company <b>Automotive</b> Solutions Â· Location: Muskegon Â· 443 connections on LinkedIn. View Logan Pitts&#39; profile on LinkedIn, a professional&nbsp;...",
  },
  {
    id: 10,
    title: "Ben Burton - Executive General Manager - Dick Smith Automotive ...",
    link: "https://www.linkedin.com/in/brian-mcculley-72596920",
    htmlTitle:
      "Ben Burton - <b>Executive</b> General Manager - Dick Smith <b>Automotive</b> ...",
    displayLink: "www.linkedin.com",
    htmlSnippet:
      "<b>Executive</b> Manager: Flow Audi of Winston-Salem, Flow Acura of Winston-Salem ... <b>Automotive</b> Companies Â· Education: Duke University Â· Location: Winston&nbsp;...",
  },
];
const App = () => {
  const gitAgentbuttonref = useRef(null);
  const switchValue =
    localStorage.getItem("git_status") === "Running" ? true : false;
  const [gitAgentShow, setGitAgentShow] = useState(false);
  const [isOn, setIsOn] = useState(switchValue || false);
  const [query, setQuery] = useState(localStorage.getItem("query") || "");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function inside useEffect
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
  console.log(apiData);
  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleStartOrStop = async () => {
    const formData = {
      cmd: !isOn ? "start" : "stop",
      query: query,
    };

    console.log("Sending Data:", formData);

    try {
      const response = await axios.post(
        "https://your-api-endpoint.com/action",
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
        <div className="relative">
          {/* Status Indicator */}
          <div
            className={`w-3 h-3 rounded-full absolute right-0 top-0 transform translate-x-1 -translate-y-1 ${
              isOn ? "bg-green-400" : "bg-red-500"
            }`}
          ></div>

          {/* Git Agent Button */}
          <div
            onClick={() => setGitAgentShow(!gitAgentShow)}
            className="uppercase bg-white text-blue-600 select-none cursor-pointer text-xs font-semibold border rounded-full w-8 h-8 flex justify-center items-center shadow-md hover:bg-gray-200 transition-all"
          >
            GA
          </div>

          {/* Git Agent Dropdown */}
          {gitAgentShow && (
            <div
              ref={gitAgentbuttonref}
              className="border p-4 rounded-lg text-xs absolute bg-white text-gray-700 shadow-xl right-2 top-12 w-80 font-inter flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">
                  {localStorage.getItem("git_status") || "Stopped"}
                </span>
                {/* Toggle Switch */}
                <div className="flex items-center space-x-2">
                  <button
                    disabled={!query}
                    onClick={() => {
                      setIsOn(!isOn);
                      handleStartOrStop();
                    }}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      isOn ? "bg-green-400" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                        isOn ? "translate-x-6" : "translate-x-0"
                      }`}
                    ></span>
                  </button>
                  <span
                    className={`text-sm font-semibold ${
                      isOn ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {isOn ? "ON" : "OFF"}
                  </span>
                </div>
              </div>

              {/* Query Input */}
              <textarea
                rows={5}
                value={query || ""}
                type="text"
                placeholder="Enter Project / POC details"
                className="border outline-none px-3 py-2 w-full h-10 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      {/* Table Section */}
      {loading ? (
        "Loading..."
      ) : (
        <div className="overflow-x-auto py-6">
          <div className="flex justify-end ">
            {" "}
            <button
              disabled={selectedItems?.length <= 0}
              className=" bg-gradient-to-r from-blue-900 to-cyan-500 disabled:bg-gradient-to-r disabled:from-blue-400 disabled:to-cyan-300 text-white px-4 py-2  rounded-lg"
            >
              Send Email
            </button>
          </div>
          <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-gray-800 to-gray-600 text-white uppercase text-xs  tracking-wide shadow-md">
              <tr>
                <th className="border px-4 py-3 text-center w-[110px]">
                  {" "}
                  <button onClick={handleSelectAll} className="">
                    {selectAll ? "Unselect All" : "Select All"}
                  </button>
                </th>
                <th className="border px-4 py-3 text-left">ID</th>
                <th className="border px-4 py-3 text-left">Title</th>
                <th className="border px-4 py-3 text-left">Link</th>
                <th className="border px-4 py-3 text-left">HTML Title</th>
                <th className="border px-4 py-3 text-left">Display Link</th>
                <th className="border px-4 py-3 text-left ">htmlSnippet</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  } hover:bg-cyan-100 transition-colors `}
                >
                  <td className="border px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
                  <td className="border px-4 py-3">{item.id}</td>
                  <td className="border px-4 py-3">{item.title}</td>
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
                    className="border px-4 py-3"
                    dangerouslySetInnerHTML={{ __html: item.htmlTitle }}
                  ></td>
                  <td className="border px-4 py-3 text-blue-600 underline">
                    <a
                      href={item.displayLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.displayLink}
                    </a>
                  </td>
                  <td
                    className="border px-4 py-3"
                    dangerouslySetInnerHTML={{ __html: item.htmlSnippet }}
                  ></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
