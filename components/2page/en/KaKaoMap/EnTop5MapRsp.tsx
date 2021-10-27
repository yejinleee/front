/*global kakao */
import axios from 'axios';
import React, { FC, useEffect, useRef, useState } from 'react';
import '../../Top5Mapevent.css';
import { History, LocationState } from 'history';
import EnLiketop5 from '@components/2page/en/Like/EnLiketop5';
import Liketop5 from '@components/2page/ko/Like/Liketop5';
import EnContainer from '@components/1page/en/Container/EnContainer';

interface Props {
  top5data: any;
  top5name: any;
  imageSrc: any;
  top5placeid: any;
  placeurl:any;
  history: History<LocationState>;
}

const EnTop5MapeventRsp: FC<Props> = (props: Props) => {
  const latt = useRef(0);
  const long = useRef(0);
  const kakao = (window as any).kakao;
  useEffect(() => {
    props.top5data !== [] && mapscript();
  }, [props.top5data]);

  const mapscript = () => {
    props.top5data.forEach((el: any) => {
      latt.current += el.location_y;
      long.current += el.location_x;
    });

    let container = document.getElementById('top5map_rsp');
    let options = {
      center: new kakao.maps.LatLng(latt.current / props.top5data.length, long.current / props.top5data.length),
      level: 10,
    };
    //map
    const top5map = new kakao.maps.Map(container, options);

    props.top5data.forEach((el: any) => {
      // 마커를 생성합니다
      var imageSize = new kakao.maps.Size(30, 30),
        imageOption = { offset: new kakao.maps.Point(27, 69) };
      const markerImage = new kakao.maps.MarkerImage(props.imageSrc, imageSize, imageOption);
      const marker = new kakao.maps.Marker({
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.location_y, el.location_x),
        //이미지 마커 불러오기
        image: markerImage,
        // content: el.title,
      });

      marker.setMap(top5map);
      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: `<span class="info-title">${el.name}</span>`, // 인포윈도우에 표시할 내용
      });
      infowindow.open(top5map, marker);
      var infoTitle = document.querySelectorAll('.info-title');
      infoTitle.forEach(function (e: any) {
        var w = e.offsetWidth + 10;
        var ml = w / 2;
        e.parentElement.style.top = '82px';
        e.parentElement.style.left = '50%';
        e.parentElement.style.marginLeft = -ml + 'px';
        e.parentElement.style.width = w + 'px';
        e.parentElement.previousSibling.style.display = 'none';
        e.parentElement.parentElement.style.border = '0px';
        e.parentElement.parentElement.style.background = 'unset';
      });
      infowindow.close();
      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(top5map, marker, infowindow));
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    });

    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    function makeOverListener(map: any, marker: any, infowindow: { open: (arg0: any, arg1: any) => void }) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    function makeOutListener(infowindow: { close: () => void }) {
      return function () {
        infowindow.close();
      };
    }
  };

  return (
    <>
      <div id="top5map_rsp" style={{ width: '100%', height: '50%' }}></div>
      <div className="liketop5_div">
        <EnLiketop5
          top5name={props.top5name}
          top5placeid={props.top5placeid}
          history={props.history}
          placeurl={props.placeurl}
        />
      </div>
    </>
  );
};

export default EnTop5MapeventRsp;
