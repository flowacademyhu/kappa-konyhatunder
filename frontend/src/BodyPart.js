import pic1 from './images/image-2.jpg';
import pic2 from './images/image-3.jpg';
import pic3 from './images/image-4.jpg';
import pic4 from './images/image-1.jpg';
import pic5 from './images/image-5.jpg';
import pic6 from './images/image-6.jpg';
import pic7 from './images/avocado.jpeg';
function BodyPart() {
  return (
    <>
      <div className="card-deck">
        <div className="card-deck" style={{  margin: '30px' }} >
          <div className="card">
            <img className="card-img-top" src={pic1} alt="pic1" />
            <div className="card-body">
              <h5 className="card-title">Italian Carbonara</h5>
              <p className="card-text">
                “Just a handful of ingredients makes a fantastic carbonara and,
                done properly, it’s a thing of beauty. ”
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src={pic2} alt="pic2" />
            <div className="card-body">
              <h5 className="card-title">Beef Stake with asparagus</h5>
              <p className="card-text">
                “If you’re cooking to impress, a juicy, flavour-packed steak
                ticks a lot of boxes, and this dish takes your average steak
                night to a totally different place."
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
        <div
          className="card-deck"
          style={{  margin: '30px' }}
        >
          <div className="card">
            <img className="card-img-top" src={pic3} alt="" />
            <div className="card-body">
              <h5 className="card-title">Gourmet Chicken Shish Doner</h5>
              <p className="card-text">
                “These tasty kebabs are perfect on the barbecue, but work really
                well on a grill, too. Kids go mad for them! ”{' '}
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src={pic4} alt="" />
            <div className="card-body">
              <h5 className="card-title">Porridge enriched with berries</h5>
              <p className="card-text">
              “Once you’ve mastered the basic porridge recipe, get creative and add your favourite toppings. Think fruit, toasted nuts and honey 
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>

          <div className="card">
            <img className="card-img-top" src={pic5} alt="" />
            <div className="card-body">
              <h5 className="card-title">Grilled Chicken with basil</h5>
              <p className="card-text">
              “It never fails to blow my mind how a simple marinade, like this rosemary one, can elevate humble ingredients to such a beautiful place. 
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src={pic6} alt="" />
            <div className="card-body">
              <h5 className="card-title">Salmon with avocado raddish</h5>
              <p className="card-text">
              “If you like salmon, you’ll love this quick and easy recipe – think flaky, juicy flesh kissed with gentle spice and the crispiest skin ever, buddied up with my fail-safe, fluffy coconut rice and refreshing cucumber pickle. Get in! ” 
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src={pic7} alt="" />
            <div className="card-body">
              <h5 className="card-title">Avocado Toast</h5>
              <p className="card-text">“I’m told that in the UK avocados are now more popular than oranges! This breakfast favourite is a source of vitamin E, which acts as an antioxidant, helping to protect our cells. ” 
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BodyPart;
