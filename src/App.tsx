import React, { useState } from 'react';

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
const Header = ({ userName }: { userName: string }) => (
  <header className="flex justify-between items-center mb-8">
    <div>
      <p className="text-sm text-slate-500">こんにちは</p>
      <h1 className="text-2xl font-bold text-slate-800">{userName} さん</h1>
    </div>
    <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span className="absolute top-1 right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
      </span>
    </button>
  </header>
);

// AIチャットコンポーネント
const AiChat = ({ messages, inputValue, onInputChange, onSendMessage }: {
  messages: Array<{ sender: string; text: string }>;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: (e: React.FormEvent) => void;
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-4">
        <img
          src="https://placehold.co/120x120/c7d2fe/312e81?text=AI&font=sans"
          alt="AIアシスタント"
          className="w-16 h-16 rounded-full border-4 border-white shadow-lg flex-shrink-0"
        />
        <div className="w-full">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === 'ai' ? 'self-start' : 'self-end'}`}>
              <div className={`p-3 rounded-2xl shadow-md max-w-xs lg:max-w-md ${msg.sender === 'ai' ? 'bg-indigo-600 text-white rounded-tl-none' : 'bg-white text-slate-700 rounded-br-none'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={onSendMessage} className="mt-4 flex items-center gap-2">
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


// メインのAppコンポーネント
export default function App() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '今月は食費が少し予算を超えていますね。近くのスーパーでお得なセール情報を集めておきました！確認しますか？' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage = { sender: 'user', text: inputValue };
    const newMessages = [...messages, newUserMessage];

    setMessages(newMessages);
    setInputValue('');

    // AIからの返信をシミュレート
    setTimeout(() => {
      const aiResponse = { sender: 'ai', text: 'ご質問ありがとうございます！関連情報を検索しますので、少々お待ちください。' };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  return (
    <div className="max-w-sm mx-auto bg-slate-50 h-screen flex flex-col shadow-2xl overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <main className="flex-grow overflow-y-auto p-6">
        <Header userName="田中" />
        <AiChat
          messages={messages}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSendMessage={handleSendMessage}
        />
        <AssetSummary />
        <GoalsSection />
      </main>
      <BottomNav />
    </div>
  );
}
