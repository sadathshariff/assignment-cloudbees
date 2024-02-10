import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Avatar,
} from "@mui/material";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../config/api";

const UserDetails = () => {
  const { username } = useParams();

  const {
    data: userDetails,
    loading,
    error,
  } = useFetch(`${BASE_URL}/users/${username}`);

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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h5" color="error" sx={{ marginBottom: "20px" }}>
            {error}
          </Typography>
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Back to Users
            </Button>
          </Link>
        </Box>
      )}

      {!loading && !error && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h3" sx={{ marginBottom: "20px" }}>
            User Details
          </Typography>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Avatar
              src={userDetails?.avatar_url}
              alt={`${userDetails?.login}'s avatar`}
              sx={{
                width: "200px",
                height: "200px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            />
            <Box>
              <Typography variant="h4" sx={{ marginBottom: "10px" }}>
                Name: {userDetails.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: "10px" }}>
                Username: {userDetails.login}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                Company: {userDetails.company || "Not Available"}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                Followers: {userDetails.followers}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                Following: {userDetails.following}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                Public Repositories: {userDetails.public_repos}
              </Typography>
            </Box>
          </Box>
          <Link to={`/`} style={{ textDecoration: "none", marginTop: "20px" }}>
            <Button variant="contained" color="primary">
              Back to Users
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
};

export default UserDetails;
