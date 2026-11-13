"use client";

import React, { useState, useRef } from "react";
import {
  Plus,
  Minus,
  HelpCircle,
  Sparkles,
  ChevronsUpDown,
  Search,
} from "lucide-react";

const FAQ_ITEMS = [
  {
    number: "01",
    question: "What Is BlackDiamond_SpecialEa V9.5",
    answer:
      "Unlock the potential for continuous profit with BlackDiamond_SpecialEa V9.5, the automated trading system that aligns with your trading strategy.",
  },
  {
    number: "02",
    question: "It is the automated trading system?",
    answer: "Yes, it is 100% automated trading system.",
  },
  {
    number: "03",
    question: "What minimum deposit requires for BlackDiamond_SpecialEa?",
    answer: "Minimum deposit 100$ good enough to start trading.",
  },
  {
    number: "04",
    question: "Which broker BlackDiamond_SpecialEa suitable?",
    answer: "Any broker is suitable for BlackDiamond_SpecialEa V9.5",
  },
  {
    number: "05",
    question: "What type of account Ea can trade?",
    answer: "Any account type this special system can work.",
  },
  {
    number: "06",
    question: "Which pair suitable for trade by Special EA?",
    answer:
      "BlackDiamond_SpecialEa works well with many currency pairs, but we recommend EURUSD due to a 90% trading accuracy.",
  },
  {
    number: "07",
    question: "What leverage need for Ea trading?",
    answer: "Any leverage, But best is 1:500.",
  },
  {
    number: "08",
    question: "For BalckDiamond_SpecialEA V9.5 what spread best?",
    answer:
      "Actually, BalckDiamond_SpecialEA V9.5 can effort any kind of spread, the max broker provides 10 to 16 spread for the pair, So it's really suitable for that spread.",
  },
  {
    number: "09",
    question: "It is long or scalping EA?",
    answer:
      "BalckDiamond_SpecialEA V9.5 based on both system. So this special system suitable for both trade.",
  },
  {
    number: "10",
    question: "Which version currently are you selling?",
    answer: "V9.5 currently we selling.",
  },
  {
    number: "11",
    question:
      "Is there any other version in the market of BalckDiamond_SpecialEA?",
    answer:
      "NO, There is no OTHER version in Market, Only V 9.5, Which is the latest.",
  },
  {
    number: "12",
    question: "Where you sell BlackDiamond_SpecialEa?",
    answer:
      "We sell Ea ONLY our web site, FACEBOOK, SKYPE & by EMAIL, TELEGRAM.",
  },
  {
    number: "13",
    question:
      "If the company updates the EA after purchasing, will they also provide the latest version as Free?",
    answer:
      "If you have purchased either our BlackDiamond Pro or Unlimited version, you are entitled to a free update of our Expert Advisor (EA) if you decide to upgrade to the latest version, such as 9.5 or 10.0. However, to be eligible for a free update, customers who have the Basic version must provide us with their trading results from the previous month through our system. If clients are unable to provide at least one month's worth of trading results, they will need to repurchase the system.",
  },
  {
    number: "14",
    question: "What did you send after making a purchase? How?",
    answer:
      "Once you purchase, we will provide you with comprehensive instructions on how to install the Forex Robot, including a setfile for both long and short trades. The instructions and .EXE file will be emailed to you.",
  },
  {
    number: "15",
    question:
      "How long does it take for you to receive the EA after buying?",
    answer:
      "After you have successfully completed and confirmed your payment, we will update our database and send the BlackDiamond_SpecialEa to your email address within 24 hours. However, we will try to send it within 1 or 2 hours.",
  },
  {
    number: "16",
    question:
      "What steps should I take if I want to buy Blackdiamond Special Ea",
    answer:
      "Please navigate to the pricing plans section and select the plan that suits your needs. Proceed with making the payment, and once it is completed, kindly contact us via INSTAGRAM, EMAIL, or TELEGRAM. In your message, please provide us with your MQL4 platform name and email address. Upon receipt of your message, we will send you the EA to your email address.",
  },
  {
    number: "17",
    question: "How much max DD on Live or Demo Account?",
    answer:
      "Actually in very low-risk settings with 5% - 9%, Mid risk setting is 12% to 20%",
  },
  {
    number: "18",
    question:
      "Has Black Diamond Special Ea meet the FTMO/PROP firm's challenge?",
    answer:
      "Absulately, It has been confirmed that the BlackDiamond Special EA Pass is compatible with the FTMO/PROP firm challenge. The software comes with a special set file that is specifically designed to provide optimal results for any type of challenge. To increase your chances of success in the prop firm challenge, it is recommended that you purchase the BlackDiamond Special EA V9.5 Pro Version.",
  },
  {
    number: "19",
    question: "Would like to test your robot and see how it works?",
    answer:
      "Simply send us a message on Facebook, Telegram, or via email, and we'll provide you with the EA for a check and backtest with your broker.",
  },
  {
    number: "20",
    question: '"How much profit can I expect monthly, at a basic level?"',
    answer:
      "Regarding profits, our BalckDiamond_SpecialEA V9.5 can generate a minimum of 30% to 150% profit on a monthly basis, provided that the market conditions are favorable for the EA. In certain situations where the market conditions are highly favorable, this special system can even generate profits of up to 120% to 150%.",
  },
  {
    number: "21",
    question:
      "Do you believe that an EA generating a profit of 20 to 40% per month is considered professional?",
    answer:
      '"Yes, absolutely. If an EA can generate such a high percentage of profit within a month, it is undoubtedly a professional one. Moreover, if the market conditions are favorable, it can even earn more. Hence, it is a very efficient EA."',
  },
  {
    number: "22",
    question:
      "I am very much interested in buying BlackDiamond_SpecialEa V9.5. But I don't have those payment options, What do I do?",
    answer:
      "Send us a message with your preferred payment option and we'll ensure a smooth transaction.",
  },
  {
    number: "23",
    question: "Want Refund What Should Need To Do ? Profiling",
    answer:
      "Please be aware that buying EA (Expert Advisor) comes with its own risks. We have changed our policy due to some issues - we no longer provide refunds after purchase. This is because some customers tend to disregard our rules once they start making profits. They become overconfident and do not use any stop loss or the set file that we provide to our clients. As a result, they trade at their own risk. Therefore, we have decided to stop providing refunds. We apologize for any inconvenience this may cause.",
  },
  {
    number: "24",
    question: "Did Your System Really Wiped-Out Account Balance",
    answer:
      "Honestly, no, not ever. Every client receives our best-set file, and we provide recommended lot settings to ensure clients never lose their account balance.",
  },
];

function DynamicFaqCard({ item, isOpen, onToggle }) {
  const cardRef = useRef(null);
  const [cardMouse, setCardMouse] = useState({ x: 250, y: 40 });
  const [cardHovered, setCardHovered] = useState(false);

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCardMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleCardMouseMove}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      className={`group relative rounded-2xl p-[1px] transition-all duration-300 ${
        isOpen
          ? "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 shadow-[0_0_30px_rgba(245,158,11,0.22)]"
          : "bg-gradient-to-b from-amber-500/40 via-amber-400/15 to-amber-500/40 dark:from-amber-500/35 dark:via-zinc-800/70 dark:to-amber-500/30 hover:from-amber-400 hover:to-yellow-500 hover:shadow-[0_0_25px_rgba(245,158,11,0.18)]"
      }`}
    >
      <div className="relative rounded-2xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl overflow-hidden transition-colors duration-300">
        {/* Interactive Card Hover Reflection Glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: cardHovered ? 1 : 0,
            background: `radial-gradient(380px circle at ${cardMouse.x}px ${cardMouse.y}px, rgba(245, 158, 11, 0.16), transparent 70%)`,
          }}
        />

        {/* Clickable Question Header */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="relative z-10 w-full px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer"
        >
          <div className="flex items-start sm:items-center gap-3.5">
            <span
              className={`mt-0.5 sm:mt-0 px-2.5 py-1 rounded-lg font-mono text-xs font-black shrink-0 transition-all duration-300 ${
                isOpen
                  ? "bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.5)]"
                  : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/35 group-hover:bg-amber-400 group-hover:text-black"
              }`}
            >
              {item.number}
            </span>
            <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-zinc-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors leading-snug">
              {item.question}
            </h3>
          </div>

          {/* Plus / Minus Dynamic Toggle Button */}
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
              isOpen
                ? "bg-amber-400 text-black border-amber-300 rotate-180 shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                : "bg-amber-50 dark:bg-zinc-900/90 text-amber-700 dark:text-amber-300 border-amber-500/40 group-hover:bg-amber-400 group-hover:text-black group-hover:scale-110"
            }`}
          >
            {isOpen ? (
              <Minus className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[2.5]" />
            )}
          </span>
        </button>

        {/* Expandable Answer Content */}
        {isOpen && (
          <div className="relative z-10 px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-amber-500/20 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <p>{item.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openNumbers, setOpenNumbers] = useState(["01"]);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 500, y: 200 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleItem = (num) => {
    setOpenNumbers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const allExpanded =
    filteredFaqs.length > 0 &&
    filteredFaqs.every((item) => openNumbers.includes(item.number));

  const toggleAll = () => {
    if (allExpanded) {
      setOpenNumbers([]);
    } else {
      setOpenNumbers(filteredFaqs.map((item) => item.number));
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-screen overflow-hidden bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white pt-36 sm:pt-40 lg:pt-48 pb-14 transition-colors duration-300"
    >
      {/* Subtle Cyber Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-35"
        style={{
          backgroundSize: "48px 48px",
          backgroundImage:
            "linear-gradient(to right, rgba(217, 119, 6, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(217, 119, 6, 0.06) 1px, transparent 1px)",
        }}
      />

      {/* Interactive Background Cursor Spotlight Reflection */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0.35,
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.16), transparent 70%)`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_18px_rgba(245,158,11,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
              Trader Knowledge Base
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              Questions (FAQ)
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-medium max-w-2xl mx-auto">
            Find instant answers about BlackDiamond Special EA V9.5 setup,
            prop firm compatibility, licensing, and trading settings.
          </p>
        </div>

        {/* Search Input & Expand/Collapse Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-amber-600 dark:text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. FTMO, deposit, EURUSD, update)..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/95 dark:bg-[#0B0B10]/95 border border-amber-500/35 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl bg-amber-100/80 hover:bg-amber-400 text-amber-900 hover:text-black dark:bg-amber-500/15 dark:hover:bg-amber-400 dark:text-amber-300 dark:hover:text-black border border-amber-500/40 text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            <ChevronsUpDown className="w-3.5 h-3.5" />
            <span>{allExpanded ? "Collapse All" : "Expand All"}</span>
          </button>
        </div>

        {/* Dynamic FAQ Cards List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-3">
            {filteredFaqs.map((item) => (
              <DynamicFaqCard
                key={item.number}
                item={item}
                isOpen={openNumbers.includes(item.number)}
                onToggle={() => toggleItem(item.number)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl p-8 text-center bg-white/95 dark:bg-[#0B0B10]/95 border border-amber-500/30 space-y-2">
            <HelpCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <p className="text-base font-bold text-zinc-900 dark:text-white">
              No matching questions found
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Try searching with a different keyword or clear the search box.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}