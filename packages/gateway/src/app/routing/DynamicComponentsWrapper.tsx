import { ComponentType } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

interface DynamicComponentsWrapperProps {
  components?: ComponentType[];
}

const DynamicComponentsWrapper = ({ components }: DynamicComponentsWrapperProps) => {
  const location = useLocation();
  
  return (
    <>
      {components?.map((Component, index) => (
        <Component key={index} />
      ))}
    </>
  );
};

export default DynamicComponentsWrapper;
  