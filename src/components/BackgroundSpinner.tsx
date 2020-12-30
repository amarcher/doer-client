import React from 'react';

import './BackgroundSpinner.css';

type Props = {
  children: React.ReactNode;
  width?: number;
  height?: number;
};

export default function BackgroundSpinner({ children }: Props) {
  return (
    <div className="BackgroundSpinner__body">
      <div className="BackgroundSpinner__container">
        <div className="BackgroundSpinner__rotating"></div>
        <div className="BackgroundSpinner__content">
          <div className="BackgroundSpinner__box BackgroundSpinner__big">
            This is where content goes
          </div>
          <div className="BackgroundSpinner__box BackgroundSpinner__small">
            More content here. More content here. More content here. More
            content here. More content here. More content here. More content
            here. More content here. More content here.
          </div>
          <div className="BackgroundSpinner__box">
            <img
              src="data:image/png;base64,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"
              width="100px"
              height="400px"
              alt=""
            />
          </div>
          <div className="BackgroundSpinner__box">
            This is where content goes. This is where content goes. This is
            where content goes. This is where content goes. This is where
            content goes. This is where content goes. This is where content
            goes. This is where content goes. This is where content goes. This
            is where content goes. This is where content goes. This is where
            content goes. This is where content goes. This is where content
            goes.
          </div>
        </div>
      </div>
    </div>
  );
}
