import React from 'react';
import Navbar from '../components/navbar';
import HeroSection from '../components/HeroSection';
import "./layout.css";
import { Outlet, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import useTheme from '../hooks/useTheme';

export default function Layout () {

  let { isDark } = useTheme();
  if (isDark) {
    document.body.classList.add('bg-dbg');
  } else {
    document.body.classList.remove('bg-dbg');
  }
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className='max-w-xl2 max-w-6xl p-3 mx-auto'>
        <HeroSection />
        <SwitchTransition>
          <CSSTransition timeout={300} classNames="fade" key={location.pathname}>
                <Outlet />
          </CSSTransition>
        </SwitchTransition>
    </div>
    </>
  )
}
