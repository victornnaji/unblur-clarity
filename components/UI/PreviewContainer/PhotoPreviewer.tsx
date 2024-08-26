'use client';

import React, { useState } from "react";
import PhotoCompare from "../PhotoCompare";
import Toggle from "../Toggle";

const PhotoPreviewer = () => {
  const [sideBySide, setSideBySide] = useState(false);
  const toggleSwitch = () => setSideBySide(!sideBySide);

  return (
    // <PhotoCompare
    //   leftImage="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-1.jpg"
    //   rightImage="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-2.jpg"
    //   leftAlt="Left Image"
    //   rightAlt="Right Image"
    //   className="h-96"
    // />
    <div>
      <div className="flex items-center justify-center slider">
          <span className={!sideBySide ? 'text-zinc-600' : 'text-foreground'}>
            Compare
          </span>
          <Toggle
            initialState={sideBySide}
            onToggle={toggleSwitch}
            className={'mx-3'}
          />
          <span className={sideBySide ? 'text-red-900' : 'text-foreground'}>
            Side by Side
          </span>
        </div>
    </div>
  );
};

export default PhotoPreviewer;
