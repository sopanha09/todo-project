import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, LogIn, LayoutGrid, Menu } from 'lucide-react';
import { getCurrentUser } from '@/services/api';
import toast from 'react-hot-toast';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [timeout, setTimeout] = useState();
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 17) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, [currentTime]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      getCurrentUser(token)
        .then((res) => setUserName(res.data.username || 'User'))
        .catch(() => setUserName('User'));
    } else {
      setUserName('User');
    }
  }, []);
  return (
    <div className="max-w-full mx-auto px-6 py-8 flex flex-row items-center justify-between text-gray-700">
      <div className="flex items-center md:gap-5 gap-2">
        <div className="relative">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border border-white/30">
            <LayoutGrid className="w-8 h-8 text-indigo-400 animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 -right-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
        </div>
        <div className="flex flex-col">
          <p className="md:text-xl text-lg font-medium">
            {greeting}, {userName}!
          </p>
          <p className="text-indigo-600 text-sm">Let’s get it done today!</p>
        </div>
      </div>
      {userName !== 'User' ? (
        <div
          onClick={() => {
            toast('Signing out...');
            setTimeout(() => {
              localStorage.removeItem('accessToken');
              navigate('/auth', { replace: true });
            }, 400);
          }}
          className="flex flex-row items-center hover:text-indigo-600 justify-center gap-1 text-sm cursor-pointer hover:underline focus:underline"
        >
          <LogOut size={14} />
          <span className="md:flex hidden">Sign out</span>
        </div>
      ) : (
        <div
          onClick={() => {
            toast('Signing in...');
            setTimeout(() => {
              navigate('/auth', { replace: true });
            }, 400);
          }}
          className="flex flex-row items-center hover:text-indigo-600 justify-center gap-1 text-sm cursor-pointer hover:underline focus:underline"
        >
          <LogIn size={14} />
          <span className="md:flex hidden">Sign in</span>
        </div>
      )}
    </div>
  );
};

export default Header;
