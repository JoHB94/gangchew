// import TitleTextFields from "../component/inputs/TitleTextFields";



// export default function DaumAddress({name,handleInputChange}){


//     const [address, setaddress] = useState("");
//     const scriptUrl =
//     "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
//     const open = useDaumPostcodePopup(scriptUrl); //open함수 정의

//     const handleComplete = (data) => {
//         let fullAddress = data.address;
//         let extraAddress = "";

//         if (data.addressType === "R") {
//         if (data.bname !== "") {
//             extraAddress += data.bname;
//         }
//         if (data.buildingName !== "") {
//             extraAddress +=
//             extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
//         }
//         fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
//         }

//         setaddress(fullAddress); // 주소 데이터 수집
//         handleInputChange(name,address);
//      };

//     return(
//         <div>
//             <TitleTextFields/>
//         </div>
//     )
// }