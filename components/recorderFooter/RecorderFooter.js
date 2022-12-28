import React, { useState } from 'react';
import styles from './RecorderFooter.module.css';

export default function RecorderFooter({
  onStart = console.log,
  onStop = console.log,
  onRecordingPlay = console.log,
  onRecordingPause = console.log,
  setIsRecording,
  setIsPlaying,
  isRecording,
  isPlaying,
  progress = '20%',
}) {
  const toggleRecordingState = () => {
    isRecording ? onStop() : onStart();
    setIsRecording((prevRecordingState) => !prevRecordingState);
  };

  const toggleRecordingPlaying = () => {
    isPlaying ? onRecordingPause() : onRecordingPlay();
    setIsPlaying((prevPlayingState) => !prevPlayingState);
  };

  return (
    <div className={styles.footerContainer}>
      <div
        className={`${styles.recorder} ${isRecording && styles.stopRecorder}`}
        onClick={toggleRecordingState}
      ></div>
      <div
        className={`${styles.button} ${isPlaying && styles.paused}`}
        onClick={toggleRecordingPlaying}
      ></div>
      <div className={styles.progressBackdrop}>
        <div className={styles.progressBar} style={{ width: progress }}></div>
      </div>
    </div>
  );
}
