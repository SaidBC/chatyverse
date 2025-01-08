import PropTypes from "prop-types";
import { forwardRef, useEffect, useRef, useState } from "react";

const AvatarImage = forwardRef(function (
  { src, alt, className, children, ...props },
  ref
) {
  const imgRef = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (ref) imgRef.current = ref.current;
    if (imgRef.current && !ref) {
      imgRef.current.onload = function () {
        setLoading(false);
      };
      imgRef.current.src = src;
    }
    if (ref) {
      ref.current.onload = function () {
        setLoading(false);
      };
      ref.current.src = src;
    }
  }, [src, imgRef, ref]);
  return (
    <div className={loading ? "animate-pulse " + className : className}>
      <img
        ref={ref || imgRef}
        className="w-full h-full rounded-full"
        {...props}
        alt={alt}
      />
      {children}
    </div>
  );
});

AvatarImage.displayName = "AvatarImage";
AvatarImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default AvatarImage;
