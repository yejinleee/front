import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import useSWR from 'swr';
import useInput from '@pages/Signup/useinput';
import { Link } from 'react-router-dom';
import Layout from '@layouts/Layouts';
import fetcher from '@utils/fetcher';
import Sample from './sample';


// const CLIENT_ID = process.env.REACT_APP_KAKAO_KEY;
// const REDIRECT_URI =  "http://localhost:8090/oauth/callback/kakao";

// const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// //JavaScript SDK로 Kakao.Auth.authorize 함수를 호출할 때는 SDK 초기화 시 사용된 JavaScript 키를 사용합니다.
// //하지만 REST API로 토큰 받기를 요청할 때는 REST API 키를 사용해야 합니다.


const LogIn = () => {
  // const { data, error, revalidate } = useSWR('/api/login', fetch); //로그인후에 데이터를 전해줄 api //유저정보가 data에 담길 것임
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log('click login');
      console.log('ID : ', nickname);
      console.log('PW : ', password);
      axios
        .post('/api/login', { nickname, password })
        .then((res) => {
          console.log(res);
          // if (res.data.userId === undefined) {
          //   // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          //   alert('입력하신 id 가 일치하지 않습니다.');
          // } else if (res.data.userId === null) {
          //   // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          //   console.log('======================', '입력하신 비밀번호 가 일치하지 않습니다.');
          //   alert('입력하신 비밀번호 가 일치하지 않습니다.');
          // } else if (res.data.userId === nickname) {
          //   // id, pw 모두 일치 userId = userId1, msg = undefined
          //   console.log('======================', '로그인 성공');
          //   // sessionStorage.setItem('user_id', nickname);
          // }
          // // 작업 완료 되면 페이지 이동(새로고침)
          // document.location.href = '/';
        })
        .catch();
    },
    [nickname, password],
  );

  // useEffect(() => {
  //   axios
  //     .get('/api/login')
  //     .then((res) => console.log(res))
  //     .catch();
  // }, []);

  return (
    <>
      <Layout>
        <Sample />
      </Layout>
    </>
  );
};

export default LogIn;