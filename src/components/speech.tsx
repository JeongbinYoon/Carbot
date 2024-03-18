'use client';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export default function Speech() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript,
  } = useSpeechRecognition();

  //   if (!browserSupportsSpeechRecognition) {
  //     return (
  //         <span>{`Browser doesn't support speech recognition.`}</span>
  //     );
  //   }
  console.log('finalTranscript', finalTranscript);

  if (!listening && finalTranscript) {
    console.log('Fianl Transcript');
  }

  const startListening = () =>
    SpeechRecognition.startListening({
      continuous: false,
      language: 'en',
    });

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };
  return (
    <div>
      <p>asd</p>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
}
