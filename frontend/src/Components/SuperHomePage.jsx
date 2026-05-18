import React from 'react'
import { Link } from 'react-router-dom'

function SuperHomePage() {
  return (
    <div className="super-home">
      {/* Top Bar */}
      <div style={{
        backgroundColor: "#800000",
        color: "white",
        padding: "5px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "14px"
      }}>
        <div style={{ fontSize: "18px" }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i className="fas fa-clock" style={{ color: "white" }}></i> &nbsp;
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>
        <div>
          <button className="mx-2" style={{
            background: "darkred",
            border: "1px solid gold",
            color: "gold",
            borderRadius: "5px",
            padding: "5px 10px"
          }}>Virtual Tour</button>
          <button className="mx-2" style={{
            background: "darkred",
            border: "1px solid gold",
            color: "gold",
            borderRadius: "5px",
            padding: "5px 10px"
          }}>Grievance</button>
          <button className="mx-2" style={{
            background: "darkred",
            border: "1px solid gold",
            color: "gold",
            borderRadius: "5px",
            padding: "5px 10px"
          }}>Admin Login</button>
          <i className="fa-brands fa-instagram p-2 border border-white rounded-5 mx-1"></i>
          <i className="fa-brands fa-facebook p-2 border border-white rounded-5 mx-1"></i>
          <i className="fa-brands fa-youtube p-2 border border-white rounded-5 mx-1"></i>
          <i className="fa-brands fa-instagram p-2 border border-white rounded-5 mx-1"></i>
          <i className="fa-brands fa-facebook p-2 border border-white rounded-5 mx-1"></i>
          <span className="ms-2" style={{ fontSize: "18px", fontWeight: "bold" }}>Tenders</span>
        </div>
      </div>

      {/* Header */}
      <div style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "150px",
        padding: "10px 20px",
        borderBottom: "2px solid #a00"
      }}>
        <div className="logo-section d-flex align-items-center mx-auto">
          <img src="https://recgonda.ac.in/Content/img/mainlogo.png" alt="College Logo" style={{ height: "120px", marginRight: "15px" }} />
          <div style={{ fontSize: "18px", color: "#800000" }}>
            <h1 style={{ margin: 0, fontSize: "20px" }}><b>Maa Pateshwari Devi, Rajkiya Engineering College, Gonda</b></h1>
            <span style={{ color: "black", fontWeight: "bold", paddingTop: "15px" }}><i>माँ पाटेश्वरी देवी, राजकीय इंजीनियरिंग कॉलेज, गोंडा</i></span>
            <p style={{ margin: 0, fontSize: "14px", color: "#333" }}><b>AICTE Approved & Affiliated to Dr. A.P.J. Abdul Kalam Technical University, Lucknow</b></p>
          </div>
          <img src="https://recgonda.ac.in/Content/img/aktu.png" height="100" style={{ marginLeft: "15px", marginRight: "15px" }} />
          <img src="https://recgonda.ac.in/Content/img/scape/MDI.png" alt="Make in India" height="90" style={{ marginRight: "15px" }} />
        </div>
      </div>

      {/* Navigation Bar */}
      <div style={{
        backgroundColor: "#800000",
        color: "white",
        display: "flex",
        justifyContent: "center",
        padding: "10px 0",
        fontSize: "15px"
      }}>
        {[
          { name: "HOME", link: "#" },
          { name: "ABOUT REC", link: "#" },
          { name: "GOVERNANCE", link: "#" },
          { name: "ACADEMICS", link: "#" },
          { name: "DEPARTMENTS", link: "#" },
          { name: "PLACEMENT CELL", link: "#" },
          { name: "STUDENTS", link: "#" },
          { name: "FACULTY & RESEARCH", link: "#" },
          { name: "IQAC", link: "#" },
          { name: "EXAMINATION & RESULTS", link: "#" },
          { name: "SMART CANTEEN", link: "/home" },
          { name: "CONTACT US", link: "#" }
        ].map((item, index) => (
          <Link
            key={index}
            to={item.link}
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0 5px",
              fontWeight: "bold"
            }}
          >
            {item.name} {index < 11 ? "|" : ""}
          </Link>
        ))}
      </div>

      {/* Carousel */}
      <div className="carousel-wrapper" style={{ position: 'relative' }}>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" style={{ position: 'relative', height: '600px' }}>
              <img 
                src="https://recgonda.ac.in/Content/img/collegeimg.jpg" 
                className="d-block w-100" 
                alt="College Main Building"
                style={{ 
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.5)'
                }}
              />
              <div style={{ 
                position: 'absolute',
                bottom: '25%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                color: 'white',
                textAlign: 'center',
                padding: '0 20px'
              }}>
                <h1 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
                  Welcome To Maa Pateshwari Devi, Rajkiya Engineering College, Gonda
                </h1>
                <p style={{ 
                  fontSize: '18px',
                  margin: 0,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}>
                  REC Gonda blends modern education with traditional values.
                </p>
              </div>
            </div>
            <div className="carousel-item" style={{ position: 'relative', height: '600px' }}>
              <img 
                src="https://recgonda.ac.in/Content/img/image/gl3.jpg" 
                className="d-block w-100" 
                alt="Education Excellence"
                style={{ 
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.5)'
                }}
              />
              <div style={{ 
                position: 'absolute',
                bottom: '25%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                color: 'white',
                textAlign: 'center',
                padding: '0 20px'
              }}>
                <h1 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
                  Education Par Excellence
                </h1>
                <p style={{ 
                  fontSize: '18px',
                  margin: 0,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}>
                  REC: A global leader in Education and knowledge.
                </p>
              </div>
            </div>
            <div className="carousel-item" style={{ position: 'relative', height: '600px' }}>
              <img 
                src="https://recgonda.ac.in/Content/img/image/col3.jpg" 
                className="d-block w-100" 
                alt="College Campus"
                style={{ 
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.5)'
                }}
              />
              <div style={{ 
                position: 'absolute',
                bottom: '25%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                color: 'white',
                textAlign: 'center',
                padding: '0 20px'
              }}>
                <h1 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
                  Excellence in Education
                </h1>
                <p style={{ 
                  fontSize: '18px',
                  margin: 0,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}>
                  Shaping the future through quality education.
                </p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" style={{ width: '5%' }}>
            <span className="carousel-control-prev-icon" aria-hidden="true" style={{ width: '40px', height: '40px' }}></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" style={{ width: '5%' }}>
            <span className="carousel-control-next-icon" aria-hidden="true" style={{ width: '40px', height: '40px' }}></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div style={{ height: "50px", backgroundColor: "white" }}></div>

      {/* Notice */}
      <div className="d-flex">
        <div className="col-md-2 text-light" style={{ backgroundColor: "darkred", padding: "10px", fontSize: "20px", fontWeight: "bold" }}>
          Announcements
        </div>
        <div className="col-md-10 bg-light text-primary">
          <marquee behavior="scroll" scrollamount="5" direction="left" onMouseOver={(e) => e.target.stop()} onMouseOut={(e) => e.target.start()} style={{ paddingTop: "10px" }}>
            <a style={{ textDecoration: "none", color: "black", paddingTop: "10px" }} href="https://bnmc.ac.in/web/public/uploads/notice/d5d1f4664d4bab4e98ffb9b86c000c15.pdf" target="_blank">
              Rajkiya Engineering Gonda Guest Faculty Recruitment for Academic Session 2025-26 || Quotation Notice- Date: 26/05/2025 ||
            </a>
          </marquee>
        </div>
      </div>

      {/* College Info Section */}
      <section style={{ padding: "40px 20px", background: "#ffffff" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px" }}>
          {/* Left Text Content */}
          <div style={{ flex: "1 1 60%" }}>
            <h2 style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#9a0e0e",
              borderLeft: "4px solid #9a0e0e",
              paddingLeft: "5px",
              marginBottom: "20px",
              marginLeft: "80px"
            }}>
              Maa Pateshwari Devi, Rajkiya Engineering College, Gonda
            </h2>
            <p style={{ fontSize: "16px", color: "#333", lineHeight: 1.7, textAlign: "justify", marginLeft: "80px" }}>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...
              The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',
              making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
              and a search for 'lorem ipsum' will uncover many websites still in their infancy. Various versions have evolved over the years,
              sometimes by accident, sometimes on purpose (injected humour and the like). and web page editors now use Lorem Ipsum as their default model text,
              and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,
              sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
          </div>

          {/* Right Image */}
          <div style={{ flex: "1 1 35%", display: "flex", justifyContent: "center" }}>
            <img
              src="https://recgonda.ac.in/Content/img/collegeimg.jpg"
              alt="Campus"
              style={{
                width: "100%",
                maxWidth: "400px",
                borderRadius: "12px",
                border: "8px solid #fff",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
              }}
            />
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section style={{ background: "#800000", padding: "40px 20px", color: "white", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "30px" }}>Our Mentors</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
          {/* Mentor Cards */}
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {[
              {
                img: "https://recgonda.ac.in/Content/img/Govermer.jpg",
                name: "Smt. Anandiben Patel",
                role: "Hon'ble Governor\nUttar Pradesh"
              },
              {
                img: "https://recgonda.ac.in/Content/img/yogiji.jpg",
                name: "Shri Yogi Adityanath",
                role: "Hon'ble Chief Minister\nUttar Pradesh"
              },
              {
                img: "https://recgonda.ac.in/Content/img/minister.jpg",
                name: "Shri Ashish Patel",
                role: "Hon'ble Minister of Technical\nEducation"
              },
              {
                img: "https://recgonda.ac.in/Content/img/Prof%20JP%20Pandey.jpg",
                name: "Prof. J. P. Pandey",
                role: "Vice Chancellor, AKTU\nUttar Pradesh"
              }
            ].map((mentor, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  color: "black",
                  borderRadius: "8px",
                  padding: "20px",
                  width: "250px",
                  height: "250px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                }}
              >
                <img
                  src={mentor.img}
                  alt={mentor.name}
                  style={{
                    borderRadius: "50%",
                    width: "120px",
                    height: "120px",
                    marginBottom: "10px",
                    border: "4px solid darkred"
                  }}
                />
                <p style={{ fontWeight: "bold", marginBottom: "5px", color: "darkred" }}>{mentor.name}</p>
                <p style={{ fontSize: "14px", margin: 0, color: "gray" }}><b>{mentor.role}</b></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director Message Section */}
      <section style={{ padding: "40px 20px", background: "#fff" }}>
        <h2 style={{
          color: "#9a0e0e",
          borderLeft: "4px solid #9a0e0e",
          paddingLeft: "10px",
          fontWeight: "bold",
          fontSize: "22px",
          marginBottom: "20px",
          marginLeft: "110px"
        }}>
          Director Message
        </h2>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          background: "#fff",
          border: "1px solid #ddd",
          padding: "20px",
          alignItems: "flex-start"
        }}>
          {/* Director Photo */}
          <div style={{ flex: "1 1 30%", paddingRight: "20px", textAlign: "center" }}>
            <img
              src="https://recgonda.ac.in/Content/img/image/dir.jpg"
              alt="Director Photo"
              style={{ width: "100%", maxWidth: "280px", borderRadius: "8px" }}
            />
            <p style={{ marginTop: "10px", fontWeight: "bold", color: "#800000", fontSize: "16px" }}>
              Prof. Yogesh Kumar Chauhan
            </p>
            <p style={{ fontSize: "14px", color: "#555", marginTop: "-5px" }}>
              Director of Rajkiya Engineering College, Gonda
            </p>
          </div>

          {/* Message Text */}
          <div style={{ flex: "1 1 65%", fontSize: "16px", lineHeight: 1.8, color: "#333", textAlign: "justify" }}>
            <p style={{ color: "#800000", fontWeight: "bold", marginBottom: "10px" }}>Dear Students,</p>
            <p>
              Welcome to Rajkiya Engineering College, Gonda! As the Director, I'm honored to lead an institution focused on
              academic excellence, innovation, and holistic development. Education is the key to a meaningful life, and at
              REC Gonda, we equip students with the knowledge, skills, and values to succeed in a rapidly evolving world.
              We strive to shape not only skilled engineers but responsible citizens and visionary leaders who contribute
              to society. Our dedicated faculty foster a learning environment that promotes creativity, curiosity, and
              critical thinking. With modern infrastructure and advanced labs, REC Gonda provides the perfect platform
              for you to realize your dreams.
            </p>
            <p>
              Dear students, success comes to those who dream big and work hard. Embrace challenges, stay disciplined, and
              never stop learning. Your attitude and efforts will determine your success. To the parents, thank you for
              trusting us with your child's future. Together, we'll help them excel.
            </p>
            <p style={{ fontWeight: "bold" }}>Wishing you all a successful journey ahead!</p>
          </div>
        </div>
      </section>

      {/* Features & Facilities Section */}
      <section className="text-center text-white py-5" style={{ backgroundColor: "#800000" }}>
        <h2 className="fw-bold mb-4">Features & Facilities</h2>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {[
            {
              img: "https://thumbs.dreamstime.com/b/computer-lab-neatly-placed-rows-42239974.jpg",
              title: "💻 Computer Center"
            },
            {
              img: "https://cdn.wallpapersafari.com/76/44/9splMe.jpg",
              title: "📚 Library"
            },
            {
              img: "https://recgonda.ac.in/Content/img/image/col1.jpg",
              title: "🎯 Curricular Activities"
            },
            {
              img: "https://wallpaperaccess.com/full/1445474.jpg",
              title: "🌐 24×7 Internet"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white text-dark rounded shadow p-2" style={{ width: "300px", height: "250px" }}>
              <img
                src={feature.img}
                alt={feature.title}
                className="img-fluid rounded"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <p className="fw-bold mt-2" style={{ color: "darkred" }}>{feature.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Courses Section */}
      <section className="text-center py-5" style={{ backgroundColor: "#f9f9f9" }}>
        <h2 className="fw-bold mb-4" style={{ color: "#800000" }}>Our Courses</h2>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {[
            {
              img: "https://img.freepik.com/premium-photo/engineer-hardhat-studying-blueprints_148840-24389.jpg",
              title: "Civil Engineering"
            },
            {
              img: "https://st.depositphotos.com/1034582/3689/i/450/depositphotos_36892243-stock-photo-gears.jpg",
              title: "Mechanical Engineering"
            },
            {
              img: "https://th.bing.com/th/id/R.4ebfac63dc1e26d9cfed923df88e755e?rik=jRRetMJPCfva9g&riu=http%3a%2f%2fwww.kuce.ac.in%2fimages%2fsampledata%2ffruitshop%2fit.jpg&ehk=DOIygtWbXcVy9fjK7iBO7THqzlQ9UedByCxGfi7RQQ0%3d&risl=&pid=ImgRaw&r=0",
              title: "Computer Science"
            },
            {
              img: "https://wallpaperbat.com/img/9730880-electrical-engineering-bootcamp-bundle.jpg",
              title: "Electrical Engineering"
            }
          ].map((course, index) => (
            <div key={index} className="bg-white rounded shadow" style={{ width: "300px", height: "300px" }}>
              <img
                src={course.img}
                alt={course.title}
                className="img-fluid"
                style={{ height: "200px", objectFit: "cover", width: "100%" }}
              />
              <div className="p-3">
                <h4>{course.title}</h4>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "maroon" }}>Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements Section */}
      <div style={{ background: "#800000", padding: "40px 20px", color: "white" }}>
        <h2 className="text-center mb-4">Announcements</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "30px", gap: "20px" }}>
          {/* Circulars & Notices */}
          <div className="bg-white text-dark" style={{ width: "450px", height: "400px", padding: "15px", borderRadius: "6px" }}>
            <div className="text-center fw-bold" style={{ background: "#FFC107", padding: "5px" }}>
              Circulars & Notices
            </div>
            <div className="mt-3" style={{ height: "330px" }}>
              <marquee direction="up" scrollamount="2" style={{ height: "100%" }}>
                {[
                  "Second Year Registration Form - Last date extended to August 30th",
                  "AFFIDAVIT _ ANTI RAGGING - Submit by August 25th",
                  "Semester Registration Process Starting from September 1st",
                  "Important Notice: Fee Payment for Fall Semester",
                  "Campus Placement Drive - Register by August 28th",
                  "Workshop on AI/ML - Limited Seats Available"
                ].map((notice, index) => (
                  <div key={index} className="mb-4">
                    <p className="fw-bold mb-1">{notice}</p>
                    <a href="#" className="text-primary text-decoration-none">📄 Download File</a>
                  </div>
                ))}
              </marquee>
            </div>
          </div>

          {/* Events and News */}
          <div className="bg-white text-dark" style={{ width: "450px", height: "400px", padding: "15px", borderRadius: "6px" }}>
            <div className="text-center fw-bold" style={{ background: "#FFC107", padding: "5px" }}>
              Events And News
            </div>
            <div className="mt-3" style={{ height: "330px" }}>
              <marquee direction="up" scrollamount="2" style={{ height: "100%" }}>
                {[
                  "Annual Tech Fest 'Innovate 2025' - September 15-17",
                  "Cultural Week Celebrations - Starting October 1st",
                  "National Conference on Emerging Technologies",
                  "Sports Meet 2025 - Registration Open",
                  "Industry Expert Talk Series - Every Wednesday",
                  "Campus Recruitment Drive - Top Companies Visiting"
                ].map((event, index) => (
                  <div key={index} className="mb-4">
                    <p className="fw-bold mb-1">{event}</p>
                    <a href="#" className="text-primary text-decoration-none">Read More →</a>
                  </div>
                ))}
              </marquee>
            </div>
          </div>

          {/* News & e-Tenders */}
          <div className="bg-white text-dark" style={{ width: "450px", height: "400px", padding: "15px", borderRadius: "6px" }}>
            <div className="text-center fw-bold" style={{ background: "#FFC107", padding: "5px" }}>
              News & e-Tenders
            </div>
            <div className="mt-3" style={{ height: "330px" }}>
              <marquee direction="up" scrollamount="2" style={{ height: "100%" }}>
                {[
                  "E-tender for Laboratory Equipment - Last Date Aug 30",
                  "College Ranked in Top 50 Technical Institutions",
                  "MoU Signed with Industry Leaders",
                  "New Research Center Inauguration",
                  "Student Achievements in National Competitions",
                  "Faculty Research Paper Publications"
                ].map((news, index) => (
                  <div key={index} className="mb-4">
                    <p className="fw-bold mb-1">{news}</p>
                    <a href="#" className="text-primary text-decoration-none">View Details →</a>
                  </div>
                ))}
              </marquee>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <section className="py-5 bg-white">
        <h2 className="text-center mb-4" style={{ fontSize: "28px", color: "#800000" }}>Recent Activities</h2>
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {[
              { img: "https://recgonda.ac.in/Content/img/image/gl1.jpg", title: "Winning Moment" },
              { img: "https://recgonda.ac.in/Content/img/image/gl2.jpg", title: "Cultural Events" },
              { img: "https://recgonda.ac.in/Content/img/image/gl3.jpg", title: "Workshop" },
              { img: "https://recgonda.ac.in/Content/img/image/gl4.jpg", title: "Sports Events" }
            ].map((activity, index) => (
              <div key={index} className="position-relative" style={{ width: "310px", height: "200px" }}>
                <img
                  src={activity.img}
                  alt={activity.title}
                  className="img-fluid rounded shadow-sm"
                  style={{ width: "100%", height: "88%", objectFit: "cover" }}
                />
                <div className="w-100 text-center text-white p-2" style={{ 
                  background: "rgba(0,0,0,0.6)",
                  position: "absolute",
                  bottom: "12%"
                }}>
                  <p className="mb-0 fw-bold">{activity.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white" style={{ backgroundColor: "#800000" }}>
        <div className="container py-5">
          <div className="row g-4">
            {/* Contact Info */}
            <div className="col-lg-3 col-md-6">
              <h5 className="mb-4 fw-bold">Contact Info</h5>
              <div className="d-flex flex-column gap-2">
                <div>
                  <i className="fas fa-map-marker-alt me-2"></i>
                  123 College Road, City, State - 123456
                </div>
                <div>
                  <i className="fas fa-phone me-2"></i>
                  +91 1234567890
                </div>
                <div>
                  <i className="fas fa-envelope me-2"></i>
                  info@college.ac.in
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-3 col-md-6">
              <h5 className="mb-4 fw-bold">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">About Us</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Academics</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Admissions</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Campus Life</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Research</a></li>
              </ul>
            </div>

            {/* Important Links */}
            <div className="col-lg-3 col-md-6">
              <h5 className="mb-4 fw-bold">Important Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">AICTE</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">UGC</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">DTE</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">University</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">RTI</a></li>
              </ul>
            </div>

            {/* Connect With Us */}
            <div className="col-lg-3 col-md-6">
              <h5 className="mb-4 fw-bold">Connect With Us</h5>
              <div className="d-flex gap-3 fs-4">
                <a href="#" className="text-white"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-white"><i className="fab fa-youtube"></i></a>
              </div>
              <div className="mt-4">
                <h6 className="mb-3">Subscribe to Newsletter</h6>
                <div className="input-group">
                  <input type="email" className="form-control" placeholder="Enter your email" />
                  <button className="btn btn-warning" type="button">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-3" style={{ backgroundColor: "#600000" }}>
          <p className="mb-0">© {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default SuperHomePage
