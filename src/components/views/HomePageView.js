/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import '../../styles/globalStyles.css';
//import homepageImg from '/homepageimg.jpg';

const HomePageView = () => {
  // Render Home page view
  return (
    <div >
      <h1>Welcome to Campus Management System!</h1>
      <h4>Transforming higher education administration with premier
        tools and cutting edge tech to inspire excellence in campus and student management.</h4>
      <img src="/homepageimg.jpeg" alt="Homepage" className="homepage-img" />
      <p className="info-box-homepage">Campus Management System empowers higher education administrators to efficiently 
        create and manage campuses and students in one seamless platform. 
        With the ability to associate students to specific campuses, 
        the Campus Management System ensures accurate and organized storage and indexing. 
        With our intuitive platform, student body management is a cinch! Providing easy indexing 
        and access to vital information about both campuses and students. 
        With Campus Management System, your higher education administartors will
        streamline tasks, reduce office paperwork and foster a more 
        efficient administrative body.</p>
    </div>
  );    
}

export default HomePageView;
 