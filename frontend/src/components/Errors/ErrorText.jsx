import PropTypes from "prop-types";

function ErrorText({ content }) {
  return <p className="text-red-500 font-bold ">{content}</p>;
}

ErrorText.propTypes = {
  content: PropTypes.string.isRequired,
};

export default ErrorText;
