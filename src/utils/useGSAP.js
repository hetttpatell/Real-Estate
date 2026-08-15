import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Lightweight GSAP hook helper utilizing gsap.context for clean scoping and animation cleanup.
 */
export function useGSAP(callback, options = {}) {
  const { scope, dependencies = [] } =
    typeof options === "object" && options !== null && !Array.isArray(options)
      ? options
      : { scope: null, dependencies: Array.isArray(options) ? options : [] };

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(callback, scope);
    return () => ctx.revert();
  }, dependencies);
}

export default useGSAP;
