import React, { FC, ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  CloseBtn,
  MobileMenuContainer,
  MobileMenuOverlay,
} from "./MobileMenu.styled";

interface MobileMenuProps {
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const MobileMenu: FC<MobileMenuProps> = ({
  isOpened,
  onClose,
  children,
}) => {
  const mobileOverlayRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent): void => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    if (touchStartXRef.current !== null) {
      const touchEndX = e.touches[0].clientX;
      const deltaX = touchEndX - touchStartXRef.current;

      const swipeThreshold = 50;

      if (deltaX > swipeThreshold) {
        onClose();
        touchStartXRef.current = null;
      }
    }
  };

  const handleTouchEnd = (): null => (touchStartXRef.current = null);

  useEffect(() => {
    isOpened
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  if (!isOpened) return null;

  return ReactDOM.createPortal(
    <MobileMenuOverlay
      ref={mobileOverlayRef}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (mobileOverlayRef.current === e.target) onClose();
      }}
    >
      <MobileMenuContainer
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CloseBtn onClick={onClose} />
        {children}
      </MobileMenuContainer>
    </MobileMenuOverlay>,
    document.body
  );
};
