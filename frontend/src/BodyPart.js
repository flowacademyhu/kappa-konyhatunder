
import pic1 from './images/image-2.jpg'
import pic2 from './images/image-3.jpg'
import pic3 from './images/image-4.jpg'

function BodyPart() {
  return (
    <>
<div class="card-deck">
  <div class="card" >
    <img class="card-img-top" src={pic1} alt="Card image cap"/>
    <div class="card-body">
      <h5 class="card-title">Italian Carbonara</h5>
      <p class="card-text">
“Just a handful of ingredients makes a fantastic carbonara and, done properly, it’s a thing of beauty. ”
</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src={pic2} alt="Card image cap"/>
    <div class="card-body">
      <h5 class="card-title">Beef Stake with asparagus</h5>
      <p class="card-text">“If you’re cooking to impress, a juicy, flavour-packed steak ticks a lot of boxes, and this dish takes your average steak night to a totally different place."</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src={pic3} alt="Card image cap"/>
    <div class="card-body">
      <h5 class="card-title">Gourmet Chicken Shish Doner</h5>
      <p class="card-text">“These tasty kebabs are perfect on the barbecue, but work really well on a grill, too. Kids go mad for them! ” </p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
  </>
  );
}

export default BodyPart;