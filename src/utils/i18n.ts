
type Language = 'ar' | 'ber' | 'dar' | 'tach';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  login: {
    ar: 'تسجيل الدخول',
    ber: 'ⴽⵛⴻⵎ',
    dar: 'دخل',
    tach: 'ⴽⵛⵎ',
  },
  register: {
    ar: 'إنشاء حساب',
    ber: 'ⵣⵎⵎⴻⵎ',
    dar: 'تسجل',
    tach: 'ⵣⵎⵎⵎ',
  },
  email: {
    ar: 'البريد الإلكتروني',
    ber: 'ⵉⵎⴰⵢⵍ',
    dar: 'إيمايل',
    tach: 'ⵉⵎⵢⵍ',
  },
  password: {
    ar: 'كلمة المرور',
    ber: 'ⵜⴰⵏⴻⵣⵔⵓⴼⵜ',
    dar: 'موت دو باس',
    tach: 'ⵜⵏⵣⵔⴼⵜ',
  },
  noAccount: {
    ar: 'ليس لديك حساب؟',
    ber: 'ⵓⵔ ⴷⴰⵔⴽ ⴰⵎⵉⴹⴰⵏ?',
    dar: 'ماعندكش كونط؟',
    tach: 'ⵓⵔ ⴷⴰⵔⴽ ⴰⵎⵉⴹⵏ?',
  },
  createAccount: {
    ar: 'إنشاء حساب',
    ber: 'ⵣⵎⵎⴻⵎ ⴰⵎⵉⴹⴰⵏ',
    dar: 'دير كونط',
    tach: 'ⵣⵎⵎⵎ ⴰⵎⵉⴹⵏ',
  },
  home: {
    ar: 'الرئيسية',
    ber: 'ⴰⵎⵣⵡⴰⵔⵓ',
    dar: 'الصفحة الرئيسية',
    tach: 'ⴰⵎⵣⵡⵔ',
  },
  chatbot: {
    ar: 'المحادثة',
    ber: 'ⴰⵎⵙⴰⵡⴰⵍ',
    dar: 'الدردشة',
    tach: 'ⴰⵎⵙⵡⵍ',
  },
  logout: {
    ar: 'تسجيل الخروج',
    ber: 'ⴼⴼⴻⵖ',
    dar: 'خرج',
    tach: 'ⴼⴼⵖ',
  },
};

export const getTranslation = (key: string, lang: Language) => {
  return translations[key]?.[lang] || key;
};

export type { Language };
