'use client';

import { Message, experimental_useAssistant as useAssistant } from 'ai/react';
import { useEffect, useRef } from 'react';

import { BookMarked, Calculator, Heart, Send, Pen } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { Empty } from "@/components/ui/empty";
import 'katex/dist/katex.min.css'; // 引入 KaTeX 样式


const writingAssistant = () => {

  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: '/api/writing',
    });

    // When status changes to accepting messages, focus the input:
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (status === 'awaiting_message') {
      inputRef.current?.focus();
    }
  }, [status]);

  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className=" w-full max-w-3xl lg:max-w-5xl p-4 lg:p-24 flex flex-col">
        <Heading 
          title="提示助手"
          showBadge={1}
          badgeText='GPT4o驱动'
          description="文生图提示生成 "
          icon={Pen}
          iconColor="text-orange-700"
          bgColor="bg-orange-700/10"
        />

        <div className='flex flex-col gap-y-4 bg-white rounded-lg p-4 w-full lg:max-w-5xl overflow-auto'>
              {messages.length > 0 ?
                messages.map((m:Message) => (
                  <ChatMessage message={m} key={m.id} />
                )) : null
              }
          </div>
              {status === 'in_progress' && (
                <div className="px-4 lg:px-8 mt-4 w-full" />
                )
              }
            <div className="px-4 lg:px-8 mt-4 w-full">
              <form className='rounded-lg' onSubmit={submitMessage}>
                <div className="flex items-center justify-center mt-4 w-full lg:max-w-4xl">
                  <input
                    // className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                    className="flex-grow mr-4 p-2 rounded-lg border-2 border-gray-300" // 使用flex-grow确保input占据大部分空间
                    ref={inputRef}
                    value={input}
                    disabled={status !== 'awaiting_message'}
                    onChange={handleInputChange}
                    placeholder="输入内容，复制生成的英文"
                  />
                  <Button variant={'send'} type="submit" size="icon">
                    <Send />
                  </Button>
                </div>
              </form>
            </div>
        </div>
    </section>
  );
}

function ChatMessage({message: {role, content}}: {message: Message}) {
  return (
    <div className={cn(
      "p-8 w-full flex items-start gap-x-8 rounded-lg", role === 'user' ? "bg-white border border-black/10" : "bg-muted",)}
    >
      {role === 'user' ? <UserAvatar /> : <BotAvatar />}
      <p className='text-sm'>
        <ReactMarkdown>
            {content}
        </ReactMarkdown>
      </p>
    </div>
  );
}

export default writingAssistant;