// import Lottie from 'lottie-react-web';
import { Lottie, ReactLottiePlayingState } from '@crello/react-lottie';
import React, { useState } from 'react';
import animationData from '@lottie/homeAnimation.json';

const HomeAnimation = () => {
  const [Toggle, setToggle] = useState('playing');

  return (
    <div className="w-full">
      <Lottie
        lottieEventListeners={[
          {
            callback: (frame) => {
              if (frame.currentTime > 130) setToggle('paused');
            },
            name: 'enterFrame',
          }]}
        playingState={Toggle as ReactLottiePlayingState}
        config={{
          animationData, loop: false, autoplay: true,
        }}
      />
    </div>
  );
};

export default HomeAnimation;
