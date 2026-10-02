"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ConsentStatus = "pending" | "accepted" | "declined";

interface ConsentContextType {
  consent: ConsentStatus;
  acceptConsent: () => void;
  declineConsent: () => void;
  openSettings: () => void;
  showModal: boolean;
  closeModal: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentStatus>("pending");
  const [showModal, setShowModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("hdmovies_cookie_consent");
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
    } else {
      setShowModal(true);
    }
  }, []);

  const acceptConsent = () => {
    localStorage.setItem("hdmovies_cookie_consent", "accepted");
    setConsent("accepted");
    setShowModal(false);
    // Dispatch event for any analytics/ad scripts
    window.dispatchEvent(new CustomEvent("cookie_consent_updated", { detail: { consent: "accepted" } }));
  };

  const declineConsent = () => {
    localStorage.setItem("hdmovies_cookie_consent", "declined");
    setConsent("declined");
    setShowModal(false);
    window.dispatchEvent(new CustomEvent("cookie_consent_updated", { detail: { consent: "declined" } }));
  };

  const openSettings = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ConsentContext.Provider
      value={{
        consent,
        acceptConsent,
        declineConsent,
        openSettings,
        showModal: isMounted && showModal,
        closeModal,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
}
