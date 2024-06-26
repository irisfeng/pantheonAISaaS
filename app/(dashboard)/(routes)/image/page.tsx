"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { ImageIcon, Send, Loader } from 'lucide-react';
import { Heading } from '@/components/heading';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import AutoResizeInput from '@/components/autoresize-input';
import { BubbleChat } from 'flowise-embed-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { imageModels } from "@/constants";


function ImagePage() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(imageModels[0]);

  const router = useRouter();

  const handlePromptChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/predictions', {
        prompt,
        model: selectedModel.modelName,
        params: selectedModel.modelParameters,
       
      });
      setImage(response.data[0]);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className=" w-full max-w-3xl lg:max-w-5xl p-4 lg:p-24 flex flex-col">
        <div className="flex justify-between items-center">
          <Heading
            title="文生成图"
            description="按提示生成图像 "
            icon={ImageIcon}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
            showBadge={1}
            badgeText="SDXL驱动"
          />
          <div className="w-20">
            <Select>
              <SelectTrigger className="w-full text-xs">
                <SelectValue placeholder={selectedModel.modelName} />
              </SelectTrigger>
              <SelectContent>
                {imageModels.map((model) => (
                    <SelectItem value={model.modelName} key={model.modelName} onClick={() => setSelectedModel(model)} className="text-xs">
                      {model.modelName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="px-4 lg:px-8 mt-4 w-full">
          <form className='rounded-lg' onSubmit={handleSubmit}>
            <div className="flex items-center justify-center mt-4 w-full lg:max-w-4xl">
              {/* <input 
                type="text" 
                value={prompt} 
                onChange={handlePromptChange} 
                placeholder="请输入提示词文本[暂时只支持英文]..." 
                className="flex-grow mr-4 p-2 rounded-lg border-2 border-gray-300 w-full" 
              /> */}
              <AutoResizeInput 
                value={prompt} 
                onChange={handlePromptChange} 
                placeholder='根据提示助手/直接输入英文...'
                className='w-full resize-none overflow-hidden p-2 border-2 mr-4 border-gray-300 rounded-md' 
              /> 
              
              <Button variant={'send'} type="submit" size="icon" disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : <Send />}
              </Button>
            </div>
          </form>
        </div>
        
        {image && <img src={image} alt="生成的图片" className="mt-8" />}
      </div>
      <BubbleChat 
          chatflowid="4f98a139-4f56-464d-8b7b-1516695f7ae3" 
          apiHost="https://flowiseai-clone.onrender.com" 
        />
    </section>
  );
}

export default ImagePage;