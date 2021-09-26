import {
  chakra,
  useColorModeValue,
  useToken,
  Heading,
  Box,
} from '@chakra-ui/react';
import { AiTwotoneShop } from 'react-icons/ai';
import * as React from 'react';

export const Logo = props => {
  const [white, black] = useToken('colors', ['white', 'gray.800']);

  return (
    <chakra.svg
      color={useColorModeValue('blue.500', 'blue.300')}
      aria-hidden
      viewBox="0 0 90 24"
      fill="none"
      h="6"
      flexShrink={0}
      {...props}
    >
      <AiTwotoneShop size={24} />
      <text
        x="30"
        y="20"
        style={{ font: 'bold 19px sans-serif' }}
        fill={useColorModeValue(black, white)}
      >
        M-Art
      </text>
    </chakra.svg>
  );
};
