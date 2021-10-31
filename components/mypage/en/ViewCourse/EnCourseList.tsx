import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import EnCoursemap from './EnCoursemap';

const EnCourseList = () => {
  var local = sessionStorage.getItem('memberid');
  try {
    var memberid = Number(local.split('')[1]);
  } catch {
    var memberid = 0;
  }
  const [courseid, setCourseid] = useState();
  const [exist, setExist] = useState(false);
  const [course, setCourese] = useState([] as any);

  useEffect(() => {
    setCourese([]);
    axios
      .get(`/api/en/course/findall/${memberid}`)
      .then(async (response) => {
        setCourese(response.data.data);
      })
      .catch((error) => {});
  }, []);

  const onClick = (id: number) => {
    if (window.confirm('Do you want to delete the course?')) {
      axios
        .delete(`/api/en/course/delete/${id}`)
        .then((response) => {})
        .catch((error) => {});
      alert('The course has been deleted!');
    }
    axios
      .get(`/api/en/course/findall/${memberid}`)
      .then(async (response) => {
        setCourese(response.data.data);
        if (response.data.data.length === 0) {
          setExist(false);
        }
      })
      .catch((error) => {});
  };

  function Likelist({ list, name }: any) {
    return (
      <div className="viewbuttonlist">
        <button
          className="deletebutton"
          onClick={() => {
            setCourseid(list.courseid);
            setExist(true);
          }}
        >
          <p className="deletename">{name}</p>
        </button>
        <button
          className="viewimg"
          onClick={() => {
            onClick(list.courseid);
          }}
        >
          <img className="viewtrashbutton" src="/src/icon/delete-button.png" width="30" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="viewouter">
        {course.map((v: string, index: number) => (
          <Likelist list={course[index]} name={course[index].name} />
        ))}
      </div>
      {exist && <EnCoursemap courseid={courseid} />}
    </>
  );
};
export default EnCourseList;