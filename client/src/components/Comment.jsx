

export default function Comment({ comment }) {
    return (
        <div>
            <div className="flex">
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    {comment.content};
                </div>
            </div>
        </div>
    );
}
