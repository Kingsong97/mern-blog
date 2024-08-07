import { useState } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import Comment from "../components/Comment";

export default function CommentSection() {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState("");
    const [commentError, setCommentEroor] = useState("");
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const handleSubmit = async () => { };
    return (
        <div>
            {currentUser ? (
                <>
                    <img
                        className="object-cover w-5 h-5 rounded-full bg-slate-100"
                        src={currentUser.profilePicture}
                        alt={currentUser.username} />
                    <p>{currentUser.username}</p>
                </>
            ) : (
                <>
                    <p>로그인을 해주시면 댓글을 작성할 수 있습니다.</p>
                    <Link>로그인 하기</Link>
                </>
            )}
            {currentUser && (
                <form onSubmit={handleSubmit}>
                    <textarea placeholder="댓글을 200자 이내로 작성해주세요" rows="3"
                        maxLength="200"
                        className="border border-cyan-700"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <dir>
                        <p className="text-gray-500">199글자가 남았습니다.</p>
                        <button className="border bg-slate-600 text-white" type="submit">저장하기</button>
                    </dir>
                </form>
            )}
            {comments.length === 0 ? (
                <p>아직 댓글이 없습니다.</p>
            ) : (
                <>
                    <div>
                        <p>댓글(댓글 갯수)</p>
                        <Comment />
                    </div>
                </>
            )}
        </div>
    );
}