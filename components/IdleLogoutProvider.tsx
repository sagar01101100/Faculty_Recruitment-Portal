
import React, { useEffect, useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

interface IdleLogoutProviderProps {
  children: ReactNode;
}

const IdleLogoutProvider: React.FC<IdleLogoutProviderProps> = ({ children }) => {
  const toast = useToast();
  const router = useRouter();
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetIdleTimeout = useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      handleLogout();
    }, 10 * 60 * 1000); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    toast({
      title: "Session expired",
      description: "You have been logged out due to inactivity.",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
    router.replace("/");
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimeout);
    });

    resetIdleTimeout(); 

    return () => {
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimeout);
      });
    };
  }, [resetIdleTimeout]);

  return <>{children}</>;
};

export default IdleLogoutProvider;
