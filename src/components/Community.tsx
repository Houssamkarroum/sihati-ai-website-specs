
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/i18n";

interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  date: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  date: string;
}

const Community = () => {
  const { language } = useLanguage();
  const [newPostContent, setNewPostContent] = useState("");
  const [commentContent, setCommentContent] = useState<{[key: string]: string}>({});
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "post1",
      author: "سمية الحسني",
      authorAvatar: "/placeholder.svg",
      content: "مرحباً بالجميع! أنا أم لطفلين وأعاني من الحساسية الموسمية. هل جرب أحد منكم علاجات طبيعية فعالة؟",
      date: "منذ 3 ساعات",
      likes: 12,
      comments: [
        {
          id: "comment1",
          author: "محمد عمراني",
          authorAvatar: "/placeholder.svg",
          content: "نعم، جربت شرب الشاي الأخضر مع العسل والليمون يومياً، وساعدني كثيراً!",
          date: "منذ 2 ساعات"
        },
        {
          id: "comment2",
          author: "فاطمة الزهراء",
          authorAvatar: "/placeholder.svg",
          content: "أنصحك بتجربة زيت النعناع، له تأثير رائع في تخفيف أعراض الحساسية الموسمية.",
          date: "منذ 1 ساعة"
        }
      ]
    },
    {
      id: "post2",
      author: "أحمد المراكشي",
      authorAvatar: "/placeholder.svg",
      content: "هل يوجد أحد هنا جرب خدمة المساعد المتخصص في أمراض القلب؟ أرغب في معرفة تجربتكم قبل الاشتراك.",
      date: "منذ 5 ساعات",
      likes: 8,
      comments: [
        {
          id: "comment3",
          author: "ليلى بنعمر",
          authorAvatar: "/placeholder.svg",
          content: "نعم، اشتركت الشهر الماضي وكانت التجربة مفيدة جداً. المساعد قدم لي معلومات دقيقة حول نظامي الغذائي ومستوى النشاط البدني المناسب لحالتي.",
          date: "منذ 3 ساعات"
        }
      ]
    }
  ]);

  const handleAddPost = () => {
    if (newPostContent.trim() === "") {
      toast.error(language === 'ar' ? "يرجى كتابة محتوى المنشور" : 
                 language === 'ber' ? "ⵜⵜⵓⴷⴰⵔⵜ ⴰⴷ ⵜⴰⵔⵉⴷ ⴰⴳⴱⵓⵔ ⵏ ⵓⵙⵓⴼⵖ" : 
                 language === 'dar' ? "كتب محتوى المنشور" : 
                 "ⵜⵜⵓⴷⴰⵔⵜ ⴰⴷ ⵜⴰⵔⵉⴷ ⴰⴳⴱⵓⵔ ⵏ ⵓⵙⵓⴼⵖ");
      return;
    }
    
    const newPost: Post = {
      id: `post${Date.now()}`,
      author: "أنت",
      authorAvatar: "/placeholder.svg",
      content: newPostContent,
      date: language === 'ar' ? "للتو" : 
            language === 'ber' ? "ⴷⵖⵉ" : 
            language === 'dar' ? "دابا" : 
            "ⴷⵖⵉ",
      likes: 0,
      comments: []
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    toast.success(language === 'ar' ? "تمت إضافة المنشور بنجاح" : 
                 language === 'ber' ? "ⵉⵜⵜⵓⵔⵏⵓ ⵓⵙⵓⴼⵖ ⵙ ⵓⵎⵏⵉⴷ" : 
                 language === 'dar' ? "تزاد المنشور بنجاح" : 
                 "ⵉⵜⵜⵓⵔⵏⵓ ⵓⵙⵓⴼⵖ ⵙ ⵓⵎⵏⵉⴷ");
  };

  const handleAddComment = (postId: string) => {
    if (!commentContent[postId] || commentContent[postId].trim() === "") {
      toast.error(language === 'ar' ? "يرجى كتابة تعليقك" : 
                 language === 'ber' ? "ⵜⵜⵓⴷⴰⵔⵜ ⴰⴷ ⵜⴰⵔⵉⴷ ⴰⵡⵏⵏⵉ ⵏⵏⴽ" : 
                 language === 'dar' ? "كتب التعليق ديالك" : 
                 "ⵜⵜⵓⴷⴰⵔⵜ ⴰⴷ ⵜⴰⵔⵉⴷ ⴰⵡⵏⵏⵉ ⵏⵏⴽ");
      return;
    }
    
    const newComment: Comment = {
      id: `comment${Date.now()}`,
      author: "أنت",
      authorAvatar: "/placeholder.svg",
      content: commentContent[postId],
      date: language === 'ar' ? "للتو" : 
            language === 'ber' ? "ⴷⵖⵉ" : 
            language === 'dar' ? "دابا" : 
            "ⴷⵖⵉ"
    };
    
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
    
    setCommentContent({...commentContent, [postId]: ""});
    toast.success(language === 'ar' ? "تمت إضافة التعليق بنجاح" : 
                 language === 'ber' ? "ⵉⵜⵜⵓⵔⵏⵓ ⵓⵡⵏⵏⵉ ⵙ ⵓⵎⵏⵉⴷ" : 
                 language === 'dar' ? "تزاد التعليق بنجاح" : 
                 "ⵉⵜⵜⵓⵔⵏⵓ ⵓⵡⵏⵏⵉ ⵙ ⵓⵎⵏⵉⴷ");
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const toggleExpandPost = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <section id="community" className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
          {language === 'ar' ? 'مجتمع صحتي' : 
           language === 'ber' ? 'ⵜⴰⵎⵙⵎⵓⵏⵜ ⵏ ⵜⵣⵡⵉⵜ' :
           language === 'dar' ? 'مجتمع صحتي' :
           'ⵜⴰⵎⵙⵎⵓⵏⵜ ⵏ ⵜⴷⵓⵙⵉ'}
        </h2>
        
        <p className="text-center text-green-600 max-w-2xl mx-auto mb-8">
          {language === 'ar' ? 'شارك تجاربك، اطرح أسئلتك، وتفاعل مع مجتمع يهتم بالصحة مثلك' : 
           language === 'ber' ? 'ⴱⴹⵓ ⵜⵉⵔⵎⵉⵜⵉⵏ ⵏⵏⴽ, ⵙⵇⵙⴰ ⵉⵙⵇⵙⵉⵜⵏ ⵏⵏⴽ, ⵜⵎⵢⴰⵡⴰⵙⴷ ⴷ ⵜⴰⵎⵙⵎⵓⵏⵜ ⵉⵜⵜⵡⴰⵍⴰⵏ ⵙ ⵜⵣⵡⵉⵜ ⴰⵎ ⴽⵢⵢⵉ' :
           language === 'dar' ? 'شارك تجاربك، طرح الأسئلة ديالك، وتفاعل مع مجتمع كيهتم بالصحة بحالك' :
           'ⴱⴹⵓ ⵜⵉⵔⵎⵉⵜⵉⵏ ⵏⵏⴽ, ⵙⵇⵙⴰ ⵉⵙⵇⵙⵉⵜⵏ ⵏⵏⴽ, ⵜⵎⵢⴰⵡⴰⵙⴷ ⴷ ⵜⴰⵎⵙⵎⵓⵏⵜ ⵉⵜⵜⵡⴰⵍⴰⵏ ⵙ ⵜⴷⵓⵙⵉ ⴰⵎ ⴽⵢⵢⵉ'}
        </p>
        
        <Card className="mb-8 border-green-200">
          <CardContent className="pt-6">
            <Textarea
              placeholder={
                language === 'ar' ? 'شارك سؤالك أو تجربتك مع المجتمع...' : 
                language === 'ber' ? 'ⴱⴹⵓ ⴰⵙⵇⵙⵉ ⵏⵏⴽ ⵏⵖ ⵜⴰⵔⵎⵉⵜ ⵏⵏⴽ ⴰⴽⴷ ⵜⴰⵎⵙⵎⵓⵏⵜ...' :
                language === 'dar' ? 'شارك السؤال ديالك ولا التجربة ديالك مع المجتمع...' :
                'ⴱⴹⵓ ⴰⵙⵇⵙⵉ ⵏⵏⴽ ⵏⵖ ⵜⴰⵔⵎⵉⵜ ⵏⵏⴽ ⴰⴽⴷ ⵜⴰⵎⵙⵎⵓⵏⵜ...'
              }
              className="min-h-[100px] border-green-200 focus:border-green-400"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-end bg-green-50">
            <Button 
              className="bg-sihati-primary hover:bg-sihati-accent text-white"
              onClick={handleAddPost}
            >
              {language === 'ar' ? 'نشر' : 
               language === 'ber' ? 'ⵙⵓⴼⵖ' :
               language === 'dar' ? 'نشر' :
               'ⵙⵓⴼⵖ'}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="border-green-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-green-200">
                    <img src={post.authorAvatar} alt={post.author} />
                  </Avatar>
                  <div>
                    <p className="font-medium text-green-800">{post.author}</p>
                    <p className="text-xs text-green-500">{post.date}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className="text-green-700">{post.content}</p>
              </CardContent>
              
              <CardFooter className="pt-0 flex justify-between border-t border-green-100 flex-wrap">
                <div className="flex gap-4">
                  <Button 
                    variant="ghost" 
                    className="text-green-600 hover:text-sihati-primary hover:bg-green-50"
                    onClick={() => handleLikePost(post.id)}
                  >
                    ❤️ {post.likes}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="text-green-600 hover:text-sihati-primary hover:bg-green-50"
                    onClick={() => toggleExpandPost(post.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {post.comments.length}
                  </Button>
                </div>
              </CardFooter>
              
              {expandedPost === post.id && (
                <div className="px-6 py-3 border-t border-green-100 bg-green-50">
                  <h3 className="text-sm font-medium text-green-700 mb-4">
                    {language === 'ar' ? 'التعليقات:' : 
                     language === 'ber' ? 'ⵉⵡⵏⵏⵉⵜⵏ:' :
                     language === 'dar' ? 'التعليقات:' :
                     'ⵉⵡⵏⵏⵉⵜⵏ:'}
                  </h3>
                  
                  <div className="space-y-4 mb-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8 border border-green-200">
                          <img src={comment.authorAvatar} alt={comment.author} />
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-white p-3 rounded-lg border border-green-100">
                            <div className="flex justify-between items-center mb-1">
                              <p className="font-medium text-sm text-green-800">{comment.author}</p>
                              <p className="text-xs text-green-500">{comment.date}</p>
                            </div>
                            <p className="text-sm text-green-700">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder={
                        language === 'ar' ? 'اكتب تعليقاً...' : 
                        language === 'ber' ? 'ⴰⵔⴰ ⴰⵡⵏⵏⵉ...' :
                        language === 'dar' ? 'كتب تعليق...' :
                        'ⴰⵔⴰ ⴰⵡⵏⵏⵉ...'
                      }
                      value={commentContent[post.id] || ''}
                      onChange={(e) => setCommentContent({
                        ...commentContent, 
                        [post.id]: e.target.value
                      })}
                      className="border-green-200 focus:border-green-400"
                    />
                    <Button 
                      className="bg-sihati-primary hover:bg-sihati-accent text-white"
                      onClick={() => handleAddComment(post.id)}
                    >
                      {language === 'ar' ? 'إرسال' : 
                       language === 'ber' ? 'ⴰⵣⵏ' :
                       language === 'dar' ? 'صيفط' :
                       'ⴰⵣⵏ'}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
