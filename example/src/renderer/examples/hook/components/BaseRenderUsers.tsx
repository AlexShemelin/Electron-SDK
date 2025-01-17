import { VideoCanvas, VideoSourceType } from 'agora-electron-sdk';
import React, { ReactElement, memo } from 'react';

import {
  AgoraCard,
  AgoraList,
  AgoraText,
  RtcSurfaceView,
} from '../../../components/ui';

export interface BaseRenderUsersProps {
  enableVideo: boolean;
  startPreview?: boolean;
  joinChannelSuccess: boolean;
  remoteUsers: number[];
  renderUser?: (user: VideoCanvas) => ReactElement | undefined;
  renderVideo?: (user: VideoCanvas) => ReactElement | undefined;
}

function BaseRenderUsers({
  enableVideo,
  startPreview,
  joinChannelSuccess,
  remoteUsers,
  renderUser = (user) => {
    return (
      <AgoraCard title={`${user.uid} - ${user.sourceType}`}>
        {enableVideo ? (
          <>
            <AgoraText>Click view to mirror</AgoraText>
            {renderVideo(user)}
          </>
        ) : undefined}
      </AgoraCard>
    );
  },
  renderVideo = (user) => <RtcSurfaceView canvas={user} />,
}: BaseRenderUsersProps) {
  return (
    <>
      {!!startPreview || joinChannelSuccess
        ? renderUser({
            uid: 0,
            sourceType: VideoSourceType.VideoSourceCamera,
          })
        : undefined}
      {!!startPreview || joinChannelSuccess ? (
        <AgoraList
          data={remoteUsers}
          renderItem={(item) =>
            renderUser({
              uid: item,
              sourceType: VideoSourceType.VideoSourceRemote,
            })
          }
        />
      ) : undefined}
    </>
  );
}

export default memo(BaseRenderUsers);
