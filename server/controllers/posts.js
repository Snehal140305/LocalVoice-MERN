import Post from "../models/Post.js";

/* CREATE ISSUE (was Create Post) */
export const createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
    } = req.body;

    const newPost = new Post({
      userId: req.user.id,
      title,
      description,
      category,
      location,
      picturePath: req.file?.filename,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET ALL ISSUES (was Feed Posts) */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "firstName lastName location picturePath")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* VOTE ISSUE (Upvote / Downvote) */
export const votePost = async (req, res) => {
  try {
    const { voteType } = req.body; // "up" or "down"
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Remove existing vote
    post.upvotes.pull(userId);
    post.downvotes.pull(userId);

    // Apply new vote
    if (voteType === "up") {
      post.upvotes.push(userId);
    } else if (voteType === "down") {
      post.downvotes.push(userId);
    }

    await post.save();

    // 🔥 IMPORTANT: return POPULATED post
    const populatedPost = await Post.findById(postId).populate(
      "userId",
      "firstName lastName location picturePath"
    );

    res.status(200).json(populatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ADD COMMENT */
export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.comments.push({
      userId: req.user.id,
      text: req.body.text,
    });

    await post.save();

    const populatedPost = await Post.findById(req.params.id)
      .populate("userId", "firstName lastName location picturePath");

    res.status(200).json(populatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

