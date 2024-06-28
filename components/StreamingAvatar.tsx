import {
  Configuration,
  NewSessionData,
  StreamingAvatarApi,
} from "@heygen/streaming-avatar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";

const TEXT = `
  export default function App() {
    // Media stream used by the video player to display the avatar
    const [stream, setStream] = useState<MediaStream> ();
    const mediaStream = useRef<HTMLVideoElement>(null);
    
    // Instantiate the streaming avatar api using your access token
    const avatar = useRef(new StreamingAvatarApi(
        new Configuration({accessToken: '<REPLACE_WITH_ACCESS_TOKEN>'})
        ));

    // State holding streaming avatar session data
    const [sessionData, setSessionData] = useState<NewSessionData>();
    
    // Function to start the streaming avatar session
    async function start(){
      const res = await avatar.current.createStartAvatar(
      { newSessionRequest: 

        // Define the session variables during creation
        { quality: "medium", // low, medium, high
          avatarName: <REPLACE_WITH_AVATAR_ID>, 
          voice:{voiceId: <REPLACE_WITH_VOICE_ID>}
        }

      });
      setSessionData(res);
    }
    
    // Function to stop the streaming avatar session
    async function stop(){
      await avatar.current.stopAvatar({stopSessionRequest: {sessionId: sessionData?.sessionId}});
    }

    // Function which passes in text to the avatar to repeat
    async function handleSpeak(){
      await avatar.current.speak({taskRequest: {text: <TEXT_TO_SAY>, sessionId: sessionData?.sessionId}}).catch((e) => {
      });
    }

    useEffect(()=>{
      // Handles the display of the streaming avatar
      if(stream && mediaStream.current){
        mediaStream.current.srcObject = stream;
        mediaStream.current.onloadedmetadata = () => {
          mediaStream.current!.play();
        }
      }
    }, [mediaStream, stream])

    return (
      <div className="w-full">
        <video playsInline autoPlay width={500} ref={mediaStream}/>
      </div> 
  }`;

export function StreamingAvatarCode() {
  return (
    <div className="w-full">
      <Card>
        <CardBody>
          <ReactCodeMirror
            editable={false}
            extensions={[langs.typescript()]}
            height="700px"
            theme="dark"
            value={TEXT}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export function StreamingAvatar() {
  const [stream, setStream] = useState<MediaStream>();
  const avatar = useRef(
    new StreamingAvatarApi(
      new Configuration({
        accessToken:
          "ODU1N2IwMDZjNTgwNGI2OGE4OTNlZWUwMDM0YTg1MmEtMTcxODk5MjU0Mw==",
      })
    )
  );

  const [text, setText] = useState<string>("");
  const [avatarId, setAvatarId] = useState<string>("");
  const [voiceId, setVoiceId] = useState<string>("");
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<NewSessionData>();
  const mediaStream = useRef<HTMLVideoElement>(null);

  async function grab() {
    try {
      setLoading(true);
      const res = await avatar.current.createStartAvatar({
        newSessionRequest: {
          quality: "medium",
          avatarName: avatarId,
          voice: { voiceId: voiceId },
        },
      });

      setData(res);
      setStream(avatar.current.mediaStream);
      setPlaying(true);
      setLoading(false);
    } catch (error) {}
  }

  async function stop() {
    await avatar.current.stopAvatar({
      stopSessionRequest: { sessionId: data?.sessionId },
    });
    setPlaying(false);
  }

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
      };
    }
  }, [mediaStream, stream]);

  async function handleSpeak() {
    await avatar.current
      .speak({ taskRequest: { text: text, sessionId: data?.sessionId } })
      .catch((e) => {});

    setText("");
  }

  return (
    <div className="w-full">
      <Card>
        <CardBody className="h-[500px]">
          {playing ? (
            <div className="h-full justify-center items-center flex">
              <video ref={mediaStream} autoPlay playsInline width={500} />
            </div>
          ) : (
            <div className="h-full justify-center items-center flex">
              <Button color="secondary" size="lg" onClick={grab}>
                Start
              </Button>
            </div>
          )}
          {loading && <Spinner size="lg" />}
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="w-full gap-2 flex flex-row items-center">
            <Input
              endContent={
                <button className="focus:outline-none">
                  <ArrowRight
                    className="text-[#9da5e3] opacity-50"
                    size={30}
                    onClick={handleSpeak}
                  />
                </button>
              }
              label="Speak"
              placeholder="Type something for the avatar to repeat"
              size="sm"
              value={text}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSpeak();
                }
              }}
              onValueChange={setText}
            />
            <Button
              className="stop-button"
              color="danger"
              size="lg"
              onClick={stop}
            >
              Stop
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
