'use client';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useState } from 'react';

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

  // openAI 연동
  const [answer, setAnswer] = useState('');
  const handleSubmit = async () => {
    const question = 'Move left 1 meter.';

    try {
      const res = await fetch('http://localhost:3000/api/openAI', {
        method: 'POST',
        body: JSON.stringify({ question }),
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      const message = data.content.match(/\w+/g);

      setAnswer(message);
      console.log('message', message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>

      <button onClick={handleSubmit}>TEST</button>
      <pre>{JSON.stringify(answer)}</pre>
    </div>
  );
}
