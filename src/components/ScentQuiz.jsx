import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, ChevronRight, RefreshCw, ShoppingBag, Heart } from 'lucide-react';
import gsap from 'gsap';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const FALLBACK_PERFUMES = [
  {
    _id: "fallback-men-1",
    name: "Volonté Homme",
    category: "Men",
    tag: "Premium",
    img: "/V3.jpeg",
    description: "A bold, intense woody composition with rich amber and spices. Designed for timeless presence.",
  },
  {
    _id: "fallback-women-1",
    name: "Volonté Femme",
    category: "Women",
    tag: "Floral",
    img: "/Lp8ml.jpeg",
    description: "A soft, floral bouquet of fresh roses and jasmine with a touch of sweet vanilla.",
  },
  {
    _id: "fallback-unisex-1",
    name: "Volonté Noir",
    category: "Unisex",
    tag: "Fresh",
    img: "/Lp8ml2.jpeg",
    description: "An elegant, unisex signature blend of fresh citrus, lavender, and sensual musk.",
  }
];

const ScentQuiz = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [perfumes, setPerfumes] = useState(FALLBACK_PERFUMES);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Fetch perfumes to have them ready for recommendation
      axios.get(`${API_URL}/perfumes`)
        .then(res => {
          const list = res.data?.data || res.data;
          if (Array.isArray(list) && list.length > 0) {
            setPerfumes(list);
          }
        })
        .catch(err => {
          console.error("Error fetching perfumes in quiz:", err);
        });
    } else {
      document.body.style.overflow = '';
      setStep(0);
      setAnswers({});
      setResult(null);
    }
  }, [isOpen]);

  const questions = [
    {
      id: 'gender',
      question: "Who are you shopping for?",
      options: [
        { label: "Myself (Him)", value: "Men" },
        { label: "Myself (Her)", value: "Women" },
        { label: "Anyone (Unisex)", value: "Unisex" }
      ]
    },
    {
      id: 'vibe',
      question: "What's the vibe you're looking for?",
      options: [
        { label: "Fresh & Energizing", value: "Fresh" },
        { label: "Bold & Intense", value: "Premium" },
        { label: "Soft & Floral", value: "Floral" },
        { label: "Classic & Timeless", value: "Signature" }
      ]
    },
    {
      id: 'occasion',
      question: "When will you wear it most?",
      options: [
        { label: "Daily Wear / Office", value: "daily" },
        { label: "Date Nights / Special Occasions", value: "special" },
        { label: "Summer Holidays", value: "summer" }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      findRecommendation(newAnswers);
    }
  };

  const findRecommendation = (finalAnswers) => {
    setLoading(true);
    setTimeout(() => {
      // Filter perfumes based on category first
      let filtered = perfumes.filter(p => p.category === finalAnswers.gender);

      // If no perfect match in category, try to find by tag
      let recommended = filtered.find(p => p.tag === finalAnswers.vibe);

      // Fallback to first in category or any bestseller
      if (!recommended) recommended = filtered[0] || perfumes.find(p => p.tag === 'Bestseller') || perfumes[0];

      setResult(recommended);
      setLoading(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-[#f5f0eb] w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl relative min-h-[500px] flex flex-col">

        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-[#ede7df]">
          <div className="flex flex-col">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#a89880]">Scent Discovery</p>
            <h2 className="text-xl font-light text-[#2c2c2c]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Find Your Signature</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X size={20} className="text-[#a89880]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          {!result && !loading && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <p className="text-xs text-[#a89880]">Step {step + 1} of {questions.length}</p>
                <h3 className="text-2xl font-light text-[#2c2c2c]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {questions[step].question}
                </h3>
              </div>

              <div className="grid gap-3">
                {questions[step].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="group flex items-center justify-between p-5 rounded-2xl bg-white border border-[#ede7df] hover:border-[#2c2c2c] hover:bg-white transition-all text-left"
                  >
                    <span className="text-sm text-[#7a6e65] group-hover:text-[#2c2c2c] transition-colors">{opt.label}</span>
                    <ChevronRight size={16} className="text-[#ede7df] group-hover:text-[#2c2c2c] transition-all transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center space-y-6 py-12">
              <div className="relative">
                <RefreshCw size={48} className="text-[#c9a96e] animate-spin" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f5f0eb] to-transparent" />
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#a89880] mb-2 animate-pulse">Analyzing Preferences</p>
                <h3 className="text-xl font-light text-[#2c2c2c]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Curating Your Perfect Scent...</h3>
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="animate-in zoom-in-95 fade-in duration-700 flex flex-col items-center text-center space-y-6">
              <div className="w-48 h-64 rounded-2xl overflow-hidden shadow-xl bg-white border-4 border-white">
                <img src={result.img} alt={result.name} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a96e] font-bold">Your Match Found</p>
                <h3 className="text-3xl font-light text-[#2c2c2c]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{result.name}</h3>
                <p className="text-sm text-[#7a6e65] max-w-xs mx-auto">{result.description}</p>
              </div>

              <div className="flex gap-4 w-full max-w-xs">
                <button
                  onClick={() => {
                    // Add to cart logic would go here
                    onClose();
                  }}
                  className="flex-1 bg-[#2c2c2c] text-white py-4 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1a1a1a] transition-all"
                >
                  <ShoppingBag size={14} /> Buy Now
                </button>
                <button
                  onClick={() => { setStep(0); setResult(null); }}
                  className="p-4 rounded-xl border border-[#ede7df] text-[#a89880] hover:bg-white transition-all"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {!result && !loading && (
          <div className="h-1 bg-[#ede7df] w-full">
            <div
              className="h-full bg-[#2c2c2c] transition-all duration-500 ease-out"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScentQuiz;
