import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ChatMessage from "@/components/ChatMessage";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/i18n";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const Chatbot = () => {
  const { language } = useLanguage();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "مرحبًا بك في صحتي AI! كيف يمكنني مساعدتك اليوم؟",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: getBotResponse(inputValue),
          isUser: false,
        };
        
        setMessages((prev) => [...prev, botResponse]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };
  
  const getBotResponse = (input: string): string => {
    const inputLower = input.toLowerCase();
    
    if (inputLower.includes("مرحبا") || inputLower.includes("أهلا")) {
      return "أهلاً بك! كيف يمكنني مساعدتك في أمور صحتك اليوم؟";
    } else if (inputLower.includes("صداع") || inputLower.includes("ألم رأس")) {
      return "الصداع قد يكون ناتجًا عن عدة أسباب مثل التوتر، قلة النوم، أو الجفاف. حاول أخذ قسط من الراحة وشرب الماء. إذا استمر الصداع، يُفضل استشارة الطبيب.";
    } else if (inputLower.includes("سكر") || inputLower.includes("السكري")) {
      return "مرض السكري يتطلب متابعة منتظمة مع الطبيب. من المهم الالتزام بالأدوية الموصوفة والحفاظ على نظام غذائي صحي وممارسة الرياضة بانتظام.";
    } else if (inputLower.includes("ضغط") || inputLower.includes("الضغط")) {
      return "ارتفاع ضغط الدم حالة شائعة تتطلب مراقبة منتظمة. يُنصح بتقليل الملح في الطعام، وممارسة الرياضة، والحفاظ على وزن صحي.";
    } else {
      return "شكرًا على سؤالك. للحصول على معلومات طبية دقيقة، يُفضل استشارة مقدم الرعاية الصحية الخاص بك. هل هناك شيء آخر يمكنني مساعدتك به؟";
    }
  };

  const handleImageUpload = () => {
    alert("ميزة تحميل الصور ستكون متاحة قريبًا!");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl fade-in">
      <h1 className="text-3xl font-bold text-center mb-8">{getTranslation('chatTitle', language)}</h1>
      
      <Card className="p-4 shadow-lg">
        <div className="flex flex-col h-[500px]">
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            <div className="flex flex-col">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                />
              ))}
              {isLoading && (
                <div className="message-bubble bot-message ml-auto">
                  <div className="flex space-x-2 space-x-reverse">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleImageUpload}
              className="shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <span className="sr-only">{getTranslation('attachImage', language)}</span>
            </Button>
            <Input
              className="flex-grow"
              placeholder={getTranslation('chatPlaceholder', language)}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="shrink-0 bg-sihati-primary hover:bg-sihati-accent"
              disabled={isLoading || !inputValue.trim()}
            >
              {getTranslation('send', language)}
            </Button>
          </form>
        </div>
      </Card>
      
      <p className="text-sm text-sihati-secondary text-center mt-4">
        {getTranslation('chatDisclaimer', language)}
      </p>
    </div>
  );
};

export default Chatbot;
