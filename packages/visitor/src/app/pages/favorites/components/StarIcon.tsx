import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarIcon = () => {
  const [filled, setFilled] = useState(false);

  const handleClick = () => {
    setFilled(!filled);
  };

  return (
    <div onClick={handleClick}>
      {filled ? <FaStar color="gold" size={20} /> : <FaStar color="gray" size={20}/>}
    </div>
  );
};

export default StarIcon;
