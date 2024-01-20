import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  Send
} from "@mui/icons-material";
import { Box, Divider, IconButton, InputBase, TextField, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import FlexStart from "components/FlexStart";
import Friend from "components/Friend";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
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
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const [comment,setComment]=useState('')

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;


  const sendComment=async ()=>{
    if(!comment){return;}
    const response = await fetch(`https://socialmedia-backend-lsuw.onrender.com/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId,text:comment }),
    });
    const updatedPost = await response.json();
    setComment("")
    dispatch(setPost({ post: updatedPost }));
  }
  // const sendComment=async ()=>{
  //   if(!comment){return;}
  //   const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
  //     method: "PATCH",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userId: loggedInUserId,text:comment }),
  //   });
  //   const updatedPost = await response.json();
  //   setComment("")
  //   dispatch(setPost({ post: updatedPost }));
  // }


  // const patchLike = async () => {
  //   const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
  //     method: "PATCH",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userId: loggedInUserId }),
  //   });
  //   const updatedPost = await response.json();
  //   dispatch(setPost({ post: updatedPost }));
  // };
  const patchLike = async () => {
    const response = await fetch(`https://socialmedia-backend-lsuw.onrender.com/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://socialmedia-backend-lsuw.onrender.com/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
          <FlexBetween>
            <TextField
              id="outlined-helperText"
              label="Add Comment"
              size="small"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
           {comment? <Send
            onClick={()=>sendComment()}
            sx={{color:primary,marginLeft:1}}
            />:null}
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider style={{marginTop:'0.3rem'}} />
              {comment?.userImage?<FlexStart style={{marginTop:'0.3rem'}} >
              <UserImage image={comment?.userImage} size={'20px'} />
              <Typography sx={{ color: primary, pl:'0.5rem'}}>
                {comment?.username?comment?.username:""}
              </Typography>
              </FlexStart>:null}
              <Typography sx={{ color: main, pl: "2rem" }}>
                {comment?.text?comment?.text:comment}
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
