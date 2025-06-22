'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui2/button';
import { Input } from '@/components/ui2/input';
import { ScrollArea } from '@/components/ui2/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui2/avatar';
import { Badge } from '@/components/ui2/badge';
import { 
  Send, 
  Bot, 
  User, 
  MessageCircle,
  Upload,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
// Update the import path if the file exists elsewhere, for example:
import { useToast } from '@/hook/use-toast';
// Or, if the correct path is 'hooks/use-toast' relative to the project root:

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: string;
}

const suggestedPrompts = [
  "What amenities are available in your properties?",
  "Tell me about the house rules and policies",
  "What are the popular attractions nearby?",
  "How do I make a booking?",
  "What's the cancellation policy?",
  "Are pets allowed in the properties?"
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI travel assistant. I'm here to help you with any questions about accommodations, amenities, bookings, local attractions, and more. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
      toast({
        title: "Image selected",
        description: "You can now send your message with the image."
      });
    }
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const sendMessage = async (content: string, image?: File) => {
    if (!content.trim() && !image) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content || 'Shared an image',
      timestamp: new Date(),
      image: image ? URL.createObjectURL(image) : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setImagePreviewUrl(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          image: image ? await convertImageToBase64(image) : null,
          conversationHistory: messages.slice(-5) // Last 5 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input, selectedImage || undefined);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
      {/* Header */}
      <div className="bg-gradient-to-r from-airbnb-coral to-pink-400 p-4 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-full">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">AI Travel Assistant</h3>
            <p className="text-sm text-white/80">Online • Powered by AI</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-3 chat-message",
                message.role === 'user' && "justify-end"
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="w-8 h-8 bg-airbnb-coral">
                  <AvatarFallback>
                    <Bot className="w-4 h-4 text-white" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={cn(
                  "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl",
                  message.role === 'user'
                    ? "bg-airbnb-coral text-white ml-auto"
                    : "bg-gray-100 text-gray-900"
                )}
              >
                {message.image && (
                  <div className="relative w-full rounded-lg mb-2 overflow-hidden">
                    <Image 
                      src={message.image} 
                      alt="Shared image" 
                      width={200}
                      height={150}
                      className="w-full max-h-48 object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={cn(
                  "text-xs mt-1 opacity-70",
                  message.role === 'user' ? "text-white/70" : "text-gray-500"
                )}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>

              {message.role === 'user' && (
                <Avatar className="w-8 h-8 bg-gray-600">
                  <AvatarFallback>
                    <User className="w-4 h-4 text-white" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8 bg-airbnb-coral">
                <AvatarFallback>
                  <Bot className="w-4 h-4 text-white" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <p className="text-sm text-gray-600 mb-3 flex items-center">
            <Sparkles className="w-4 h-4 mr-2" />
            Try asking about:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-airbnb-coral hover:text-white transition-colors text-xs"
                onClick={() => handleSuggestedPrompt(prompt)}
              >
                {prompt}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t p-4">
        {selectedImage && imagePreviewUrl && (
          <div className="mb-3 flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
            <div className="relative w-10 h-10 overflow-hidden rounded">
              <Image 
                src={imagePreviewUrl} 
                alt="Selected" 
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="text-sm text-gray-600 flex-1">{selectedImage.name}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={removeSelectedImage}
            >
              ×
            </Button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0"
          >
            <Upload className="w-4 h-4" />
          </Button>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your stay..."
            disabled={isLoading}
            className="flex-1"
          />
          
          <Button 
            type="submit" 
            disabled={(!input.trim() && !selectedImage) || isLoading}
            className="bg-airbnb-coral hover:bg-airbnb-coral/90 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}