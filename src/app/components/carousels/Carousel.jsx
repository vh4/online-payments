import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-multi-carousel/lib/styles.css";
import Slider from "react-slick";

export default function Carousels() {
  const SlickArrowRight = () => {
    return <></>;
  };

  // const SlickArrowLeft = () => {
  //   return <></>;
  // };

  const customLayout = localStorage.getItem("v-data2") ? JSON.parse(localStorage.getItem("v-data2")) : '';

  var settings = {
    dots: true,
    arrows: true,
    nextArrow: <SlickArrowRight />,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    focusOnSelect: true,
    draggable: true,
    edgeFriction: 1,
    swipeToSlide: true,
    accessibility: true,
    autoplaySpeed: 2000,
    centerMode: true, // Menyertakan centerMode
    centerPadding: "50px", // Sesuaikan dengan jumlah padding yang Anda inginkan
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto grid grid-cols-2 w-full px-8 py-8">
      <div className="block">
        <div
          style={{
            // color: customLayout?.color?.primary?.font_color || 'white',
            // color:'white',
            paddingLeft: '3rem', // Equivalent to pl-12
            display: 'flex',
            gap: '1rem', // Equivalent to space-x-4
          }}
        >
          <img src="/join.svg" width={160} alt="carousal.png" />
          <div className="text-sm">
            <h1
              style={{
                paddingLeft: '2rem', // Equivalent to 2xl:px-8
                fontSize: '1.25rem', // Equivalent to text-xl
                fontWeight: 'bold',
              }}
            >
              {customLayout?.wording?.primary ?? 'Hai Traveller,'}
            </h1>
            <div
              style={{
                marginTop: '0.5rem', // Equivalent to mt-2
                paddingLeft: '2rem', // Equivalent to 2xl:px-8
              }}
            >
              <div style={{ marginTop: '1rem' }}>
                {Array.isArray(customLayout?.wording?.secondary?.desktop) && customLayout?.wording?.secondary?.desktop[0]
                  ? customLayout?.wording?.secondary?.desktop[0]
                  : `Cukup login ke akun Anda dan melakukan pemesanan tiket untuk berbagai macam perjalanan anda.`}
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                {Array.isArray(customLayout?.wording?.secondary?.desktop) && customLayout?.wording?.secondary?.desktop[1]
                  ? customLayout?.wording?.secondary?.desktop[1]
                  : `Nikmati perjalanan anda di beberapa menu travel kereta, kapal, dan pesawat anda.`}
              </div>
            </div>
          </div>
        </div>

      </div>
      <Slider {...settings}>
        <div className="flex justify-center px-2">
          <img
            className="w-full h-full xl:rounded-xl"
            src="/slider-1.jpeg"
            alt=""
          />
        </div>
        <div className="flex justify-center px-2">
          <img
            className="w-full h-full xl:rounded-xl"
            src="/slider-2.jpeg"
            alt=""
          />
        </div>
        <div className="flex justify-center px-2">
          <img
            className="w-full h-full xl:rounded-xl"
            src="/slider-3.jpeg"
            alt=""
          />
        </div>
        <div className="flex justify-center px-2">
          <img
            className="w-full h-full xl:rounded-xl"
            src="/slider-4.jpeg"
            alt=""
          />
        </div>
        <div className="flex justify-center px-2">
          <img
            className="w-full h-full xl:rounded-xl"
            src="/slider-5.jpeg"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
}
