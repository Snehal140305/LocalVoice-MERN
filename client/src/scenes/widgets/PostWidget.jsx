import {
  ChatBubbleOutlineOutlined,
  ShareOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  upvotes = [],
  downvotes = [],
  comments = [],
}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user?._id);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const votePost = async (voteType) => {
    const response = await fetch(
      `http://localhost:6001/posts/${postId}/vote`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voteType }),
      }
    );

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const addComment = async () => {
    if (!commentText.trim()) return;

    const response = await fetch(
      `http://localhost:6001/posts/${postId}/comment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: commentText }),
      }
    );

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setCommentText("");
  };

  // 🗑 DELETE ISSUE (only creator)
  const deleteIssue = async () => {
    const response = await fetch(
      `http://localhost:6001/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      window.location.reload();
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      {/* 🔹 HEADER */}
      <FlexBetween gap="1rem">
        <FlexBetween gap="0.75rem">
          <UserImage image={userPicturePath} size="55px" />
          <Box>
            <Typography variant="h6" fontWeight="500" color={main}>
              {name}
            </Typography>
            <Typography fontSize="0.75rem" color={medium}>
              {location}
            </Typography>
          </Box>
        </FlexBetween>

        {/* 🔴 DELETE BUTTON – only for creator */}
        {loggedInUserId === postUserId && (
          <IconButton onClick={deleteIssue}>
            <DeleteOutline sx={{ color: "red" }} />
          </IconButton>
        )}
      </FlexBetween>

      {/* 🔹 CONTENT */}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="issue"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:6001/assets/${picturePath}`}
        />
      )}

      {/* 🔹 ACTIONS */}
      <FlexBetween mt="0.5rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => votePost("up")}>👍</IconButton>
            <Typography>{upvotes.length}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => votePost("down")}>👎</IconButton>
            <Typography>{downvotes.length}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {/* 🔹 COMMENTS */}
      {isComments && (
        <Box mt="0.5rem">
          <Box display="flex" gap="0.5rem" mb="0.5rem">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={addComment}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Post
            </button>
          </Box>

          {comments.map((comment, i) => (
            <Box key={i}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment.text}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
