import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import { useState } from "react";

export default function MultipleInteractionCard({carInfo}) {
    const [isFavorited, setIsFavorited] = useState(carInfo.isFavorited || false);
  return (
    <Card variant="soft" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={carInfo.imageUrl}
            loading="lazy"
            alt="Rental car image"
          />
        </AspectRatio>
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color={isFavorited ? "danger" : "primary"} // Change the color based on favorited state
          // Change the color based on favorited state
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            transform: 'translateY(50%)',
          }}
          onClick={() => {
            setIsFavorited(!isFavorited);
          }}
        >
          <Favorite />
        </IconButton>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
            {carInfo.model}
        </Typography>
        <Typography level="body-sm">
            {`${carInfo.mileage} km`}


        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs">{`${carInfo.price} $`}</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">{carInfo.date.toLocaleDateString('en-GB')}</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">2018</Typography>

        </CardContent>
      </CardOverflow>
    </Card>
  );
}