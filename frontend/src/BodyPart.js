import pic1 from './images/image-2.jpg';
import pic2 from './images/image-3.jpg';
import pic3 from './images/image-4.jpg';
import './styles/MainPage.css';

function BodyPart() {
  return (
    <>
      <div className="card-deck" style={{ margin: '50px' }}>
        <div className="card-deck">
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
          style={{ marginBlockStart: '50px', marginTop: '30px' }}
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
        </div>
      </div>
    </>
  );
}

export default BodyPart;
