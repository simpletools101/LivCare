"use client"

import { useRef, useEffect ,useState, KeyboardEvent} from 'react';
import { Send } from 'lucide-react';


type ChatInputProps = {
    getMessage : (message:string)=>void;
}

export default function ChatInput({getMessage}:ChatInputProps) {
    const textareaRef = useRef(null);
    const [message, setMessage] = useState('');

    const handleInput = () => {
        const textarea = textareaRef.current! as HTMLElement;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height
            textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height dynamically
        }
    };

    const handleKeyDown = (e:KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevents a new line
            sendMessage();
        }
    };

    const sendMessageFromMessageBtn = () =>{
        sendMessage()
    }

    const sendMessage = () => {
        if (message.trim() === '') return; // Ignore empty messages
        getMessage(message)
        setMessage(''); // Clear the input
        handleInput(); // Reset the textarea height
    };

    useEffect(() => {
        handleInput(); // Ensure correct height on first render
    }, []);

    return (
        <div className="flex items-end rounded-2xl border bg-neutral-950 p-2">
           <textarea
                ref={textareaRef}
                onInput={handleInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                placeholder="Send Message"
                rows={1}
                className="ml-4 flex max-h-[200px] min-h-[40px] flex-1 resize-none overflow-y-auto bg-neutral-950 outline-none transition-[height] duration-150 ease-in-out p-2 text-base leading-[1.4]"
            ></textarea>
            <div onClick={sendMessageFromMessageBtn} className="mr-2 flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-xl text-themecolor hover:bg-black active:bg-neutral-900">
                <Send />
            </div>
        </div>
    );
}
