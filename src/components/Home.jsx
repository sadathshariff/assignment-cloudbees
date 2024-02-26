import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import "@fontsource/roboto/400.css";

import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../config/api";

const Home = () => {
  const { data: users, loading, error } = useFetch(`${BASE_URL}/users`);
  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState("");

  const [newUsers, setNewUsers] = useState([]);

  const checkList = () => {
    if (userName.trim() === "" && location.trim() === "") {
      setNewUsers(users);
    } else {
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${userName}+location:${location}`
      );
      const data = await res.json();

      if (data.items.length > 0) {
        setNewUsers(data.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h5" color="error">
            {error}
          </Typography>
        </Box>
      )}

      {!loading && !error && (
        <>
          <Typography variant="h4" sx={{ margin: "20px", textAlign: "center" }}>
            List of Users
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",

              width: "50%",
            }}
          >
            <TextField
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <TextField
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Button onClick={checkList} variant="contained" color="primary">
              Search
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {newUsers ? (
              <>
                {newUsers?.map((user) => (
                  <Box
                    key={user?.id}
                    sx={{
                      width: "40%",
                      margin: { xs: "15px", md: "10px" },
                      padding: { xs: "15px", md: "10px" },
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      boxShadow: "0px 0px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    <Avatar
                      src={user?.avatar_url}
                      alt={`${user?.login}'s avatar`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        marginBottom: "10px",
                        cursor: "pointer",
                        maxHeight: "200px",
                        maxWidth: "200px",
                      }}
                    />
                    <Typography variant="h6" sx={{ margin: "5px 0px" }}>
                      UserName : {user?.login}
                    </Typography>
                    <Link
                      to={`/user/${user.login}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained" color="primary">
                        View
                      </Button>
                    </Link>
                  </Box>
                ))}
              </>
            ) : (
              <>
                {users.map((user) => (
                  <Box
                    key={user?.id}
                    sx={{
                      width: "40%",
                      margin: { xs: "15px", md: "10px" },
                      padding: { xs: "15px", md: "10px" },
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      boxShadow: "0px 0px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    <Avatar
                      src={user?.avatar_url}
                      alt={`${user?.login}'s avatar`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        marginBottom: "10px",
                        cursor: "pointer",
                        maxHeight: "200px",
                        maxWidth: "200px",
                      }}
                    />
                    <Typography variant="h6" sx={{ margin: "5px 0px" }}>
                      UserName : {user?.login}
                    </Typography>
                    <Link
                      to={`/user/${user.login}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained" color="primary">
                        View
                      </Button>
                    </Link>
                  </Box>
                ))}
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default Home;
