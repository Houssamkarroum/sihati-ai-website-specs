
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/i18n";

const FAQ = () => {
  const { language } = useLanguage();
  
  const faqs = [
    {
      question: {
        ar: 'كيف تعمل خدمة صحتي AI؟',
        ber: 'ⵎⴰⵎⴽ ⵜⵜⵙⵖⴰⵍ ⵜⵣⵡⵉⵜ AI?',
        dar: 'كيفاش كتخدم خدمة صحتي AI؟',
        tach: 'ⵎⴰⵎⴽ ⵜⵜⵙⵖⴰⵍ ⵜⴰⴷⵓⵙⵉ AI?',
      },
      answer: {
        ar: 'تستخدم صحتي AI الذكاء الاصطناعي لتوفير استشارات صحية أولية بناءً على الأعراض التي تصفها. يمكنك التحدث مباشرة مع المساعد الذكي وسيقدم لك معلومات عامة ونصائح صحية.',
        ber: 'ⵜⵣⵡⵉⵜ AI ⵜⵙⵙⵎⵔⵙ ⵜⵉⴽⵏⵉⵜ ⵏ ⵓⵎⵓⵙⵏⵉⵡ ⴰⵣⴷⴷⵓⴳⴰⵏ ⵙ ⵓⵙⵜⵜⵉ ⵏ ⵜⵉⵏⴰⵡⵉⵏ ⵏ ⵜⵣⵡⵉⵜ.',
        dar: 'صحتي AI كتستعمل الذكاء الاصطناعي باش توفر استشارات صحية أولية بناء على الأعراض لي كتوصفها. يمكن ليك تدردش مع المساعد الذكي وغادي يعطيك معلومات عامة ونصائح صحية.',
        tach: 'ⵜⴰⴷⵓⵙⵉ AI ⵜⵙⵙⵎⵔⵙ ⵜⵉⴽⵏⵉⵜ ⵏ ⵓⵎⵓⵙⵏⵉⵡ ⴰⵣⴷⴷⵓⴳⴰⵏ ⵙ ⵓⵙⵜⵜⵉ ⵏ ⵜⵉⵏⴰⵡⵉⵏ ⵏ ⵜⴷⵓⵙⵉ.',
      }
    },
    {
      question: {
        ar: 'هل يمكن للمساعد الذكي أن يحل محل الطبيب؟',
        ber: 'ⵉⵙ ⵉⵣⵎⵔ ⵓⵎⵙⵜⴰⵡⴰⵔ ⴰⵎⵓⵙⵏⴰⵡ ⴰⴷ ⵉⵙⵎⵖⵔ ⴰⵎⵙⵓⵏⴼⵓ?',
        dar: 'واش المساعد الذكي يمكن لو يعوض الطبيب؟',
        tach: 'ⵉⵙ ⵉⵣⵎⵔ ⵓⵎⵙⵜⴰⵡⵔ ⴰⵎⵓⵙⵏⴰⵡ ⴰⴷ ⵉⵙⵎⵖⵔ ⴰⵎⵙⵓⵏⴼⵓ?',
      },
      answer: {
        ar: 'لا، صحتي AI لا يمكن أن يحل محل الطبيب. إنه مصمم لتقديم معلومات عامة ونصائح أولية فقط. يجب دائمًا استشارة أخصائي طبي للحصول على تشخيص دقيق وخطة علاجية.',
        ber: 'ⵓⵀⵓ, ⵜⵣⵡⵉⵜ AI ⵓⵔ ⵉⵣⵎⵉⵔ ⴰⴷ ⵉⵙⵎⵖⵔ ⴰⵎⵙⵓⵏⴼⵓ. ⵉⵜⵜⵡⴰⵙⵏⴼⵍ ⴰⴷ ⵉⴼⴽ ⵉⵙⴰⵍⵏ ⵉⵎⴰⵜⴰⵢⵏ ⴷ ⵜⵉⵏⴰⵡⵉⵏ ⵜⵉⵎⵣⵡⵓⵔⴰ.',
        dar: 'لا، صحتي AI ماكيمكنش يعوض الطبيب. هو مصمم غير باش يقدم معلومات عامة ونصائح أولية. خاصك ديما تستاشر طبيب متخصص باش تحصل على تشخيص دقيق وخطة علاجية.',
        tach: 'ⵓⵀⵓ, ⵜⴰⴷⵓⵙⵉ AI ⵓⵔ ⵉⵣⵎⵉⵔ ⴰⴷ ⵉⵙⵎⵖⵔ ⴰⵎⵙⵓⵏⴼⵓ. ⵉⵜⵜⵡⴰⵙⵏⴼⵍ ⴰⴷ ⵉⴼⴽ ⵉⵙⴰⵍⵏ ⵉⵎⴰⵜⴰⵢⵏ ⴷ ⵜⵉⵏⴰⵡⵉⵏ ⵜⵉⵎⵣⵡⵓⵔⴰ.',
      }
    },
    {
      question: {
        ar: 'كيف يمكنني الوصول إلى المساعدين المتخصصين؟',
        ber: 'ⵎⴰⵎⴽ ⵣⵎⵔⵖ ⴰⴷ ⴰⵡⵉⵖ ⵉⵎⵙⵜⴰⵡⴰⵔⵏ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ?',
        dar: 'كيفاش يمكن لي نوصل للمساعدين المتخصصين؟',
        tach: 'ⵎⴰⵎⴽ ⵣⵎⵔⵖ ⴰⴷ ⴰⵡⵉⵖ ⵉⵎⵙⵜⴰⵡⵔⵏ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ?',
      },
      answer: {
        ar: 'يمكنك الوصول إلى المساعدين المتخصصين من خلال الاشتراك في الخدمات المميزة. بعد إتمام الدفع، ستتلقى رمزًا على بريدك الإلكتروني يمكنك استخدامه لفتح المحادثة مع المساعد المتخصص في المجال الطبي الذي تختاره.',
        ber: 'ⵜⵣⵎⵔⴷ ⴰⴷ ⵜⴰⵡⵉⴷ ⵉⵎⵙⵜⴰⵡⴰⵔⵏ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ ⵙ ⵓⵙⵔⵜⴰⴽ ⴳ ⵜⵙⵏⵓⴱⴳⵉⵡⵉⵏ ⵎⵎⵓⵣⵣⵔⵏⵉⵏ.',
        dar: 'يمكن ليك توصل للمساعدين المتخصصين من خلال الاشتراك في الخدمات المميزة. بعد ما تكمل الدفع، غادي توصلك شيفرة على الإيميل ديالك يمكن ليك تستعملها باش تفتح المحادثة مع المساعد المتخصص في المجال الطبي لي ختاريتي.',
        tach: 'ⵜⵣⵎⵔⴷ ⴰⴷ ⵜⴰⵡⵉⴷ ⵉⵎⵙⵜⴰⵡⵔⵏ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ ⵙ ⵓⵙⵔⵜⴰⴽ ⴳ ⵜⵙⵏⵓⴱⴳⵉⵡⵉⵏ ⵎⵎⵓⵣⵣⵔⵏⵉⵏ.',
      }
    },
  ];

  return (
    <section id="faq" className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          {language === 'ar' ? 'الأسئلة الشائعة' : 
           language === 'ber' ? 'ⵉⵙⵇⵙⵉⵜⵏ ⵉⵜⵜⵡⴰⵙⵇⵙⴰⵏ ⵙ ⵡⴰⵜⴰⵙ' :
           language === 'dar' ? 'الأسئلة المتداولة' :
           'ⵉⵙⵇⵙⵉⵜⵏ ⵉⵜⵜⵡⴰⵙⵇⵙⴰⵏ ⵙ ⵡⴰⵜⴰⵙ'}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-green-200 rounded-lg bg-white p-2"
              >
                <AccordionTrigger className="text-lg font-medium text-green-700 hover:text-sihati-primary px-2">
                  {faq.question[language]}
                </AccordionTrigger>
                <AccordionContent className="text-green-600 px-4">
                  {faq.answer[language]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
