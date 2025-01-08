import PropTypes from "prop-types";
import InternalServerErrorImage from "../../assets/images/rb_5572.png";
function InternalServerError({ message }) {
  return (
    <div className="flex flex-col gap-8 items-center mt-20 bg-gray-700 rounded-lg p-10">
      <h1 className="text-5xl font-black text-slate-500 text-center">
        {message || "SERVER ERROR"}
      </h1>
      <img
        src={InternalServerErrorImage}
        className="w-96"
        alt="Not found image"
      />
    </div>
  );
}

InternalServerError.propTypes = {
  message: PropTypes.string,
};

export default InternalServerError;
