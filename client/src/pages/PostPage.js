import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../userContext";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(res => res.json())
            .then(data => setPostInfo(data))
            .catch(err => console.error("Failed to fetch post:", err));
    }, [id]);

    if (!postInfo) return <div style={{ textAlign: 'center' }}>Loading...</div>;

    const isAuthor = userInfo?.id === postInfo.author?._id;

    return (
        <div className="post-page">
            <h1>{postInfo.title || 'Untitled Post'}</h1>
            <div className="meta">
                {postInfo.createdAt && (
                    <time>{formatISO9075(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
                )}
                <div className="author">by @{postInfo.author?.username || 'Unknown'}</div>
            </div>


            {isAuthor && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5 inline-block mr-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487c-.64-.64-1.68-.64-2.32 0l-9.197 9.196a2.25 2.25 0 00-.574.974l-.741 2.967a.75.75 0 00.91.91l2.966-.741c.36-.09.693-.26.974-.574l9.197-9.197c.64-.64.64-1.68 0-2.32z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 13.5v6.75A2.25 2.25 0 0117.25 22.5H6.75A2.25 2.25 0 014.5 20.25V9.75A2.25 2.25 0 016.75 7.5H13.5"
                            />
                        </svg>
                        Edit this post
                    </Link>
                </div>
            )}

            <div className="image">
                {postInfo.cover ? (
                    <img src={`http://localhost:4000/${postInfo.cover}`} alt="Post cover" />
                ) : (
                    <div style={{ height: '300px', background: '#444', borderRadius: '10px' }} />
                )}
            </div>

            <div
                className="content"
                dangerouslySetInnerHTML={{
                    __html: postInfo.content || '<p>No content available.</p>'
                }}
            />
        </div>
    );
}
