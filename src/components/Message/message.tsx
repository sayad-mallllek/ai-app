import ReactMarkdown from "react-markdown";
import ChatLoader from "../ChatLoader/chat-loader";
import LogoIcon from "../logo-icon";

interface Props {
  isLoading?: boolean;
  completion: string;
}

const Message = ({ completion, isLoading }: Props) => {
  return (
    <li className="max-w-4xl min-h-12 py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
      {isLoading ? <ChatLoader /> : <LogoIcon />}
      <div className="space-y-3">
        {completion && <ReactMarkdown>{completion}</ReactMarkdown>}
      </div>
    </li>
  );
};

export default Message;
