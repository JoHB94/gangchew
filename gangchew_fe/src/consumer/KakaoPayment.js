import React, { useEffect } from 'react';
import axios from 'axios';

const KakaoPayment = ({ fundingId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const price = 0;
      const IMP = window.IMP;
      IMP.init('imp67011510');

      // ...

      document.addEventListener('click', (event) => {
        if (event.target && event.target.id === 'joinFundingButton') {
          const id = event.target.getAttribute('data-funding-id');
          const confirmed = window.confirm('확인을 누르시면 결제창으로 이동합니다. (결제 후 펀딩 참여 확정)');
          if (confirmed) {
            IMP.request_pay({
              pg: 'kakaopay.TC0ONETIME',
              merchant_uid: 'merchant_' + new Date().getTime(),
              name: '강츄 펀딩 결제',
              amount: price,
              buyer_email: 'Iamport@chai.finance',
              buyer_name: '아임포트 기술지원팀',
              buyer_tel: '010-1234-5678',
              buyer_addr: '서울특별시 강남구 삼성동',
              buyer_postcode: '123-456',
            }, (rsp) => {
              if (rsp.success) {
                console.log(rsp);
                axios.get('/login/cookie')
                  .then((cookieResponse) => {
                    const data = cookieResponse.data;
                    const msg = data.message;
                    const isSuccess = data.isSuccess;
                    let jwtToken = '';

                    if (isSuccess === true) {
                      jwtToken = data.result;
                    }
                    axios.get(`/participants/join?funding=${id}`, {
                      headers: {
                        Authorization: `Bearer ${jwtToken}`,
                      },
                    }).then((joinResponse) => {
                      const data = joinResponse.data;
                      const msg = data.message;
                      const isSuccess = data.isSuccess;
                      const confirmed_result = window.confirm(data.message);
                      console.log(data);

                      if (confirmed_result) {
                        console.log(data.result);
                      }
                      // handle success or failure
                    }).catch((error) => {
                      console.error('Error:', error);
                    });
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  });
              } else {
                console.log(rsp);
              }
            });
          }
        }
      });
    };
  }, [fundingId]);

  return <div>KakaoPayment</div>;
};

export default KakaoPayment;





