import React from 'react';
import stl from './Frame.module.css'

type PropsType = {
  children:  React.ReactNode
}
export const Frame = (props:PropsType) => {
  return (
    <div className={stl.wrapper}>
      <div className={stl.frame}>
        {props.children}
      </div>
    </div>
  );
};
