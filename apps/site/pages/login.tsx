import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import GithubIcon from "mdi-react/GithubIcon";
import { UserContext } from '../contexts/user.context';


export default function Login() {
  const router = useRouter();
  const { isLoggedIn, setUser, setIsLoggedIn } = useContext(UserContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const clientId = 'a6fef03c17dbd729d9ac';
  const redirectUri = 'https://5969-185-228-154-74.eu.ngrok.io/login';

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        code: newUrl[1]
      };

      // const proxy_url = state.proxy_url;

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch('localhost:3333/graphql', {
        method: "POST",
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          setUser(data);
          setIsLoggedIn(true);
        })
        .catch(error => {
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed"
          });
        });
    }
  }, [data, setIsLoggedIn, setUser]);

  if (isLoggedIn) {
    router.push("/");
  }

  return (
    <section className="container">
      <div>
        <h1>Welcome</h1>
        <span>Super amazing app</span>
        <span>{data.errorMessage}</span>
        <div className="login-container">
          {data.isLoading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {
                // Link to request GitHub access
              }
              <a
                className="login-link"
                href={`https://github.com/login/oauth/authorize?scope=email&client_id=${clientId}&redirect_uri=${redirectUri}`}
                onClick={() => {
                  setData({ ...data, errorMessage: "" });
                }}
              >
                <GithubIcon />
                <span>Login with GitHub</span>
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}