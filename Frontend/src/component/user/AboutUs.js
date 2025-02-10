import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function AboutUs() {
  return (
<>
    <Tabs
      defaultActiveKey="home"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="home" title="About US">
      The Ministry of Road Transport & Highways (MoRTH) has been facilitating computerization of over 1300+ Road Transport Offices (RTOs) across the country. RTOs issue Registration Certificate (R.C.) & Driving License (D.L.) that are mandatory requirements and are valid across the country, subject to certain provisions and permissions.
<br />
<br />
With wide variations in state policies and manual/ system based procedures being followed across the country, it had become necessary to define same standards for these documents on a pan-India level to ensure interoperability, correctness and timely availability of information. SCOSTA committee setup for this purpose had recommended a uniform standardized software across the country. The Ministry thus entrusted National Informatics Centre (N.I.C.) with the task of standardizing & deploying two softwares - VAHAN for Vehicle Registration and SARATHI for Driving Licenses and of compiling the data with respect to Vehicle Registration and Driving Licenses of all the states in State Register and National Register.The applications VAHAN & SARATHI were conceptualized to capture the functionalities as mandated by Central Motor Vehicle Act, 1988 as well as State motor vehicle Rules with customization in the core product to suit the requirements of 36 States and UTs.
      </Tab>
      <Tab eventKey="profile" title="our vision">
      To improve the quality of service delivery to the citizen and the quality of work environment of the RTOs.
      </Tab>
      <Tab eventKey="longer-tab" title="our mission">
      To automate all Vehicle Registration and Driving License related activities in transport authorities of country with introduction of smart card technology to handle issues like inter state transport vehicle movement and to create state and national level registers of vehicles/DL information
      </Tab>
      <Tab eventKey="contact" title="our objective" >
      To provide :
<br />
1. Better services to Transport Department as well as citizen <br />
2. Quick implementation of government policies from time to time <br />
3. Improved image of Government & Department <br />
4. Instant access of Vehicle/DL information to other government departments <br /> <br />
The latest initiative has been to centralize both these applications for ensuring higher tranparency, security and reliability of operations through a countrywide unified database and provision of a highly citizen and trade centric web enabled environment. The new application being developed would provide for a multi-user environment wherein the end customers (citizens) may be empowered to perform most of the RTO related transactions (including payments) either from the comfort of home or from authorized third party service provider/s in their vicinity. This will also help, to a large extent, in removing the hassles and queues faced by citizens currently (in visiting RTOs for elementary types of transactions),minimizing the extensive paperwork currently being done on the ground and reducing the possibility of middlemen exploiting the uneducated / uninformed citizens. Going forward, mobile based applications would be developed and systems utilizing the Aadhar Based identification would also be integrated with the Unified RTO database for higher security and ease of operations.

With steady steps in direction of achievement of its Vision, Mission and objectives , the ministry is progressing towards provision of improved service access to citizens with quality and efficiency in service delivery, transparency in the system and reduced workload for RTO staff.
      </Tab>
    </Tabs>
   
    <div className="container mt-4">
    <div className="row md-6">
    <h3>Pune RTO office Location</h3>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3291.1152926433183!2d73.8626276263713!3d18.53057719671644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c05c29345c63%3A0xff1ba18a1cf0f716!2sRTO%20Pune!5e0!3m2!1sen!2sin!4v1691389387477!5m2!1sen!2sin" width="600" height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
    
    </iframe>
    <h3 className='mt-4'>Aurangabad RTO office Location</h3>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.0259368883408!2d75.21757728585466!3d19.881126670340862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9a6c3b98e759%3A0xb0815629c3ee9629!2sAurangabad%20Rto!5e0!3m2!1sen!2sin!4v1691389744255!5m2!1sen!2sin" width="600" height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    </div>
    </>
  );
}

export default AboutUs;