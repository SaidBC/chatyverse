import PropTypes from "prop-types";
import NotFoundImage from "../../assets/images/rb_5529.png";
function NotFoundError({ label, children }) {
  return (
    <div className="flex flex-col gap-8 items-center mt-20 bg-gray-700 rounded-lg p-10">
      <h1 className="text-5xl font-black text-slate-500 text-center">
        {label || "User not found"}
      </h1>
      <img src={NotFoundImage} className="w-96" alt="Not found image" />
      {children}
    </div>
  );
}

NotFoundError.propTypes = {
  message: PropTypes.string,
};

export default NotFoundError;
