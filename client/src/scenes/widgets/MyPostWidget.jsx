import { DeleteOutlined, ImageOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);

  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Road");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please enter issue title and description");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);

      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Post failed");

      const postsResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const allPosts = await postsResponse.json();
      dispatch(setPosts({ posts: allPosts }));

      setTitle("");
      setDescription("");
      setCategory("Road");
      setImage(null);
      setIsImage(false);
    } catch (err) {
      alert("Something went wrong while raising issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="Issue Title (e.g. No water supply in Ward 5)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "0.75rem 1.5rem",
          }}
        />
      </FlexBetween>

      <InputBase
        placeholder="Describe the issue in detail..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{
          width: "100%",
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          padding: "1rem 2rem",
          marginTop: "1rem",
        }}
      />

      <Box mt="1rem">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "1rem",
            border: "none",
          }}
        >
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Garbage">Garbage</option>
          <option value="Other">Other</option>
        </select>
      </Box>

      {isImage && (
        <Box border={`1px solid ${palette.neutral.medium}`} mt="1rem" p="1rem">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(files) => setImage(files[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image</p>
                  ) : (
                    <Typography>{image.name}</Typography>
                  )}
                </Box>
                {image && (
                  <IconButton onClick={() => setImage(null)}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ my: "1rem" }} />

      <FlexBetween>
        <FlexBetween onClick={() => setIsImage(!isImage)}>
          <ImageOutlined />
          <Typography ml="0.5rem">Image</Typography>
        </FlexBetween>

        <Button
          disabled={loading}
          onClick={handlePost}
          sx={{
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            color: "white",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Posting..." : "REPORT ISSUE"}
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
