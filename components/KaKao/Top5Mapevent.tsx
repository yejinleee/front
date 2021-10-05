/*global kakao */
import axios from 'axios';
import React, { FC, useEffect, useRef, useState } from 'react';
import { markerdata } from './MarkerData';
import './Top5Mapevent.css';

interface Props {
  top5data: any;
  top5name: any;
}

const Top5Mapevent: FC<Props> = ({ children, top5data,top5name }) => {
  const latt = useRef(0);
  const long = useRef(0);
  const kakao = (window as any).kakao;
  // console.log(top5data);
  useEffect(() => {
    top5data !== [] && mapscript();
  }, [top5data]);

  const mapscript = () => {
    // top5data.map((el: any, index: number) => {
    //   latt.current += el[index].location_x;
    //   long.current += el[index].location_y;
    //   console.log(el[index].name);
    // });
    top5data.forEach((el: any) => {
      latt.current += el.location_y;
      long.current += el.location_x;
    });

    let imageSrc = '/src/icon/식당핀.png';
    let container = document.getElementById('top5map');
    let options = {
      center: new kakao.maps.LatLng(latt.current / 5, long.current / 5),
      level: 10,
    };
    //map
    const top5map = new kakao.maps.Map(container, options);

    top5data.forEach((el: any) => {
      // 마커를 생성합니다
      var imageSize = new kakao.maps.Size(30, 30),
        imageOption = { offset: new kakao.maps.Point(27, 69) };

      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
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
        content: el.name, // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
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

  var unfull = '/src/icon/star.png';
  var full = '/src/icon/fullstar.png';
  var [star, setStar] = useState('/src/icon/star.png');
  top5data.map((v:any, i:number)=>{
    // console.log('!',v.name);
  })
  function getCheckboxValue(e:any)  {
    let result = '';
    if(e.target.checked)  {
      result = '💛'
    }else {
      result = '🤍';
    }
    // @ts-ignore
    document.getElementById('result').innerText
      = result;
  }

  const [like0,setLike0] = useState(false);
  const [like1,setLike1] = useState(false);
  const [like2,setLike2] = useState(false);
  const [like3,setLike3] = useState(false);
  const [like4,setLike4] = useState(false);

  function ma(){
      return (
        <>
          <input type="checkbox" className="cate" id="cate_li" onClick={(() => {setLike1(!like1)})} value="편의점" />
          <label className="custom" htmlFor="cate_li">
            <span id="result">{like1 ?'💛' : '🤍'}</span>
            <span className="cate_1">{top5name[0]}</span>
          </label>
        </>
      );
  }
  return (
    <div style={{ position: 'relative' }}>
      <div id="star"></div>
      <div id="top5map" style={{ width: '50vw', height: '40vw', display: 'inline-block' }}></div>

      {/*즐겨찾기랑 장소명들*/}

      <span style={{ position: 'absolute'}}>
        {/*<img className="star" id="currentClick" onClick={() => funcfull()} src={star}/>*/}
        {/*<img className="star" id="currentClick" onClick={() => (star === full ? setStar(unfull) : setStar(full))} src={star}/>*/}
        {/*<p className="place_info"> 장소</p>*/}

        {/*{ma()}*/}

        <ul>
          <li className = "icon_li custom-control">
              <input type="checkbox" className="cate" id="listidx0" onClick={(() => {setLike0(!like0)})} value="0" />
              <label className="custom" htmlFor="listidx0">
                  <span id="result">{like0 ?'💛' : '🤍'}</span>
                  <span>{top5name[0]}</span>
              </label>
          </li>
          <li className = "icon_li custom-control">
              <input type="checkbox" className="cate" id="listidx1" onClick={(() => {setLike1(!like1)})} value="1" />
              <label className="custom" htmlFor="listidx1">
                  <span id="result">{like1 ?'💛' : '🤍'}</span>
                  <span> {top5name[1]}</span>
              </label>
          </li>
          <li className = "icon_li custom-control">
              <input type="checkbox" className="cate" id="listidx2" onClick={() => {setLike2(!like2)}} value="2" />
              <label className="custom" htmlFor="listidx2">
                  <span id="result">{like2 ?'💛' : '🤍'}</span>
                  <span> {top5name[2]}</span>
              </label>
          </li>
          <li className = "icon_li custom-control">
              <input type="checkbox" className="cate" id="listidx3" onClick={() => {setLike3(!like3)}} value="3" />
              <label className="custom" htmlFor="listidx3">
                  <span id="result">{like3 ?'💛' : '🤍'}</span>
                  <span> {top5name[3]}</span>
              </label>
          </li>
          <li className = "icon_li custom-control">
              <input type="checkbox" className="cate" id="listidx4" onClick={() => {setLike4(!like4)}} value="4" />
              <label className="custom" htmlFor="listidx4">
                  <span id="result">{like4 ?'💛' : '🤍'}</span>
                  <span> {top5name[4]}</span>
              </label>
          </li>
        </ul>

      </span>
    </div>
  );

  //글자부분
  // right: 400;
  // position: absolute;
  // top: 0;

  // {markerdata.map((e:any,idx:any) => {
  //   console.log(e.title);
  //   <p key={idx}>{e.title}</p>
  // })}
};

export default Top5Mapevent;
