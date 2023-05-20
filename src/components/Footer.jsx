import styled from 'styled-components';

const StyledFooter = styled.footer`
display: flex;
justify-content: space-between;
align-items:center ;
background-color:#222;
color:#fff ;
padding: 10px;
text-decoration:none;
height:100px;
  `;
const Footer = () => {
  return (  
    <StyledFooter>
      <div>
        <a href="#" style={{ color: '#fff', textDecoration: 'none' }}> CHAT ROOM</a>
        <span style={{ margin: '0 10px' }}>|</span>
        <a href="#"> About As </a>
        <a href="#"> Contact Us </a>
        <a href="#"> Jobs </a>
        <a href="#"> Help </a>
      </div>
      <div>
  <a href="https://www.facebook.com">
    <i className="fab fa-facebook fa-lg" style={{ marginRight: '20px' }}></i>
  </a>
  <a href="https://www.twitter.com">
    <i className="fab fa-twitter fa-lg" style={{ marginRight: '20px' }}></i>
  </a>
  <a href="https://www.instagram.com">
    <i className="fab fa-instagram fa-lg" style={{ marginRight: '20px' }}></i>
  </a>
  <a href="https://www.youtube.com">
    <i className="fab fa-youtube fa-lg" style={{ marginRight: '20px' }}></i>
  </a>
</div>
    </StyledFooter>
  );
}
 
export default Footer;