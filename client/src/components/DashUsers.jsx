import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function DashUsers() {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState("");
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/user/getusers`);
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchUser();
    }, [currentUser._id]);
    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(`/api/user/getusers?&startIndex=${startIndex}`)
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users])
                if (data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
                setShowModal(false);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="m-10 relative">
            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    <table className="w-full">
                        <caption className="my-8 text-3xl">Blog Users</caption>
                        <thead>
                            <tr>
                                <th>Data Create</th>
                                <th>User Image</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Admin</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="hover:bg-slate-600">
                                    <td className="p-2 border text-center">{new Date(users.createdAt).toLocaleDateString()}</td>
                                    <td className="p-2 border text-center">
                                        <img src={users.profilePicture} alt={users.username} className="object-cover w-10 h-10 mx-auto" />
                                    </td>
                                    <td className="p-2 border text-center">
                                        {users.username}
                                    </td>
                                    <td className="p-2 border text-center">{user.email}</td>
                                    <td className="p-2 border text-center">
                                        {user.isAdmin ? (
                                            <FaCheck className="text-green-500" />
                                        ) : (
                                            <FaTimes className="text-red-500" />
                                        )}
                                    </td>
                                    <td className="p-2 border text-center">
                                        <span className="text-red-500 cursor-pointer hover:underline" onClick={() => {
                                            setShowModal(true);
                                            setUserIdToDelete(user._id);
                                        }}>delete</span>
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
                <p>회원이 없습니다.</p>
            )}
            {showModal && (
                <div className="w-full h-full bg-opacity-30 bg-black absolute top-0 left-0">
                    <div className="w-1/3 p-10 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h3 className="mb-3 mx-auto">게시글을 정말 삭제하시겠습니까?</h3>
                        <button className="bg-gray-700 px-2" onClick={handleDeleteUser}>YES</button>
                        <button className="bg-gray-700 px-2 mx-2" onClick={() => setShowModal(false)}>NO</button>
                    </div>
                </div>
            )}
        </div>
    )
}