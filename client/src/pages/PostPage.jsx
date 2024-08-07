import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import CommentSection from "./CommentSection";
export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                console.log(data)
                if (!res.ok) {
                    setPost(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);
    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-white-900 mb-6 text-center">
                {post && post.title}
            </h1>
            {post && post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-96 rounded-lg shadow-lg mb-6 object-cover"
                />
            )}
            <div className="time text-right text-white-500 text-sm mb-4">
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div
                className="prose prose-lg mx-auto text-white-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post && post.content }}
            ></div>
            <div className="mt-5 comment">댓글쓰기</div>
            <CommentSection />
        </main>
    )
}
