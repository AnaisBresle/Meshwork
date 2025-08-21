import { useState } from "react";
import { useSession } from "../contexts/SessionContext";


const NewComment = ( { parentPost, onCommentAdded}) => {
  const { user, token } = useSession();

  console.log("Token being sent:", token);


  if (!parentPost) return null; // safety check
  
  const [content, setContent] = useState('');
  const [error, setError] = useState("");
    

  const displayError = (message) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 3000);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

    // Validations
  if (!content) {
    displayError('Comment cannot be empty');
    return;
  }


  const newCommentData = {
    title: null,
    content,
    userId: user.id,
    topicId: parentPost.topicId, //link to the parent post somehow
    parentId: parentPost.id
    };

  try {
      const response = await fetch(`http://localhost:3001/api/posts/${parentPost.id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,  
       },
      body: JSON.stringify(newCommentData),
    });

    const createdComment = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = createdComment.error || createdComment.message || "Failed to post comment";
      throw new Error(message);
    }

        // Reset form
      setContent("");
    

    
console.log("comment created successfully:");

// pass the new comment back to PostCard
      onCommentAdded?.(createdComment);


    } catch (error) {
      console.error("Comment creation failed", error.message);
      displayError(error.message);
    }
  };
 


  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
          
          <div>
        <label htmlFor="content" className="block text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="3"
          className="w-full px-4 py-2 border rounded-md"
        ></textarea>
      </div>

         
     
     {error && <p className="text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        className="w-full bg-[var(--primary)] text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Post Comment
      </button>
      
    </form>
  );
};

export default NewComment;