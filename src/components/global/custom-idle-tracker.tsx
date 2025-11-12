import { useMasterKey } from "@/stores/master";
import { useTheme } from "@/stores/theme";
import { useCallback, useEffect, useRef } from "react";

const IDLE_LIMIT = 5 * 60 * 1000; // 5 menit (ms)

export function IdleTracker() {
  const timerRef = useRef<number | null>(null);
  const { setIsVerify } = useMasterKey();
  const { setLoading } = useTheme();

  const handleIdle = useCallback(async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsVerify(false);
    setLoading(false);
  }, [setIsVerify, setLoading]);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      handleIdle();
    }, IDLE_LIMIT);
  };

  useEffect(() => {
    // Event yang dihitung sebagai "aktivitas"
    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Mulai timer pertama kali
    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  return null; // tidak perlu render UI
}
