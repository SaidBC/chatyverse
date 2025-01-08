import PropTypes from "prop-types";
import { forwardRef, useEffect, useRef, useState } from "react";

function AvatarImage({ src, alt, className, children, ...props }, ref) {
  const imgRef = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (ref) imgRef.current = ref.current;
    if (imgRef.current) {
      imgRef.current.onload = function () {
        setLoading(false);
      };
      imgRef.current.src = src;
    }
  }, [src, imgRef, ref]);
  return (
    <div className={loading ? "animate-pulse " + className : className}>
      <img
        ref={imgRef}
        className="w-full h-full rounded-full"
        {...props}
        alt={alt}
      />
      {children}
    </div>
  );
}

AvatarImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default forwardRef(AvatarImage);
