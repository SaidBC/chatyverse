import { forwardRef, useEffect, useRef, useState } from "react";

function AvatarImage({ src, alt, className, children, ...props }, ref) {
  const imgRef = ref || useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.onload = function () {
        setLoading(false);
      };
      imgRef.current.src = src;
    }
  }, [src, imgRef]);
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

export default forwardRef(AvatarImage);
