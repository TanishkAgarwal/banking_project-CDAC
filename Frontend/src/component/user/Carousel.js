import React from 'react'
import pic1 from '../images/12.jpg'
import pic2 from '../images/13.jpg'
import pic4 from '../images/14.jpg'
import ImageCards from '../Admin/ImageCards'
function Carousel() {
  return (
        <>
         <div className="container-fluid mb-5">

<ImageCards/>
</div>
    <div className="">
            <div id="id" className='carousel slide' data-bs-ride="true">

{/* <!-- Indicators --> */}
<ul className="carousel-indicators">
    <li data-target="#id" data-slide-to="0" className="active"></li>
    <li data-target="#id" data-slide-to="1"></li>
    <li data-target="#id" data-slide-to="2"></li>
    <li data-target="#id" data-slide-to="3"></li>
</ul>

{/* <!-- The slideshow --> */}


{/* <!-- Left and right controls --> */}
<a className="carousel-control-prev" href="#id" data-slide="prev"> <span
    className="carousel-control-prev-icon"></span>
</a> <a className="carousel-control-next" href="#id" data-slide="next"> <span
    className="carousel-control-next-icon"></span>
</a>
</div>
    </div>
   
    </>
    
  )
}

export default Carousel