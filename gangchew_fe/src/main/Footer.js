import '../main/css/Footer.css';

export default function Footer(){

    return(
        <div id="footer_container">
            <div id='footer_section' >
                <h2 style={{textAlign:"center"}}>About Page</h2>
                <div style={{display:"flex",alignContent:"center", width:"100%",justifyContent:"center"}}>
                    <ul style={{listStyle:"none",fontWeight:"700",color:"gray"}}>
                        <li>Made By: Team GangChew</li>
                        <li>Java 기반 DevOps 개발자 양성 훈련과정</li>
                        <li>KOSTA Final Project</li>
                        <li>Seoul, Republic of Korea</li>
                        <li>본 페이지는 실제 서비스되는 페이지가 아닙니다</li>
                    </ul>
                </div>
            </div>
            <div id='footer_section'>
                <h2 style={{textAlign:"center"}}>Contact Us</h2>
                <div style={{display:"flex",alignContent:"center", width:"100%",justifyContent:"center"}}>
                    <ul style={{listStyle:"none",fontWeight:"700",color:"gray"}}>
                        <li>조현빈 - webdp1503@gmail.com</li>
                        <li>가도윤 - bananahoilic7@gmail.com</li>
                        <li>이현주 - olleh1295@gmail.com</li>
                        <li>최 건 - chlrjs1324@gmail.com</li>
                        <li>이지영 - jzero0518@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div id='footer_section'>

            </div>
            <div id='footer_section' style={{display:"flex"}}>
                <img src='/gangchewNukkii.png' style={{objectFit:"cover"}}></img>
            </div>
            
        </div>
    )
}