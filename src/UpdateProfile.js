import React, { useRef, useState } from "react";
import { useAuth } from "./auth/authContext";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

export default function UpdateProfile() {
  const nameRef = useRef();
  const bioRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");


  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  function updateInfo(event) {
    event.preventDefault();
    console.log(image);
    axios.post("http://localhost:5000/post", {
      name: name,
      bio: bio,
      phoneNumber: phoneNumber,
      uid: currentUser.uid,
      image: image,
    });
    history.push("/");
  }

  function changeName(event) {
    setName(event.target.value);
  }
  function changeBio(event) {
    setBio(event.target.value);
  }
  function changePhoneNumber(event) {
    setphoneNumber(event.target.value);
  }

  const uploadImage = (event) => {
    // console.log(files[0]);
    const files = event.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "Dhia123");
    formData.append("file", files);
    axios
      .post("https://api.cloudinary.com/v1_1/rbkk/image/upload", formData)
      .then((res) => {
        console.log(res);
        setImage(res.data.secure_url);

        // console.log("image", image);
      })
      .then(setLoading(false))
      .catch((err) => console.log("err from cloudinary"));
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <h2 >Update your Profile</h2>

      <div>
        <div>
          <div id="brr">update profile picture</div>
          <input name="file" type="file" onChange={uploadImage} />
        </div>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <img
            alt=""
            height="200"
            width="200"
            src={image}
          />
        )}
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group id="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={changeName}
            type="text"
            ref={nameRef}
            defaultValue={currentUser.name}
            placeholder="Your Name"
          ></Form.Control>
        </Form.Group>

        <Form.Group id="bio">
          <Form.Label>bio</Form.Label>
          <Form.Control
            onChange={changeBio}
            type="text"
            ref={bioRef}
            defaultValue={currentUser.bio}
            placeholder="Add a bio"
          ></Form.Control>
        </Form.Group>

        <Form.Group id="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            onChange={changePhoneNumber}
            type="phone"
            ref={phoneNumberRef}
            defaultValue={currentUser.phoneNumber}
          ></Form.Control>
        </Form.Group>

        <Form.Group id="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            ref={emailRef}
            required
            defaultValue={currentUser.email}
            placeholder="Example@email.com"
          ></Form.Control>
        </Form.Group>

        <Form.Group id="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef}></Form.Control>
        </Form.Group>

        <Button
          disabled={loading}
          className="w-100"
          type="submit"
          onClick={updateInfo}
        >
          Update
        </Button>
      </Form>
      <div>
        <Link to="/">return</Link>
      </div>
    </>
  );
}
