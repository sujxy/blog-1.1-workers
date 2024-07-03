import { useState } from "react";
import "./App.css";
import axios from "axios";

const backend_url = "https://test.devsujay.workers.dev/api/v1/auth";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);

  const handleLogin = async () => {
    const body = {
      name: username,
      email: email,
      password: password,
    };
    const { data } = await axios.post(backend_url, body);
    if (data.message && data.data) {
      setUserData(data.data);
    } else {
      return;
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      {!userData ? (
        <div className="border max-sm:w-1/2 w-1/4 rounded-md p-3 flex flex-col  gap-1">
          <span className="flex items-center gap-2 py-2">
            <img
              className="w-8 h-8 "
              src={"https://hono.dev/images/logo-small.png"}
            />
            <h1 className="font-semibold text-2xl">Signin</h1>
          </span>
          <input
            type="text"
            className=" border border-gray-200 my-1 outline-none rounded-md px-2 py-1 text-gray-600"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            className=" border border-gray-200 my-1 outline-none rounded-md px-2 py-1 text-gray-600"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className=" border border-gray-200 my-1 outline-none rounded-md px-2 py-1 text-gray-600"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-black border border-gray-200 my-1  rounded-md px-2 py-1 text-white font-semibold"
            onClick={handleLogin}
          >
            Go to app
          </button>
        </div>
      ) : (
        <div className="border max-sm:w-3/4 w-1/3 rounded-md  flex flex-col  gap-1">
          <span className="flex p-3 border-b items-center justify-between gap-2 py-2">
            <h1 className="font-semibold text-2xl">👋 {userData?.name}</h1>
            <p className="text-md text-gray-400">{userData?.email}</p>
          </span>
          <p className="text-md text-gray-400 p-3">
            This is an example application showing backend development using
            cloudflare workers with Hono from my{" "}
            <a
              className="underline text-violet-600"
              href="https://dumb-dev.onrender.com/"
            >
              blog
            </a>
            .
          </p>
          <p className="text-xs sm:text-sm border m-3 bg-gray-50 rounded-lg text-gray-500 p-2">
            This component displays data received from workers after successfull
            auth fetched from our database,all on the edge!
          </p>
          <span className="text-sm flex items-center gap-1 justify-center text-center text-white p-3 bg-gray-900 rounded-b-md">
            <img src={"/githubicon.png"} className="w-5 h-5 rounded-full " />
            <a className="underline " href="https://github.com/sujxy">
              Connect with me
            </a>
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
