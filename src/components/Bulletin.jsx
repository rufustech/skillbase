// components/Bulletin.js
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBullhorn,
  FaPlusCircle,
  FaThumbtack,
  FaRegComment,
  FaShare,
  FaEllipsisH,
  FaImage,
  FaPaperclip,
  FaUserCircle,
} from "react-icons/fa";
import SideBar from "./SideBar";

function Bulletin() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "New Safety Protocol Implementation",
      content:
        "Effective immediately, all workers must complete the updated safety orientation...",
      author: "Safety Manager",
      date: "2024-01-15",
      category: "Announcement",
      priority: "high",
      pinned: true,
      attachments: 2,
      comments: 5,
      likes: 12,
      image: "path/to/image.jpg",
    },
    // Add more bulletin posts...
  ]);

  const [showNewPost, setShowNewPost] = useState(false);
  const [filter, setFilter] = useState("all");

  const categories = [
    "all",
    "Announcement",
    "Update",
    "Alert",
    "Training",
    "General",
  ];

  const NewPostModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-2xl"
      >
        <h2 className="text-xl font-bold mb-4">Create New Bulletin Post</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="6"
              placeholder="Write your post content..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select className="w-full p-2 border rounded-lg">
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select className="w-full p-2 border rounded-lg">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              <FaImage className="mr-2" />
              Add Image
            </button>
            <button
              type="button"
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              <FaPaperclip className="mr-2" />
              Attach File
            </button>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Pin to top
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowNewPost(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar />
      <div className="p-4 sm:ml-64">
        <div className="container mx-auto py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Safety Bulletin
            </h1>
            <button
              onClick={() => setShowNewPost(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaPlusCircle className="mr-2" />
              New Post
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts
              .filter(
                (post) =>
                  filter === "all" || post.category.toLowerCase() === filter
              )
              .map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {post.pinned && (
                    <div className="bg-yellow-50 px-4 py-2 flex items-center text-sm text-yellow-800">
                      <FaThumbtack className="mr-2" />
                      Pinned Announcement
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {post.title}
                        </h3>
                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <FaUserCircle className="mr-2" />
                            {post.author}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            post.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : post.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {post.priority}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaEllipsisH />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{post.content}</p>

                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post attachment"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex space-x-4">
                        <button className="flex items-center text-gray-500 hover:text-gray-700">
                          <FaRegComment className="mr-1" />
                          {post.comments}
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-gray-700">
                          <FaPaperclip className="mr-1" />
                          {post.attachments}
                        </button>
                      </div>
                      <button className="flex items-center text-gray-500 hover:text-gray-700">
                        <FaShare className="mr-1" />
                        Share
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {showNewPost && <NewPostModal />}
    </div>
  );
}

export default Bulletin;
