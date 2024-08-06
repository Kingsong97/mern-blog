import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState("");
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 3) {
                        setShowMore(false);
                    }
                }
                console.log(data)
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchPosts();
    }, [currentUser._id]);
    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts])
                if (data.posts.length < 3) {
                    setShowMore(false);
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
                method: "delete",
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="m-10 relative">
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <table className="w-full">
                        <caption className="my-8 text-3xl">Data</caption>
                        <thead>
                            <tr>
                                <th>Data Updated</th>
                                <th>Post Image</th>
                                <th>Post Title</th>
                                <th>Category</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userPosts.map((post, index) => (
                                <tr key={index} className="hover:bg-slate-600">
                                    <td className="p-2 border text-center">{new Date(post.updatedAt).toLocaleDateString()}</td>
                                    <td className="p-2 border text-center">
                                        <Link to={`/post/${post.slug}`}>
                                            <img src={post.image} alt={post.title} className="object-cover w-40 h-10 mx-auto" />
                                        </Link>
                                    </td>
                                    <td className="p-2 border text-center">
                                        <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                    </td>
                                    <td className="p-2 border text-center">{post.category}</td>
                                    <td className="p-2 border text-center">
                                        <span onClick={() => {
                                            setShowModal(true);
                                            setPostIdToDelete(post._id);
                                        }} className="text-red-500 cursor-pointer hover:underline">
                                            delete
                                        </span>
                                    </td>
                                    <td className="p-2 border text-center">
                                        <Link to={`/update-post/${post._id}`} className="text-green-500 cursor-pointer hover:underline">edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className="w-full text-sm text-teal-800 p-3 m-5 hover:bg-gray-500">더보기</button>
                    )}
                </>
            ) : (
                <p>아직 글이 없습니다.</p>
            )}
            {showModal && (
                <div className="w-full h-full bg-opacity-30 bg-black absolute top-0 left-0">
                    <div className="w-1/3 p-10 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h3 className="mb-3 mx-auto">게시글을 정말 삭제하시겠습니까?</h3>
                        <button className="bg-gray-700 px-2" onClick={handleDeletePost}>YES</button>
                        <button className="bg-gray-700 px-2 mx-2" onClick={() => setShowModal(false)}>NO</button>
                    </div>
                </div>
            )}
        </div>
    )
}