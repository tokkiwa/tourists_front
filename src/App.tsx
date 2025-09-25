import React, { useState } from 'react';

// AIの表情タイプ定義
type AiEmotion = 'normal' | 'smile' | 'cry' | 'mad';

// メッセージタイプ定義
interface Message {
  sender: 'ai' | 'user';
  text: string;
  emotion?: AiEmotion;
}

// ユーザープロフィール定義
interface UserProfile {
  name: string;
  annualIncome: string;
  netWorth: string;
  familySize: string;
  age: string;
}

// 支払い通知の定義
interface PaymentNotification {
  id: string;
  amount: number;
  merchant: string;
  category: string;
  timestamp: Date;
  isProblematic?: boolean;
  reason?: string;
}

// 各ナビゲーションアイテムのアイコンコンポーネント
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const AnalysisIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);

const AssetsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// ヘッダーコンポーネント
const Header = ({ userName, onNotificationTest, notificationEnabled }: {
  userName: string,
  onNotificationTest?: () => void,
  notificationEnabled?: boolean
}) => (
  <header className="flex justify-between items-center mb-8">
    <div>
      <p className="text-sm text-slate-500">こんにちは</p>
      <h1 className="text-2xl font-bold text-slate-800">{userName} さん</h1>
    </div>
    <div className="flex items-center gap-2">
      {onNotificationTest && (
        <button
          onClick={onNotificationTest}
          className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 flex items-center gap-1"
          title="通知をテスト"
        >
          <span>{notificationEnabled ? '🔔' : '🔕'}</span>
          通知テスト
        </button>
      )}
      <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute top-1 right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </button>
    </div>
  </header>
);// AIアバターコンポーネント
const AiAvatar = ({ emotion = 'normal' }: { emotion?: AiEmotion }) => {
  const getAvatarSrc = (emotion: AiEmotion) => {
    return `/assets/man_1_${emotion}.png`;
  };

  return (
    <img
      src={getAvatarSrc(emotion)}
      alt="AIアシスタント"
      className="w-32 h-32 flex-shrink-0 object-contain"
    />
  );
};

// 通知関連のユーティリティ関数
const NotificationUtils = {
  // 通知許可を取得
  async requestPermission(): Promise<boolean> {
    console.log('通知許可を要求中...');

    if (!('Notification' in window)) {
      console.log('このブラウザは通知をサポートしていません');
      return false;
    }

    console.log('現在の通知許可状態:', Notification.permission);

    if (Notification.permission === 'granted') {
      console.log('通知許可済み');
      return true;
    }

    if (Notification.permission !== 'denied') {
      console.log('通知許可をユーザーに要求中...');
      const permission = await Notification.requestPermission();
      console.log('ユーザーからの回答:', permission);
      return permission === 'granted';
    }

    console.log('通知が拒否されています');
    return false;
  },

  // ブラウザ通知を送信
  sendNotification(title: string, options: NotificationOptions = {}) {
    console.log('通知送信を試行:', title, options);

    if (Notification.permission === 'granted') {
      console.log('通知を作成中...');
      try {
        const notification = new Notification(title, {
          icon: '/assets/man_1_mad.png',
          badge: '/assets/man_1_mad.png',
          ...options
        });

        console.log('通知が作成されました:', notification);

        // 通知をクリックした時の処理
        notification.onclick = () => {
          console.log('通知がクリックされました');
          window.focus();
          notification.close();
        };

        // 自動で閉じる
        setTimeout(() => {
          console.log('通知を自動で閉じます');
          notification.close();
        }, 5000);
      } catch (error) {
        console.error('通知作成エラー:', error);
      }
    } else {
      console.log('通知許可がないため送信できません。現在の許可状態:', Notification.permission);
    }
  }
};

// LLMによる支払い判定（モック）
const PaymentAnalyzer = {
  async analyzePayment(payment: PaymentNotification, userProfile: UserProfile): Promise<{ isProblematic: boolean, reason: string }> {
    // 実際にはLLM APIを呼び出すが、今回はルールベースでモック
    const monthlyBudget = parseInt(userProfile.annualIncome.replace(/[^\d]/g, '')) / 12 * 0.1; // 年収の10%を月予算と仮定

    // 問題のあるパターンを判定
    if (payment.amount > monthlyBudget * 0.5) {
      return {
        isProblematic: true,
        reason: `高額な支出を検出しました。${payment.merchant}で¥${payment.amount.toLocaleString()}は月予算の半分以上です。`
      };
    }

    if (payment.category === '娯楽' && payment.amount > 10000) {
      return {
        isProblematic: true,
        reason: `娯楽費が高額です。${payment.merchant}での¥${payment.amount.toLocaleString()}の支出は予算を見直すことをお勧めします。`
      };
    }

    if (payment.merchant.includes('パチンコ') || payment.merchant.includes('競馬')) {
      return {
        isProblematic: true,
        reason: 'ギャンブル関連の支出を検出しました。財務目標達成のため控えることをお勧めします。'
      };
    }

    return {
      isProblematic: false,
      reason: '正常な支出です。'
    };
  }
};

// 初期設定ステップの定義
type SetupStep = 'welcome' | 'name' | 'age' | 'income' | 'networth' | 'family' | 'complete';

// 初期設定画面コンポーネント
const InitialSetup = ({
  onComplete
}: {
  onComplete: (profile: UserProfile) => void
}) => {
  const [currentStep, setCurrentStep] = useState<SetupStep>('welcome');
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    annualIncome: '',
    netWorth: '',
    familySize: '',
    age: ''
  });
  const [inputValue, setInputValue] = useState('');

  const getAIMessage = (step: SetupStep): { text: string; emotion: AiEmotion } => {
    switch (step) {
      case 'welcome':
        return { text: 'こんにちは！私はあなたの財務アシスタントです。最適なアドバイスをするために、いくつか質問させてください。まず、お名前を教えていただけますか？', emotion: 'smile' };
      case 'name':
        return { text: `${profile.name}さん、よろしくお願いします！次に、年齢を教えてください。`, emotion: 'normal' };
      case 'age':
        return { text: '年収（税込み）はいくらぐらいですか？例：500万円', emotion: 'normal' };
      case 'income':
        return { text: '現在の純資産（貯金・投資など）はどのくらいありますか？例：300万円', emotion: 'normal' };
      case 'networth':
        return { text: '家族構成を教えてください。何人家族ですか？例：3人（夫婦＋子ども1人）', emotion: 'normal' };
      case 'family':
        return { text: 'ありがとうございます！設定が完了しました。これであなたに最適な財務アドバイスができます！', emotion: 'smile' };
      case 'complete':
        return { text: 'それでは始めましょう！', emotion: 'smile' };
      default:
        return { text: '', emotion: 'normal' };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newProfile = { ...profile };

    switch (currentStep) {
      case 'welcome':
        newProfile.name = inputValue;
        setCurrentStep('name');
        break;
      case 'name':
        newProfile.age = inputValue;
        setCurrentStep('age');
        break;
      case 'age':
        newProfile.annualIncome = inputValue;
        setCurrentStep('income');
        break;
      case 'income':
        newProfile.netWorth = inputValue;
        setCurrentStep('networth');
        break;
      case 'networth':
        newProfile.familySize = inputValue;
        setCurrentStep('family');
        setTimeout(() => {
          setCurrentStep('complete');
          setTimeout(() => onComplete(newProfile), 1500);
        }, 2000);
        break;
    }

    setProfile(newProfile);
    setInputValue('');
  };

  const getPlaceholderText = (step: SetupStep): string => {
    switch (step) {
      case 'welcome': return 'お名前を入力してください';
      case 'name': return '年齢を入力してください（例：28歳）';
      case 'age': return '年収を入力してください（例：500万円）';
      case 'income': return '純資産を入力してください（例：300万円）';
      case 'networth': return '家族構成を入力してください（例：3人家族）';
      default: return '';
    }
  };

  const aiMessage = getAIMessage(currentStep);
  const showInput = !['family', 'complete'].includes(currentStep);

  return (
    <div className="max-w-sm mx-auto bg-slate-50 h-screen flex flex-col shadow-2xl overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex-grow flex flex-col justify-center p-6">
        {/* AIアバターとメッセージ */}
        <div className="flex flex-col items-center text-center mb-8">
          <AiAvatar emotion={aiMessage.emotion} />
          <div className="mt-6 bg-indigo-600 text-white p-4 rounded-2xl rounded-bl-none shadow-md max-w-xs">
            <p className="text-sm">{aiMessage.text}</p>
          </div>
        </div>

        {/* 入力フォーム */}
        {showInput && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={getPlaceholderText(currentStep)}
              className="p-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-center"
              autoFocus
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white py-3 px-6 rounded-2xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
            >
              次へ
            </button>
          </form>
        )}

        {/* 進捗インジケーター */}
        <div className="flex justify-center mt-8 space-x-2">
          {['welcome', 'name', 'age', 'income', 'networth', 'family'].map((step, index) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full transition-colors ${['welcome', 'name', 'age', 'income', 'networth', 'family'].indexOf(currentStep) >= index
                ? 'bg-indigo-600'
                : 'bg-slate-300'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// チャットポップアップコンポーネント
const ChatPopup = ({
  isOpen,
  onClose,
  messages,
  inputValue,
  onInputChange,
  onSendMessage
}: {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: (e: React.FormEvent) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-end justify-center p-4">
      <div className="bg-white rounded-t-3xl w-full max-w-sm h-96 flex flex-col shadow-2xl">
        {/* ヘッダー */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-800">AIアシスタント</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* メッセージエリア（アイコンなし） */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
              <div className={`p-3 rounded-2xl max-w-xs ${msg.sender === 'ai'
                ? 'bg-indigo-600 text-white rounded-tl-none'
                : 'bg-slate-200 text-slate-700 rounded-br-none'
                }`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 入力エリア */}
        <div className="p-4 border-t border-slate-200">
          <form onSubmit={onSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={onInputChange}
              placeholder="AIにメッセージを送る..."
              className="flex-grow p-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button type="submit" className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// AIチャットコンポーネント
const AiChat = ({ messages, inputValue, onInputChange, onSendMessage, onOpenPopup }: {
  messages: Message[];
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onOpenPopup: () => void;
}) => {
  // 最新のAIメッセージから表情を取得
  const latestAiMessage = [...messages].reverse().find(msg => msg.sender === 'ai');
  const currentEmotion = latestAiMessage?.emotion || 'normal';

  return (
    <div className="mb-8">
      <div className="flex items-start gap-4">
        <AiAvatar emotion={currentEmotion} />
        <div className="w-full">
          {/* 最新のメッセージのみ表示 */}
          {messages.length > 0 && (
            <div className="mb-2">
              <div className={`p-3 rounded-2xl shadow-md max-w-xs lg:max-w-md ${messages[messages.length - 1].sender === 'ai'
                ? 'bg-indigo-600 text-white rounded-tl-none'
                : 'bg-white text-slate-700 rounded-br-none'
                }`}>
                <p className="text-sm">{messages[messages.length - 1].text}</p>
              </div>
            </div>
          )}
          <button
            onClick={onOpenPopup}
            className="bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-50 transition text-sm"
          >
            会話を続ける
          </button>
        </div>
      </div>
    </div>
  );
};


// 資産サマリーカードコンポーネント
const SummaryCard = ({ title, amount, textColor = 'text-slate-800' }: {
  title: string;
  amount: string;
  textColor?: string;
}) => (
  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
    <p className="text-xs text-slate-500 mb-1">{title}</p>
    <p className={`text-lg font-bold ${textColor}`}>{amount}</p>
  </div>
);

// 資産サマリーセクションコンポーネント
const AssetSummary = () => (
  <div className="grid grid-cols-3 gap-4 text-center mb-8">
    <SummaryCard title="総資産" amount="¥3,520k" />
    <SummaryCard title="負債" amount="¥125k" />
    <SummaryCard title="投資利益" amount="+¥15.8k" textColor="text-green-600" />
  </div>
);

// 目標カードコンポーネント
const GoalCard = ({ emoji, title, percentage, current, total }: {
  emoji: string;
  title: string;
  percentage: number;
  current: string;
  total: string;
}) => {
  const progressColor = percentage > 70 ? 'bg-blue-500' : 'bg-green-500';
  const textColor = percentage > 70 ? 'text-blue-600' : 'text-green-600';

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-slate-700">{emoji} {title}</span>
        <span className={`text-sm font-medium ${textColor}`}>{percentage}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div className={`${progressColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-right text-xs text-slate-500 mt-1.5">¥{current} / ¥{total}</p>
    </div>
  );
};

// お財布スコアコンポーネント
const WalletScoreCard = ({ userProfile }: { userProfile?: UserProfile | null }) => {
  // ユーザープロフィールに基づいてスコアを計算
  const calculateScores = () => {
    if (!userProfile) {
      return { savingsRate: 50, wasteLevel: 50, diversification: 50, overallScore: 50 };
    }

    // 年収と純資産から貯蓄率を推定
    const income = parseInt(userProfile.annualIncome.replace(/[^\d]/g, '')) || 1;
    const netWorth = parseInt(userProfile.netWorth.replace(/[^\d]/g, '')) || 0;
    const age = parseInt(userProfile.age) || 25;

    // 貯蓄率の計算（純資産÷年収の比率から推定）
    const savingsRate = Math.min(Math.max((netWorth / income) * 20, 20), 95);

    // 無駄遣いレベル（年齢と家族構成から推定、低いほど良い）
    const familySize = parseInt(userProfile.familySize.replace(/[^\d]/g, '')) || 1;
    const wasteLevel = Math.max(60 - age + familySize * 5, 10);

    // 分散投資（純資産の規模から推定）
    const diversification = Math.min(Math.max(netWorth / 50000 * 20 + 30, 30), 90);

    // 総合スコア
    const overallScore = Math.round((savingsRate + (100 - wasteLevel) + diversification) / 3);

    return { savingsRate: Math.round(savingsRate), wasteLevel: Math.round(wasteLevel), diversification: Math.round(diversification), overallScore };
  };

  const { savingsRate, wasteLevel, diversification, overallScore } = calculateScores();

  // スコアに応じた色の決定
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981"; // green-500
    if (score >= 60) return "#3b82f6"; // blue-500
    if (score >= 40) return "#f59e0b"; // amber-500
    return "#ef4444"; // red-500
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">お財布スコア</h2>
        <span className="text-xs text-slate-500">
          {overallScore >= 80 ? '優秀' : overallScore >= 60 ? '良好' : overallScore >= 40 ? '要改善' : '注意'}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* 円グラフ部分 */}
        <div className="relative flex-shrink-0">
          <svg width="80" height="80" className="transform -rotate-90">
            {/* 背景の円 */}
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="#e5e7eb"
              strokeWidth="6"
              fill="none"
            />
            {/* スコアを表す円弧 */}
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke={getScoreColor(overallScore)}
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 32}`}
              strokeDashoffset={`${2 * Math.PI * 32 * (1 - overallScore / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          {/* 中央の数字 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-slate-800">{overallScore}%</span>
          </div>
        </div>

        {/* 棒グラフ部分 */}
        <div className="flex-1 space-y-3">
          <ScoreBar label="貯蓄率" percentage={savingsRate} color="bg-green-500" />
          <ScoreBar label="無駄遣い" percentage={wasteLevel} color="bg-red-500" />
          <ScoreBar label="分散投資" percentage={diversification} color="bg-blue-500" />
        </div>
      </div>

      {/* スコアに基づくアドバイス */}
      {overallScore < 60 && (
        <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-xs text-amber-700">
            💡 {overallScore < 40
              ? '貯蓄習慣の見直しと無駄遣いの削減から始めましょう'
              : '分散投資を検討して、より安定した資産形成を目指しましょう'
            }
          </p>
        </div>
      )}
    </div>
  );
};

// スコア棒グラフコンポーネント
const ScoreBar = ({ label, percentage, color }: {
  label: string;
  percentage: number;
  color: string;
}) => (
  <div className="flex items-center gap-2">
    <span className="text-xs text-slate-600 w-12 text-right">{label}</span>
    <div className="flex-1 bg-slate-200 rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <span className="text-xs text-slate-500 w-8">{percentage}%</span>
  </div>
);

// 目標達成率セクションコンポーネント
const GoalsSection = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-bold text-slate-800">目標の達成状況</h2>
    <GoalCard emoji="✈️" title="沖縄旅行" percentage={75} current="150,000" total="200,000" />
    <GoalCard emoji="💻" title="新しいPC" percentage={40} current="80,000" total="200,000" />
  </div>
);

// ナビゲーションアイテムコンポーネント
const NavItem = ({ icon, label, isActive = false }: {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}) => (
  <button className={`flex flex-col items-center gap-1 ${isActive ? 'text-indigo-600' : 'text-slate-500'} hover:text-indigo-600`}>
    {icon}
    <span className={`text-xs ${isActive ? 'font-bold' : ''}`}>{label}</span>
  </button>
);

// 下部ナビゲーションバーコンポーネント
const BottomNav = () => (
  <nav className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-slate-200 p-2">
    <div className="flex justify-around items-center h-16">
      <NavItem icon={<HomeIcon />} label="ホーム" isActive={true} />
      <NavItem icon={<AnalysisIcon />} label="分析" />
      <button className="w-14 h-14 mb-8 flex items-center justify-center bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-110 transition-all">
        <AddIcon />
      </button>
      <NavItem icon={<AssetsIcon />} label="資産" />
      <NavItem icon={<SettingsIcon />} label="設定" />
    </div>
  </nav>
);


// メッセージ内容に基づいて表情を決定する関数
const getEmotionFromMessage = (text: string): AiEmotion => {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('おめでとう') || lowerText.includes('良い') || lowerText.includes('素晴らしい') || lowerText.includes('成功')) {
    return 'smile';
  } else if (lowerText.includes('申し訳') || lowerText.includes('残念') || lowerText.includes('失敗') || lowerText.includes('困った')) {
    return 'cry';
  } else if (lowerText.includes('警告') || lowerText.includes('危険') || lowerText.includes('注意') || lowerText.includes('予算を超えて')) {
    return 'mad';
  } else {
    return 'normal';
  }
};

// メインのAppコンポーネント
export default function App() {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isChatPopupOpen, setIsChatPopupOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage: Message = { sender: 'user', text: inputValue };
    const newMessages = [...messages, newUserMessage];

    setMessages(newMessages);
    setInputValue('');

    // AIからの返信をシミュレート - メッセージ内容に応じた表情で
    setTimeout(() => {
      const responses = [
        'ご質問ありがとうございます！関連情報を検索しますので、少々お待ちください。',
        '素晴らしい質問ですね！お役に立てるよう頑張ります。',
        '申し訳ございませんが、その情報は現在確認できません。',
        '警告：この操作には注意が必要です。よく確認してください。',
        'おめでとうございます！目標達成まであと少しです！'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const aiResponse: Message = {
        sender: 'ai',
        text: randomResponse,
        emotion: getEmotionFromMessage(randomResponse)
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  const handleOpenChatPopup = () => {
    setIsChatPopupOpen(true);
  };

  const handleCloseChatPopup = () => {
    setIsChatPopupOpen(false);
  };

  const handleSetupComplete = async (profile: UserProfile) => {
    console.log('Setup complete called with profile:', profile); // デバッグ用
    setUserProfile(profile);

    // 通知許可を取得
    console.log('初期設定完了時に通知許可を要求');
    const hasPermission = await NotificationUtils.requestPermission();
    console.log('通知許可取得結果:', hasPermission);
    setNotificationPermission(hasPermission);

    // 通知許可取得時にテスト通知を送信
    if (hasPermission) {
      console.log('通知許可が取得できたので、ウェルカム通知を送信');
      NotificationUtils.sendNotification(
        '🎉 初期設定完了',
        {
          body: `${profile.name}さん、セットアップが完了しました！財務アドバイスの準備ができました。`,
          icon: '/assets/man_1_smile.png',
          tag: 'welcome-notification'
        }
      );
    }

    // 初期設定完了後の初回メッセージを生成
    const welcomeMessage: Message = {
      sender: 'ai',
      text: `${profile.name}さん、初期設定ありがとうございました！年収${profile.annualIncome}、純資産${profile.netWorth}の${profile.familySize}の情報を元に、最適な財務アドバイスをいたします。

🔔 通知状態: ${hasPermission ? '✅ 有効' : '❌ 無効'}
ブラウザ許可: ${Notification.permission}

${hasPermission ? 'ブラウザ通知も有効になりました。' : 'ブラウザ通知は無効です。右上の「通知テスト」ボタンで確認してください。'}

今月は食費が少し予算を超えていますね。近くのスーパーでお得なセール情報を集めておきました！確認しますか？`,
      emotion: hasPermission ? 'smile' : 'normal'
    };
    setMessages([welcomeMessage]);
    setIsSetupComplete(true);
  };  // 支払い通知を処理する関数
  const handlePaymentNotification = async (payment: PaymentNotification) => {
    console.log('支払い通知処理開始:', payment);
    console.log('ユーザープロフィール:', userProfile);
    console.log('通知許可状態:', notificationPermission);
    console.log('ブラウザ通知許可:', Notification.permission);

    if (!userProfile) {
      console.log('ユーザープロフィールがありません');
      return;
    }

    // LLMで支払いを分析
    const analysis = await PaymentAnalyzer.analyzePayment(payment, userProfile);
    console.log('支払い分析結果:', analysis);

    if (analysis.isProblematic) {
      console.log('問題のある支払いを検出');

      // ブラウザ通知を送信
      if (notificationPermission && Notification.permission === 'granted') {
        console.log('ブラウザ通知を送信します');
        NotificationUtils.sendNotification(
          '⚠️ 支出アラート',
          {
            body: analysis.reason,
            icon: '/assets/man_1_mad.png',
            tag: 'payment-alert'
          }
        );
      } else {
        console.log('通知許可がありません。許可状態:', {
          notificationPermission,
          browserPermission: Notification.permission
        });
      }

      // チャットにもメッセージを追加
      const alertMessage: Message = {
        sender: 'ai',
        text: `${userProfile.name}さん、支出アラートです！${analysis.reason}`,
        emotion: 'mad'
      };

      setMessages(prev => [...prev, alertMessage]);
    } else {
      console.log('問題のない支払いです');
    }
  };

  // デモ用：ランダムな支払い通知を生成する関数
  const simulatePaymentNotification = async () => {
    console.log('テスト通知ボタンがクリックされました');

    // まず直接通知テストを実行
    const hasPermission = await NotificationUtils.requestPermission();
    console.log('通知許可取得結果:', hasPermission);

    if (hasPermission) {
      // 直接通知を送信
      NotificationUtils.sendNotification(
        '🔔 テスト通知',
        {
          body: 'これはテスト通知です。通知システムが正常に動作しています。',
          icon: '/assets/man_1_normal.png',
          tag: 'test-notification'
        }
      );
    }

    // 既存の支払い通知テストも実行
    const mockPayments: PaymentNotification[] = [
      {
        id: '1',
        amount: 25000,
        merchant: 'イオンモール',
        category: '食費',
        timestamp: new Date()
      },
      {
        id: '2',
        amount: 15000,
        merchant: 'カラオケBIG ECHO',
        category: '娯楽',
        timestamp: new Date()
      },
      {
        id: '3',
        amount: 50000,
        merchant: 'ビックカメラ',
        category: '家電',
        timestamp: new Date()
      },
      {
        id: '4',
        amount: 8000,
        merchant: 'パチンコ店',
        category: '娯楽',
        timestamp: new Date()
      }
    ];

    const randomPayment = mockPayments[Math.floor(Math.random() * mockPayments.length)];
    handlePaymentNotification(randomPayment);
  };

  // 初期設定が完了していない場合は初期設定画面を表示
  if (!isSetupComplete) {
    return <InitialSetup onComplete={handleSetupComplete} />;
  }

  return (
    <div className="max-w-sm mx-auto bg-slate-50 h-screen flex flex-col shadow-2xl overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <main className="flex-grow overflow-y-auto p-6">
        <Header
          userName={userProfile?.name || "田中"}
          onNotificationTest={simulatePaymentNotification}
          notificationEnabled={notificationPermission}
        />
        <AiChat
          messages={messages}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSendMessage={handleSendMessage}
          onOpenPopup={handleOpenChatPopup}
        />
        <WalletScoreCard userProfile={userProfile} />
        <AssetSummary />
        <GoalsSection />
      </main>
      <BottomNav />

      {/* チャットポップアップ */}
      <ChatPopup
        isOpen={isChatPopupOpen}
        onClose={handleCloseChatPopup}
        messages={messages}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
