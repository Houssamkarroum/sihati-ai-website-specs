
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('ar')}>
          العربية {language === 'ar' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ber')}>
          ⵜⴰⵎⴰⵣⵉⵖⵜ {language === 'ber' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('dar')}>
          الدارجة {language === 'dar' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('tach')}>
          ⵜⴰⵛⵍⵃⵉⵜ {language === 'tach' && '✓'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
