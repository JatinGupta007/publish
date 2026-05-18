import React from 'react';

function HomeContent() {
  return (
    <>
      {/* About Section */}
      <section className="py-5 " style={{backgroundColor:'rgba(240, 203, 203, 0.7)'}}>
        <div className="container">
          <h2 className="display-6 text-center fw-bold mb-4">About Us</h2>
          <p className="text-muted text-center fs-5 mb-5 mx-auto" style={{ maxWidth: '800px' }}>
            Welcome to <strong>Smart Canteen</strong>, your one-stop solution for delicious, hygienic, and quick meals.
            We believe in serving fresh food with a smart ordering experience that saves your time and satisfies your taste buds.
            Our digital menu and pre-order facilities ensure you never have to wait in long queues again.
          </p>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <img src="https://img.icons8.com/color/96/chef-hat.png" alt="Fresh Meals" className="mb-3" style={{ width: '80px' }} />
                  <h4 className="h5 mb-3">Fresh & Healthy Meals</h4>
                  <p className="text-muted mb-0">Prepared daily with quality ingredients for the best taste and nutrition.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <img 
                    src="https://media.istockphoto.com/id/611071834/vector/hand-holding-smartphone-with-pizza-cola-and-chicken.jpg?s=612x612&w=0&k=20&c=kVrZ2STwc4qfoVI5JyQd_evaPNagE-5N3T6flFCOs-A=" 
                    alt="Smart Ordering" 
                    className="mb-3 rounded-3" 
                    style={{ width: '80px' }} 
                  />
                  <h4 className="h5 mb-3">Smart Ordering</h4>
                  <p className="text-muted mb-0">Order from your phone or kiosk for a quick and seamless experience.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiOkANjlQ_icIthOrZI_sAqz4-ZJ5qU0F96g&s" 
                    alt="Fast Service" 
                    className="mb-3 rounded-3" 
                    style={{ width: '80px' }} 
                  />
                  <h4 className="h5 mb-3">Fast Service</h4>
                  <p className="text-muted mb-0">Get your food ready in minutes with our efficient service system.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="display-6 text-center fw-bold mb-5">What Our Customers Say</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <img 
                    src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg" 
                    alt="Customer 1" 
                    className="rounded-circle mb-3" 
                    style={{ width: '320px', height: '320px', objectFit: 'cover' }} 
                  />
                  <p className="text-muted mb-3">"The food is fresh, healthy, and always served on time. I love the Smart Canteen experience!"</p>
                  <h4 className="h6 mb-0">– Priya Sharma</h4>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Qv5s5REahX2Vcj11jPnU1ibiEUfTc-VMAQ&s" 
                    alt="Customer 2" 
                    className="rounded-circle mb-3" 
                    style={{ width: '320px', height: '320px', objectFit: 'cover' }} 
                  />
                  <p className="text-muted mb-3">"I can order from my phone and pick it up quickly during breaks. Super convenient!"</p>
                  <h4 className="h6 mb-0">– Rahul Verma</h4>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl60X7TRoUPu1aBpGCYEzSFTNfwJnUQ0YkMA&s" 
                    alt="Customer 3" 
                    className="rounded-circle mb-3" 
                    style={{ width: '320px', height: '320px', objectFit: 'cover' }} 
                  />
                  <p className="text-muted mb-3">"Affordable prices and tasty meals! I recommend Smart Canteen to all my friends."</p>
                  <h4 className="h6 mb-0">– Anjali Gupta</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


     
      {/* App Download Section */}
      <section className="py-5 " style={{backgroundColor:'rgba(240, 203, 203, 0.7)'}}>
        <div className="container " style={{paddingLeft:'120px'}}>
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="display-6 fw-bold mb-4">Download Our App</h2>
              <p className="lead mb-4">Get the full SmartCanteen experience with our mobile app. Order food, track your orders, and earn rewards on the go.</p>
              
              <div className="d-flex flex-column flex-sm-row gap-3">
                <button className="btn btn-dark btn-lg d-flex align-items-center px-4">
                  <i className="fab fa-apple fa-2x me-2"></i>
                  <div className="text-start">
                    <div className="small">Download on the</div>
                    <div className="fs-5 fw-bold">App Store</div>
                  </div>
                </button>
                <button className="btn btn-dark btn-lg d-flex align-items-center px-4">
                  <i className="fab fa-google-play fa-2x me-2"></i>
                  <div className="text-start">
                    <div className="small">Get it on</div>
                    <div className="fs-5 fw-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <img 
                src="/cafeteria4.avif" 
                alt="SmartCanteen mobile app interface" 
                className="img-fluid rounded-4 shadow-lg" 
                style={{ maxWidth: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeContent;
