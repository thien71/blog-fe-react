import { IoIosArrowBack, IoIosRemoveCircle } from "react-icons/io";
import { Button } from "../../../common";
import DetailPostContent from "./DetailPostContent";
import DetailPostHeader from "./DetailPostHeader";
import DetailPostTag from "./DetailPostTag";
import { TiTick } from "react-icons/ti";

const PreviewPostModal = ({ onClose, post, handleReject, handleApprove }) => {
  if (!post) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[800px] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 p-4 border-b">
          <DetailPostHeader post={post} className="mb-0" />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <DetailPostContent post={post} />
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4">
              <DetailPostTag tags={post.tags} className="border-none mb-0" />
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white z-10 p-4 border-t">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="border-transparent text-hover hover:bg-blue-200"
              onClick={onClose}
            >
              <IoIosArrowBack size={24} />
            </Button>
            <div className="flex justify-center gap-4 items-center">
              <Button
                variant="danger"
                className="border-blue-500 text-hover hover:bg-blue-200 block"
                onClick={() => {
                  handleReject(post.id);
                  onClose();
                }}
              >
                <IoIosRemoveCircle size={24} />
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  handleApprove(post.id);
                  onClose();
                }}
              >
                <TiTick size={24} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPostModal;
