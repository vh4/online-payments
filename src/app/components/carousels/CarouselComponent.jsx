import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex", // Use Flexbox
        background: "#fff", // White background
        color: "gray", // Gray color for icon
        borderRadius: "50%", // Circular shape
        right: "10px",
        width: "40px", // Slightly larger for better spacing
        height: "40px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional shadow
        zIndex: 2,
        alignItems: "center", // Vertically center the icon
        justifyContent: "center", // Horizontally center the icon
        cursor: "pointer", // Change cursor to pointer on hover
      }}
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowRight size={28} /> {/* Right arrow */}
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex", // Use Flexbox
        background: "#fff", // White background
        color: "gray", // Gray color for icon
        borderRadius: "50%", // Circular shape
        left: "10px",
        width: "40px", // Same size as next arrow
        height: "40px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional shadow
        zIndex: 2,
        alignItems: "center", // Vertically center the icon
        justifyContent: "center", // Horizontally center the icon
        cursor: "pointer", // Change cursor to pointer on hover
      }}
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowLeft size={28} /> {/* Left arrow */}
    </div>
  );
}



export default function Carousels() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    nextArrow: <SampleNextArrow size={24} />,
    prevArrow: <SamplePrevArrow size={24} />,
    focusOnSelect: true,
    draggable: true,
    edgeFriction: 1,
    swipeToSlide: true,
    accessibility: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "80px",
    responsive: [
      {
        breakpoint: 1536,
        settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: true },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1, centerPadding: "16px",infinite: true, dots: true  },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, centerPadding: "16px",infinite: true, dots: true  },
      },
    ],
  };

  return (
    <div className="container-fluid 2xl:container px-0 md:px-12 2xl:px-32 mx-auto w-full p-4">
      <Slider {...settings}>
        {["/slider-1.jpeg", "/slider-2.jpeg", "/slider-3.jpeg", "/slider-4.jpeg", "/slider-5.jpeg"].map(
          (src, index) => (
            <div key={index} className="flex justify-center px-2">
              <img className="w-full h-56 object-cover rounded-lg" src={src} alt={`slide-${index + 1}`} />
            </div>
          )
        )}
      </Slider>
    </div>
  );
}
