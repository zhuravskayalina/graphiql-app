import { useEffect, useState } from 'react';

export function useWindowWidth(container: number | undefined) {
  const [width, setWidth] = useState(container);

  useEffect(() => {
    const resize = () => {
      const bodyWidth = document.body.getBoundingClientRect().width;
      // if (bodyWidth > 1700) {
      //   setWidth(bodyWidth / 2.2);
      // } else if (bodyWidth > 1500) {
      //   setWidth(bodyWidth / 2.25);
      // } else if (bodyWidth > 1300) {
      //   setWidth(bodyWidth / 2.3);
      // } else if (bodyWidth > 1140) {
      //   setWidth(bodyWidth / 2.35);
      // } else if (bodyWidth > 1010) {
      //   setWidth(bodyWidth / 2.4);
      // } else if (bodyWidth > 910) {
      //   setWidth(bodyWidth / 2.45);
      // } else if (bodyWidth > 850) {
      //   setWidth(bodyWidth / 2.5);
      // } else if (bodyWidth > 810) {
      //   setWidth(bodyWidth / 2.6);
      // } else if (bodyWidth <= 810 && bodyWidth > 800) {
      //   setWidth(bodyWidth / 2.65);
      // } else if (bodyWidth === 800) {
      //   setWidth(bodyWidth / 1.2);
      // } else if (bodyWidth > 650) {
      //   setWidth(bodyWidth / 1.2);
      // } else if (bodyWidth > 550) {
      //   setWidth(bodyWidth / 1.25);
      // } else if (bodyWidth > 460) {
      //   setWidth(bodyWidth / 1.3);
      // } else if (bodyWidth > 410) {
      //   setWidth(bodyWidth / 1.35);
      // } else if (bodyWidth > 380) {
      //   setWidth(bodyWidth / 1.4);
      // } else if (bodyWidth > 340) {
      //   setWidth(bodyWidth / 1.45);
      // } else {
      //   setWidth(bodyWidth / 1.5);
      // }
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  });

  return [width];
}
