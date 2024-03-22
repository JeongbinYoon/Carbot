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

  // openAI 연동
  const handleSubmit = async () => {
    const question =
      "Black-on-black ware is a 20th- and 21st-century pottery tradition developed by the Puebloan Native American ceramic artists in Northern New Mexico. Traditional reduction-fired blackware has been made for centuries by pueblo artists. Black-on-black ware of the past century is produced with a smooth surface, with the designs applied through selective burnishing or the application of refractory slip. Another style involves carving or incising designs and selectively polishing the raised areas. For generations several families from Kha'po Owingeh and P'ohwhóge Owingeh pueblos have been making black-on-black ware with the techniques passed down from matriarch potters. Artists from other pueblos have also produced black-on-black ware. Several contemporary artists have created works honoring the pottery of their ancestors.";

    try {
      const res = await fetch('http://localhost:3000/api/openAI', {
        method: 'POST',
        body: JSON.stringify({ question }),
        headers: {
          'content-type': 'application/json',
        },
      });

      console.log(res);
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
    </div>
  );
}
