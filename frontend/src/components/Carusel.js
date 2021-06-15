import pic1 from '../images/image-1.jpg';
import pic2 from '../images/image-5.jpg';
import pic3 from '../images/image-6.jpg';

const navbar = { backgroundColor: '#F16E10' };
function Carusel() {
  return (
    <div
      class="container"
      style={{
        background: 'black',
        width: '50%',
        minHeight: '50px',
      }}
    >
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" w>
          <div class="carousel-item active">
            <img class="d-block w-100" src={pic1} alt="First slide" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src={pic2} alt="Second slide" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100 " src={pic3} alt="Third slide" />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}

export default Carusel;
