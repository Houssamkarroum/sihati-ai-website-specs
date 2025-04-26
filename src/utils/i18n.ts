
type Language = 'ar' | 'ber';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  login: {
    ar: 'تسجيل الدخول',
    ber: 'ⴽⵛⴻⵎ',
  },
  register: {
    ar: 'إنشاء حساب',
    ber: 'ⵣⵎⵎⴻⵎ',
  },
  email: {
    ar: 'البريد الإلكتروني',
    ber: 'ⵉⵎⴰⵢⵍ',
  },
  password: {
    ar: 'كلمة المرور',
    ber: 'ⵜⴰⵏⴻⵣⵔⵓⴼⵜ',
  },
  noAccount: {
    ar: 'ليس لديك حساب؟',
    ber: 'ⵓⵔ ⴷⴰⵔⴽ ⴰⵎⵉⴹⴰⵏ?',
  },
  createAccount: {
    ar: 'إنشاء حساب',
    ber: 'ⵣⵎⵎⴻⵎ ⴰⵎⵉⴹⴰⵏ',
  },
  home: {
    ar: 'الرئيسية',
    ber: 'ⴰⵎⵣⵡⴰⵔⵓ',
  },
  chatbot: {
    ar: 'المحادثة',
    ber: 'ⴰⵎⵙⴰⵡⴰⵍ',
  },
  logout: {
    ar: 'تسجيل الخروج',
    ber: 'ⴼⴼⴻⵖ',
  },
};

export const getTranslation = (key: string, lang: Language) => {
  return translations[key]?.[lang] || key;
};

export type { Language };
