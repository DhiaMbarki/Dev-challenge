import React, { useState, useEffect } from "react";
import { useAuth } from "./auth/authContext";
import { Link, useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

import axios from "axios";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get/${currentUser.uid}`)
      .then((res) => {
        setName(res.data.name);
        setBio(res.data.bio);
        setphoneNumber(res.data.phoneNumber);
        setImage(res.data.image);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <Link to="/update-profile">Update your Profile</Link>

      <h2>Profile</h2>

      {/* {console.log(image)} */}

      <div>
        <Card.Img
          alt=""
          className="setting-image center mb-4  "
          height="300"
          width="300"
          src={image}
        />

      </div>
      
      <strong>Name: </strong>
      {name}
      <br />
      <strong>Bio: </strong>
      {bio}
      <br />
      <strong>Phone Number: </strong>
      {phoneNumber}
      <br />
      <strong>Email: </strong>
      {currentUser.email}
      <div>
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
}
