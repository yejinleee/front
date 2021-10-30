import axios from 'axios';
import React, { FC, useState } from 'react';
interface Props {
  todos: any;
  onRemove: any;
  onClick:any;
  ondeleteClick:any;
  // placeid: any;
  // courseid:any;
  // coursename:any;
  // setName:any;

}

const TodoItemList: FC<Props> = (props: Props) => {
  const [text, setText] = useState('코스');
  var local = sessionStorage.getItem('memberid');
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  try {
    var memberid = Number(local.split('')[1]);
  } catch {
    var memberid = 0;
  }

  var imgsrc = './src/icon/x-mark.png';


  return (
    <>
      <ul className="courselist_ul">
        {props.todos.map((todo: any, i:number) => (
          <>
            { i===0 ?
              <li className="courselist">
                {todo.name}
                <button className="xmark_button" onClick={() => props.onRemove(todo.id)}>
                  <img className="xmarkimg" src={imgsrc} width="15" />
                </button>
              </li>
              :
              <li className="courselist">
                &nbsp;➜ {todo.name}
                <button className="xmark_button" onClick={() => props.onRemove(todo.id)}>
                  <img className="xmarkimg" src={imgsrc} width="15" />
                </button>
              </li>
            }
          </>
        ))}
      </ul>
    </>
  );
};

export default TodoItemList;
