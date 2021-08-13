import { PermMedia } from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { storage } from "../firebase";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Share = () => {
  const { user } = useContext(AuthContext);
  const imageRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // making the image visible when selecting it
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };
  const removeImage = () => {
    setImageToPost(null);
  };
  //sumbiting the data for the post
  const onSubmit = async (data) => {
    const userPost = {
      userId: user._id,
      desc: data.desc,
    };
    try {
      const res = await axios.post("/posts/", userPost);
      const post = res.data;
      if (post) {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${post._id}`)
            .putString(imageToPost, "data_url");
          removeImage();
          uploadTask.on(
            "state_change",
            null,
            (error) => console.error(error),
            async () => {
              // when the upload is complete
              const url = await storage
                .ref("posts")
                .child(post._id)
                .getDownloadURL();
              if (url) {
                await axios.put(`/posts/${post._id}`, {
                  userId: user._id,
                  img: url,
                });
              }
            }
          );
        }
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //   share container
    <div className="w-full h-auto bg-white rounded-lg shadow p-2">
      {/* share wrapper */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* share top */}
        <div className="flex space-x-4 items-center">
          <img
            className="object-cover rounded-full h-12 w-12"
            src={
              user.profilePicture
                ? user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            {...register("desc", { required: true })}
            name="desc"
            className="outline-none w-4/5"
            placeholder={"whats on your mind " + user.username + "?"}
          />
          {errors.desc && (
            <p className="bg-white text-red-600 text-right p-1 text-sm">
              Description field required
            </p>
          )}
          {imageToPost && (
            <div
              onClick={removeImage}
              className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
            >
              <img className="h-10 object-contain" src={imageToPost} alt="" />
              <p className="text-red-500 text-xs text-center">Remove</p>
            </div>
          )}
        </div>
        <hr className="m-5" />
        {/* share bottom */}
        <div className="flex flex-col">
          {/* share options */}
          <div className="flex justify-around">
            <label
              htmlFor="file"
              className="cursor-pointer flex items-center space-x-2"
            >
              <PermMedia htmlColor="tomato" />
              <span className="hidden md:inline-block">Photo or video</span>
              <input
                onChange={addImageToPost}
                hidden
                ref={imageRef}
                type="file"
                id="file"
              />
            </label>
            <div className="cursor-pointer flex items-center space-x-2">
              <PermMedia htmlColor="blue" />
              <span className="hidden md:inline-block">Tag</span>
            </div>
            <div className="cursor-pointer flex items-center space-x-2">
              <PermMedia htmlColor="green" />
              <span className="hidden md:inline-block">Location</span>
            </div>
          </div>
          <button
            type="submit"
            className="w-4/5 lg:w-3/5 bg-blue-600 text-white p-2 cursor-pointer rounded-full border-none mt-4 mb-2 self-center"
          >
            Share
          </button>
        </div>
      </form>
    </div>
  );
};

export default Share;
