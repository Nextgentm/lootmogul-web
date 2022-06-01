

import NextImage from 'next/image';
import { Box } from '@chakra-ui/react';
 const Image = props => {
    const { src, alt, ...rest } = props;
    return (
      <Box position="relative" {...rest}>
        <NextImage
          objectFit={src ? 'cover' : 'contain'}
          layout="fill"
          src={src ? src : ""}
          alt={alt}
        />
      </Box>
    );
  };

  export default Image;